import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import DrawLine from '@/components/ui/DrawLine';
import PropertyCard from './PropertyCard';
import { mainPhone, whatsappUrl } from '@/lib/site';
import type { PublicProperty } from '@/lib/properties';

/** Portada: solo las propiedades más recientes. El catálogo completo, con filtros y páginas, vive en /propiedades. */
export default function Properties({ properties, total }: { properties: PublicProperty[]; total: number }) {
  const wa = whatsappUrl('Hola, quisiera conocer las propiedades que tienen disponibles.');

  return (
    <section id="propiedades" className="section-y bg-white">
      <div className="container-page">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="h-section">Propiedades disponibles</h2>
            <p className="mt-5 text-lg text-slate">
              Cada ficha trae fotos, superficie y precio. Elige una y pregunta por ella directamente por WhatsApp o teléfono.
            </p>
          </div>
          {total > 0 && (
            <Link href="/propiedades" className="btn btn-ink shrink-0">
              Ver las {total} propiedades
              <ArrowRight className="arrow size-4" aria-hidden="true" />
            </Link>
          )}
        </Reveal>

        {properties.length === 0 ? (
          <Reveal className="mt-14 grid gap-8 border-t-2 border-ink pt-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="text-3xl sm:text-4xl">El catálogo en línea se está actualizando.</h3>
              <p className="mt-4 max-w-xl text-lg text-slate">
                Dinos si quieres comprar o rentar, en qué zona y con qué presupuesto, y te decimos qué tenemos disponible.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:items-start lg:justify-end">
              <a href="#contacto" className="btn btn-ink">
                Contarnos qué busco
              </a>
              <a
                href={wa ?? `tel:${mainPhone.tel}`}
                {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="btn btn-line btn-line-dark"
              >
                {wa ? 'Preguntar por WhatsApp' : `Llamar al ${mainPhone.display}`}
              </a>
            </div>
          </Reveal>
        ) : (
          <>
            <DrawLine className="mt-14" />
            <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property, index) => (
                <Reveal as="li" key={property.id} delay={index * 0.1}>
                  <PropertyCard property={property} />
                </Reveal>
              ))}
            </ul>
            {total > properties.length && (
              <Reveal className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
                <p className="text-lg text-graphite">
                  Estas son las {properties.length} más recientes de {total} propiedades publicadas.
                </p>
                <Link href="/propiedades" className="btn btn-brand">
                  Ver todo el catálogo
                  <ArrowRight className="arrow size-4" aria-hidden="true" />
                </Link>
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}
