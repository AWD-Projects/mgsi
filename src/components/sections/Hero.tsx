import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mainPhone, site, whatsappUrl } from '@/lib/site';

export default function Hero() {
  const wa = whatsappUrl('Hola, me gustaría recibir información sobre sus servicios inmobiliarios.');

  return (
    <section id="inicio" className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-white max-md:pb-14">
      {/* Fondo de marca: degradado negro, vino y #B40039 */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-wine to-brand opacity-90" />

      <div className="container-page flex flex-1 items-center pb-10 pt-28">
        <div className="rise max-w-3xl">
          <h1 className="text-[clamp(2.4rem,5.2vw,4.5rem)] font-medium leading-[1.05]">
            Inmobiliaria con 40 años de respaldo legal y administrativo.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
            Compra, vende o renta con la parte legal y la administración resueltas en una sola oficina de la Col. Del Valle.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link href="/propiedades" className="btn btn-brand">
              Ver propiedades disponibles
              <ArrowRight className="arrow size-4" aria-hidden="true" />
            </Link>
            <a
              href={wa ?? `tel:${mainPhone.tel}`}
              {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="link-line w-fit py-1 font-semibold"
            >
              {wa ? 'Cuéntanos qué buscas' : `Llamar al ${mainPhone.display}`}
            </a>
          </div>
        </div>
      </div>

      {/* Una sola línea de vidrio con los datos de contacto */}
      <div className="glass-frost border-x-0 border-b-0">
        <p className="container-page flex flex-col gap-1 py-4 text-sm sm:flex-row sm:flex-wrap sm:gap-x-10">
          <span>
            {site.address.lines[0]}, Col. Del Valle
          </span>
          <span className="hidden sm:inline">{site.hours.label}</span>
          <a href={`tel:${mainPhone.tel}`} className="link-line hidden w-fit sm:inline">
            {mainPhone.display}
          </a>
        </p>
      </div>
    </section>
  );
}
