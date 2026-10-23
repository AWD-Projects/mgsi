'use client';

import { useMemo, useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import PropertyCard from './PropertyCard';
import { cn } from '@/lib/utils';
import { mainPhone, whatsappUrl } from '@/lib/site';
import type { PublicProperty } from '@/lib/properties';

type Filter = 'todas' | 'renta' | 'venta';

export default function Properties({ properties }: { properties: PublicProperty[] }) {
  const [filter, setFilter] = useState<Filter>('todas');

  const counts = useMemo(
    () => ({
      todas: properties.length,
      renta: properties.filter((p) => p.rentPrice > 0).length,
      venta: properties.filter((p) => p.salePrice > 0).length,
    }),
    [properties],
  );

  const visible = useMemo(
    () =>
      properties.filter((p) =>
        filter === 'todas' ? true : filter === 'renta' ? p.rentPrice > 0 : p.salePrice > 0,
      ),
    [properties, filter],
  );

  const wa = whatsappUrl('Hola, quisiera conocer las propiedades que tienen disponibles.');
  const tabs: { id: Filter; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'renta', label: 'En renta' },
    { id: 'venta', label: 'En venta' },
  ];

  return (
    <section id="propiedades" className="section-y bg-white">
      <div className="container-page">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="h-section">Propiedades disponibles</h2>
            <p className="mt-5 text-lg text-slate">
              Cada propiedad tiene su ficha con fotos, superficie y precios. Si una te interesa, pregunta por ella en un toque.
            </p>
          </div>

          {properties.length > 0 && (
            <div role="tablist" aria-label="Filtrar propiedades" className="flex w-full shrink-0 border border-ink lg:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={filter === tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    'min-h-11 flex-1 whitespace-nowrap px-3 text-[0.95rem] font-semibold transition-colors sm:px-5 lg:flex-none',
                    filter === tab.id ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-mist',
                  )}
                >
                  {tab.label}
                  <span className={cn('ml-2 font-normal', filter === tab.id ? 'text-white/80' : 'text-slate')}>
                    {counts[tab.id]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </Reveal>

        {properties.length === 0 ? (
          <Reveal className="mt-14 grid gap-8 border-t-2 border-ink pt-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="text-3xl sm:text-4xl">Estamos actualizando el catálogo.</h3>
              <p className="mt-4 max-w-xl text-lg text-slate">
                Hoy las propiedades se atienden directamente. Dinos qué buscas y te mostramos lo que tenemos disponible.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:items-start lg:justify-end">
              <a href="#contacto" className="btn btn-ink">
                Escribirnos
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
        ) : visible.length === 0 ? (
          <p className="mt-14 border-t-2 border-ink pt-10 text-lg text-slate">No hay propiedades en esta categoría por ahora.</p>
        ) : (
          <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((property, index) => (
              <Reveal as="li" key={property.id} delay={(index % 3) * 0.06}>
                <PropertyCard property={property} priority={index < 3} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
