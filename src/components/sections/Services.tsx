import Reveal from '@/components/ui/Reveal';

const areas = [
  {
    name: 'Inmobiliaria',
    summary: 'Para quien compra, vende o renta y quiere cerrar bien.',
    items: [
      {
        title: 'Compra y venta',
        text: 'Te acompañamos a comprar o vender una propiedad residencial o comercial.',
        points: ['Valuación de la propiedad', 'Negociación', 'Documentación legal'],
      },
      {
        title: 'Renta',
        text: 'Si tienes una propiedad para rentar, buscamos inquilino y formalizamos el contrato.',
        points: ['Búsqueda de inquilinos', 'Contratos legales', 'Administración'],
      },
      {
        title: 'Consultoría',
        text: 'Para quien invierte o desarrolla y necesita datos antes de decidir.',
        points: ['Análisis de mercado', 'Estrategias de inversión', 'Estudios de factibilidad'],
      },
    ],
  },
  {
    name: 'Administrativa',
    summary: 'Para quien tiene propiedades y no quiere perseguir pendientes.',
    items: [
      {
        title: 'Administración',
        text: 'Nos ocupamos de tu propiedad día a día, para que no tengas que hacerlo tú.',
        points: ['Mantenimiento', 'Cobros', 'Reportes mensuales'],
      },
      {
        title: 'Seguros',
        text: 'Aseguramos tu propiedad y te acompañamos si hay que reclamar.',
        points: ['Seguros de propiedad', 'Cobertura legal', 'Asesoría en reclamaciones'],
      },
    ],
  },
  {
    name: 'Legal',
    summary: 'Para quien necesita que el papel esté en orden antes de firmar.',
    items: [
      {
        title: 'Asesoría legal',
        text: 'Revisamos el papel de la operación antes de que firmes y te acompañamos si surge un conflicto.',
        points: ['Revisión de documentos', 'Trámites notariales', 'Resolución de conflictos'],
      },
    ],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section-y bg-mist">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <h2 className="h-section">Servicios</h2>
          <p className="mt-5 text-lg text-graphite">
            Una operación inmobiliaria tiene tres frentes: cerrar el trato, cuidar el papel y administrar la propiedad después. Aquí los atiende el mismo equipo.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-14 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.name} delay={index * 0.12}>
              <div className="border-t-2 border-ink pt-6">
              <h3 className="text-4xl">{area.name}</h3>
              <p className="mt-3 text-graphite">{area.summary}</p>
              <ul className="mt-8 divide-y divide-[#d9d9d9] border-t border-[#d9d9d9]">
                {area.items.map((item) => (
                  <li key={item.title} className="group py-6">
                    <h4 className="font-sans text-lg font-semibold leading-snug tracking-normal">{item.title}</h4>
                    <p className="mt-2 text-[0.95rem] text-graphite">{item.text}</p>
                    <ul className="mt-4 space-y-1.5 text-[0.95rem] text-graphite">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-brand transition-[width] duration-300 group-hover:w-7" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              {area.name === 'Legal' && (
                <div className="mt-6 border-t border-[#d9d9d9] pt-8">
                  <p className="font-display text-2xl leading-snug">¿No sabes qué necesitas? Cuéntanos tu caso y te decimos por dónde empezar.</p>
                  <a href="#contacto" className="btn btn-ink mt-6">
                    Pedir orientación
                  </a>
                </div>
              )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
