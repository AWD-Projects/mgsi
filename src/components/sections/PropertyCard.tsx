import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ImageOff } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import type { PublicProperty } from '@/lib/properties';

const typeLabel = { Renta: 'En renta', Venta: 'En venta', Ambos: 'Renta y venta' } as const;

export default function PropertyCard({
  property,
  priority = false,
  heading: Heading = 'h3',
}: {
  property: PublicProperty;
  priority?: boolean;
  heading?: 'h2' | 'h3';
}) {
  const cover = property.images[0];
  return (
    <article className="group h-full">
      <Link href={`/propiedades/${property.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          {cover ? (
            <Image
              src={cover}
              alt={property.title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full place-items-center text-slate">
              <span className="flex flex-col items-center gap-2 text-sm">
                <ImageOff className="size-8" strokeWidth={1.25} aria-hidden="true" />
                Fotos próximamente
              </span>
            </div>
          )}
          <span className="glass-light absolute left-3 top-3 px-3 py-1.5 text-sm font-semibold text-ink">
            {typeLabel[property.type]}
          </span>
        </div>

        <div className="mt-4 flex flex-1 flex-col border-t border-ink pt-5">
          <Heading className="text-[1.65rem] leading-[1.1] sm:min-h-[2.2em]">{property.title}</Heading>
          <dl className="mt-5 divide-y divide-line border-y border-line text-[0.95rem]">
            {property.surface && (
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-slate">Superficie</dt>
                <dd className="font-medium text-ink">{property.surface}</dd>
              </div>
            )}
            {property.rentPrice > 0 && (
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-slate">Renta al mes</dt>
                <dd className="font-display text-xl text-ink">{formatPrice(property.rentPrice)}</dd>
              </div>
            )}
            {property.salePrice > 0 && (
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-slate">Venta</dt>
                <dd className="font-display text-xl text-ink">{formatPrice(property.salePrice)}</dd>
              </div>
            )}
          </dl>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.95rem] font-semibold text-brand">
            Ver ficha completa
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
