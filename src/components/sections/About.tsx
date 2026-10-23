import Reveal from '@/components/ui/Reveal';

export default function About() {
  return (
    <section id="nosotros" className="on-dark bg-ink text-white section-y">
      <div className="container-page">
        <Reveal>
          <h2 className="h-section">Nosotros</h2>
        </Reveal>
        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <p className="font-display text-2xl leading-[1.35] sm:text-3xl">
              Somos un grupo de profesionistas con más de 40 años de experiencia en el área inmobiliaria, administrativa y
              legal, con el propósito de ayudar a nuestros clientes en operaciones de compra, venta, renta y administración
              inmobiliaria.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <h3 className="font-sans text-base font-semibold tracking-normal">Nuestra misión</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Brindar servicios inmobiliarios integrales de la más alta calidad, combinando nuestra vasta experiencia con un
              enfoque personalizado para cada cliente. Nos comprometemos a facilitar las decisiones inmobiliarias más
              importantes de nuestros clientes con transparencia, profesionalismo y dedicación.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
