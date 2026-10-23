import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react';
import Gallery from '@/components/Gallery';
import PropertyCard from '@/components/sections/PropertyCard';
import { formatPrice, truncate } from '@/lib/format';
import { getProperties, getPropertyBySlug, propertySlug } from '@/lib/properties';
import { jsonLd, propertyGraph } from '@/lib/seo';
import { mainPhone, site, whatsappUrl } from '@/lib/site';

export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: 'Propiedad no encontrada', robots: { index: false, follow: true } };

  const operation = property.type === 'Ambos' ? 'en renta y venta' : property.type === 'Venta' ? 'en venta' : 'en renta';
  const title = `${property.title}, ${operation}`;
  const description = truncate(
    `${property.title}${property.surface ? `, ${property.surface}` : ''}. ${property.description}`,
    158,
  );
  const url = `/propiedades/${property.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${title} | ${site.name}`,
      description,
      locale: 'es_MX',
      images: property.images[0] ? [{ url: property.images[0], alt: property.title }] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description, images: property.images[0] ? [property.images[0]] : undefined },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  // Una sola URL por propiedad: si el título cambió en el portal, se redirige a la actual.
  const canonical = propertySlug(property.title, property.id);
  if (slug !== canonical) permanentRedirect(`/propiedades/${canonical}`);

  const operation = property.type === 'Ambos' ? 'renta y venta' : property.type === 'Venta' ? 'venta' : 'renta';
  const message = `Hola, me interesa la propiedad «${property.title}» en ${operation}. Quisiera más información.`;
  const wa = whatsappUrl(message);
  const others = (await getProperties()).filter((p) => p.id !== property.id).slice(0, 3);

  const rows = [
    property.surface && { label: 'Superficie', value: property.surface },
    property.rentPrice > 0 && { label: 'Renta al mes', value: formatPrice(property.rentPrice), big: true },
    property.salePrice > 0 && { label: 'Venta', value: formatPrice(property.salePrice), big: true },
  ].filter(Boolean) as { label: string; value: string; big?: boolean }[];

  return (
    <>
      <div className="border-b border-line bg-white pt-16 md:pt-20">
        <div className="container-page py-5">
          <nav aria-label="Ruta de navegación">
            <Link href="/propiedades" className="link-line inline-flex items-center gap-2 text-[0.95rem] font-medium text-graphite">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Todas las propiedades
            </Link>
          </nav>
        </div>
      </div>

      <article className="bg-white pb-20 pt-10 md:pb-28 md:pt-14">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Gallery images={property.images} title={property.title} />
          </div>

          <div className="lg:col-span-5">
            <h1 className="text-[clamp(2.1rem,4vw,3.25rem)]">{property.title}</h1>
            <p className="mt-3 text-[0.95rem] font-semibold text-brand">
              {property.type === 'Ambos' ? 'En renta y en venta' : property.type === 'Venta' ? 'En venta' : 'En renta'}
            </p>

            <dl className="mt-8 divide-y divide-line border-y border-line">
              {rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-slate">{row.label}</dt>
                  <dd className={row.big ? 'font-display text-3xl text-ink' : 'text-lg font-medium text-ink'}>{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-3">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-brand">
                  <MessageCircle className="size-[1.1rem]" aria-hidden="true" />
                  Preguntar por esta propiedad
                </a>
              ) : (
                <Link href="/#contacto" className="btn btn-brand">
                  Preguntar por esta propiedad
                </Link>
              )}
              <a href={`tel:${mainPhone.tel}`} className="btn btn-line btn-line-dark">
                <Phone className="size-[1.1rem]" aria-hidden="true" />
                Llamar al {mainPhone.display}
              </a>
            </div>
            <p className="mt-4 text-sm text-slate">
              {site.hours.label}, {site.hours.ranges.map((r) => r.text).join(' y ')}.
            </p>
          </div>
        </div>

        <div className="container-page mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {property.description && (
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl">Descripción</h2>
              <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-graphite">{property.description}</p>
            </div>
          )}
          {property.amenities.length > 0 && (
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl">Características</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {property.amenities.map((amenity) => (
                  <li key={amenity} className="flex gap-3 py-3 text-[1.05rem]">
                    <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-brand" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="otras" className="bg-mist py-20 md:py-28">
          <div className="container-page">
            <h2 id="otras" className="text-3xl sm:text-4xl">
              Otras propiedades disponibles
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.id}>
                  <PropertyCard property={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(propertyGraph(property)) }} />
    </>
  );
}
