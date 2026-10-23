import 'server-only';
import { unstable_cache } from 'next/cache';
import { ObjectId } from 'mongodb';
import { getDatabase } from './mongodb';
import { prettyTitle, prettySurface, slugify } from './format';

export type PropertyType = 'Renta' | 'Venta' | 'Ambos';

/** Propiedad tal como se publica en el sitio. No incluye notas internas. */
export interface PublicProperty {
  id: string;
  slug: string;
  title: string;
  surface: string;
  description: string;
  rentPrice: number;
  salePrice: number;
  amenities: string[];
  images: string[];
  type: PropertyType;
  updatedAt: string;
}

interface PropertyDoc {
  _id: ObjectId;
  name?: unknown;
  surface?: unknown;
  description?: unknown;
  rentPrice?: unknown;
  salePrice?: unknown;
  amenities?: unknown;
  image?: unknown;
  images?: unknown;
  type?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const amount = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const isHttps = (value: string) => /^https:\/\//i.test(value);

export function propertySlug(title: string, id: string) {
  return `${slugify(title) || 'propiedad'}-${id}`;
}

function toPublic(doc: PropertyDoc): PublicProperty {
  const id = doc._id.toString();
  const title = prettyTitle(text(doc.name));
  const rentPrice = amount(doc.rentPrice);
  const salePrice = amount(doc.salePrice);

  const fromArray = Array.isArray(doc.images) ? doc.images.filter((u): u is string => typeof u === 'string') : [];
  const legacy = text(doc.image);
  const images = (fromArray.length > 0 ? fromArray : legacy ? [legacy] : []).map((u) => u.trim()).filter(isHttps);

  let type: PropertyType = 'Renta';
  if (rentPrice > 0 && salePrice > 0) type = 'Ambos';
  else if (salePrice > 0) type = 'Venta';
  else if (doc.type === 'Renta' || doc.type === 'Venta' || doc.type === 'Ambos') type = doc.type;

  return {
    id,
    slug: propertySlug(title, id),
    title,
    surface: prettySurface(text(doc.surface)),
    description: text(doc.description),
    rentPrice,
    salePrice,
    amenities: Array.isArray(doc.amenities)
      ? doc.amenities.filter((a): a is string => typeof a === 'string' && a.trim().length > 0).map((a) => a.trim())
      : [],
    images,
    type,
    updatedAt: text(doc.updatedAt) || text(doc.createdAt),
  };
}

/**
 * Si la base falla durante una regeneración en producción se lanza el error: Next conserva la última página buena
 * en lugar de publicar un catálogo vacío. Durante el build o sin MONGODB_URI (desarrollo local) devuelve [].
 */
function handleFailure(error: unknown, what: string): never | [] {
  console.error(`[properties] No se pudo leer ${what}:`, error instanceof Error ? error.message : error);
  if (!process.env.MONGODB_URI || process.env.NEXT_PHASE === 'phase-production-build') return [];
  throw error;
}

async function readProperties(): Promise<PublicProperty[]> {
  if (!process.env.MONGODB_URI) return [];
  try {
    const db = await getDatabase();
    const docs = await db
      .collection<PropertyDoc>('properties')
      .find(
        { active: true },
        {
          projection: {
            name: 1,
            surface: 1,
            description: 1,
            rentPrice: 1,
            salePrice: 1,
            amenities: 1,
            image: 1,
            images: 1,
            type: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();
    return docs.map(toPublic).filter((p) => p.title);
  } catch (error) {
    return handleFailure(error, 'las propiedades');
  }
}

/** Propiedades activas, más recientes primero. Caché de 5 min: el catálogo paginado no consulta la base en cada visita. */
export const getProperties = unstable_cache(readProperties, ['mgsi-properties'], { revalidate: 300, tags: ['properties'] });

export async function getPropertyBySlug(slug: string): Promise<PublicProperty | null> {
  const id = slug.match(/([a-f0-9]{24})$/i)?.[1];
  if (!id || !ObjectId.isValid(id) || !process.env.MONGODB_URI) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection<PropertyDoc>('properties').findOne({ _id: new ObjectId(id), active: true });
    return doc ? toPublic(doc) : null;
  } catch (error) {
    handleFailure(error, 'la propiedad');
    return null;
  }
}
