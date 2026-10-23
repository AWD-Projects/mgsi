import Link from 'next/link';
import Niveles from '@/components/ui/Niveles';

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[80vh] items-center overflow-hidden bg-ink pt-24 text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-wine to-brand opacity-90" />
      <Niveles className="absolute -right-6 bottom-0 -z-10 hidden h-auto w-72 lg:block" />
      <div className="container-page py-20">
        <p className="font-display text-[clamp(5rem,16vw,11rem)] leading-none">404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Esta página no existe o la propiedad ya no está publicada.</h1>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/#propiedades" className="btn btn-brand">
            Ver propiedades disponibles
          </Link>
          <Link href="/" className="btn btn-line">
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
