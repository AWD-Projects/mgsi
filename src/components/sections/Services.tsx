import Reveal from '@/components/ui/Reveal';

const areas = [
  {
    name: 'Inmobiliaria',
    summary: 'Para quien compra, vende o renta y quiere cerrar bien.',
    items: [
      {
        title: 'Compra y venta',
        text: 'Asesoría en operaciones de propiedades residenciales y comerciales.',
        points: ['Valuación profesional', 'Negociación', 'Documentación legal'],
      },
      {
        title: 'Renta',
        text: 'Gestión de propiedades en renta con seguimiento de todo el proceso.',
        points: ['Búsqueda de inquilinos', 'Contratos legales', 'Administración'],
      },
      {
        title: 'Consultoría',
        text: 'Para inversionistas y desarrolladores inmobiliarios.',
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
        text: 'Administración de propiedades con mantenimiento y supervisión constante.',
        points: ['Mantenimiento', 'Cobros', 'Reportes mensuales'],
      },
      {
        title: 'Seguros',
        text: 'Protección para tu patrimonio inmobiliario con seguros especializados.',
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
        text: 'Soporte legal especializado en transacciones inmobiliarias.',
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
            Una sola oficina cubre las tres partes de una operación inmobiliaria. Así no pasas de un despacho a otro entre
            la visita y la firma.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-14 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.name} delay={index * 0.08} className="border-t-2 border-ink pt-6">
              <h3 className="text-4xl">{area.name}</h3>
              <p className="mt-3 text-graphite">{area.summary}</p>
              <ul className="mt-8 divide-y divide-[#d9d9d9] border-t border-[#d9d9d9]">
                {area.items.map((item) => (
                  <li key={item.title} className="py-6">
                    <h4 className="font-sans text-lg font-semibold leading-snug tracking-normal">{item.title}</h4>
                    <p className="mt-2 text-[0.95rem] text-graphite">{item.text}</p>
                    <ul className="mt-4 space-y-1.5 text-[0.95rem] text-graphite">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-brand" />
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
                    Cuéntanos tu caso
                  </a>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
