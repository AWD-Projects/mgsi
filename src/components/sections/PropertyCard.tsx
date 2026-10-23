import Image from 'next/image';
import Link from 'next/link';
import { ImageOff } from 'lucide-react';
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

        <div className="mt-4">
          <Heading className="text-2xl leading-[1.15] underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-ink">
            {property.title}
          </Heading>
          <p className="mt-2 text-[0.95rem] text-slate">{property.surface}</p>
          <p className="mt-3 font-display text-xl">
            {[
              property.rentPrice > 0 && `${formatPrice(property.rentPrice)} al mes`,
              property.salePrice > 0 && `Venta ${formatPrice(property.salePrice)}`,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
      </Link>
    </article>
  );
}
