import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Niveles from '@/components/ui/Niveles';
import HeroBackdrop from '@/components/ui/HeroBackdrop';
import { formatPrice } from '@/lib/format';
import { mainPhone, site, whatsappUrl } from '@/lib/site';
import type { PublicProperty } from '@/lib/properties';

const headline = 'Inmobiliaria con 40 años de respaldo legal y administrativo.'.split(' ');

export default function Hero({ featured }: { featured?: PublicProperty }) {
  const wa = whatsappUrl('Hola, me gustaría recibir información sobre sus servicios inmobiliarios.');
  const price = featured ? (featured.salePrice > 0 ? featured.salePrice : featured.rentPrice) : 0;
  const priceNote = featured ? (featured.salePrice > 0 ? 'Venta' : 'Renta al mes') : '';

  return (
    <section id="inicio" className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-white max-md:pb-14">
      {/* Fondo de marca: se mantiene el degradado negro, vino y #B40039 y las líneas de plano */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-wine to-brand opacity-90" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.12]">
        <span className="draw-y absolute inset-y-0 left-1/4 w-px bg-white" style={{ '--d': '0.2s' } as React.CSSProperties} />
        <span className="draw-y absolute inset-y-0 left-2/4 w-px bg-white" style={{ '--d': '0.4s' } as React.CSSProperties} />
        <span className="draw-y absolute inset-y-0 left-3/4 w-px bg-white" style={{ '--d': '0.6s' } as React.CSSProperties} />
        <span className="draw-x absolute inset-x-0 top-1/3 h-px bg-white" style={{ '--d': '0.5s' } as React.CSSProperties} />
        <span className="draw-x absolute inset-x-0 top-2/3 h-px bg-white" style={{ '--d': '0.8s' } as React.CSSProperties} />
      </div>
      <HeroBackdrop />

      <div className="container-page grid flex-1 content-center gap-10 pb-10 pt-28 sm:pt-32 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-12 lg:pt-28">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(2.5rem,5.6vw,4.9rem)] font-medium leading-[1.03]">
            {headline.map((word, i) => (
              <span key={i}>
                <span className="word" style={{ '--i': i } as React.CSSProperties}>
                  {word}
                </span>{' '}
              </span>
            ))}
          </h1>
          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl" style={{ '--d': '0.45s' } as React.CSSProperties}>
            Compra, vende o renta con la parte legal y la administración resueltas en una sola oficina de la Col. Del Valle.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ '--d': '0.6s' } as React.CSSProperties}>
            <Link href="/propiedades" className="btn btn-brand">
              Ver propiedades disponibles
              <ArrowRight className="arrow size-4" aria-hidden="true" />
            </Link>
            <a
              href={wa ?? `tel:${mainPhone.tel}`}
              {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="btn btn-line"
            >
              {wa ? 'Cuéntanos qué buscas' : `Llamar al ${mainPhone.display}`}
            </a>
          </div>
        </div>

        <div className="slide-up relative hidden md:block lg:col-span-5" style={{ '--d': '0.2s' } as React.CSSProperties}>
          {featured && featured.images[0] ? (
            <Link
              href={`/propiedades/${featured.slug}`}
              className="group relative block bg-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
            >
              <div className="relative h-[min(44svh,26rem)] overflow-hidden lg:h-[min(62svh,36rem)]">
                <Image
                  src={featured.images[0]}
                  alt={featured.title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-sm font-medium text-white/85">Publicada recientemente</p>
                <p className="mt-1 font-display text-2xl leading-tight sm:text-3xl">{featured.title}</p>
                <div className="mt-4 flex items-end justify-between gap-4 border-t border-white/30 pt-4">
                  <p>
                    <span className="block text-sm text-white/85">{priceNote}</span>
                    <span className="font-display text-2xl">{formatPrice(price)}</span>
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    Ver ficha
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <Niveles className="mx-auto hidden h-[min(50svh,28rem)] w-auto lg:block" />
          )}
        </div>
      </div>

      <div className="border-t border-white/20">
        <dl className="container-page grid gap-4 py-5 text-sm sm:grid-cols-3 sm:gap-8 sm:py-7">
          <div>
            <dt className="text-white/75">Oficina</dt>
            <dd className="mt-1 font-display text-2xl">{site.address.lines[0]}, Col. Del Valle</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="text-white/75">Atención en oficina</dt>
            <dd className="mt-1 font-display text-2xl">{site.hours.label}</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="text-white/75">Teléfono</dt>
            <dd className="mt-1 font-display text-2xl">
              <a href={`tel:${mainPhone.tel}`} className="link-line">
                {mainPhone.display}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
