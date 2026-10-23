import Reveal from '@/components/ui/Reveal';
import Niveles from '@/components/ui/Niveles';

const principles = [
  { title: 'Cuatro décadas en el mercado', text: 'Más de 40 años de trabajo en operaciones inmobiliarias en México.' },
  { title: 'Tres áreas en un mismo equipo', text: 'Profesionistas del área inmobiliaria, administrativa y legal.' },
  { title: 'De la primera visita a la firma', text: 'Compra, venta, renta y administración de propiedades.' },
  { title: 'Atención directa', text: 'Soluciones adaptadas a cada cliente, con trato directo en nuestra oficina.' },
];

export default function About() {
  return (
    <section id="nosotros" className="on-dark bg-ink text-white section-y">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="h-section">Nosotros</h2>
            <p className="mt-8 font-display text-2xl leading-[1.35] sm:text-3xl">
              Somos un grupo de profesionistas con más de 40 años de experiencia en el área inmobiliaria, administrativa y
              legal, con el propósito de ayudar a nuestros clientes en operaciones de compra, venta, renta y administración
              inmobiliaria.
            </p>
            <div className="mt-14 border-t border-white/25 pt-8">
              <h3 className="text-2xl sm:text-3xl">Nuestra misión</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
                Brindar servicios inmobiliarios integrales de la más alta calidad, combinando nuestra vasta experiencia con
                un enfoque personalizado para cada cliente. Nos comprometemos a facilitar las decisiones inmobiliarias más
                importantes de nuestros clientes con transparencia, profesionalismo y dedicación.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-4">
            <div className="flex items-end justify-between gap-6" aria-hidden="true">
              <p className="font-display text-[clamp(6rem,14vw,10rem)] leading-none text-brand">40+</p>
              <Niveles className="mb-2 h-24 w-auto shrink-0 sm:h-32" />
            </div>
            <ul className="mt-6 divide-y divide-white/20 border-y border-white/20">
              {principles.map((item) => (
                <li key={item.title} className="py-5">
                  <h3 className="font-sans text-base font-semibold tracking-normal">{item.title}</h3>
                  <p className="mt-1 text-[0.95rem] text-white/80">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
