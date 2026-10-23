import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Reveal from '@/components/ui/Reveal';
import DrawLine from '@/components/ui/DrawLine';
import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/sections/PropertyCard';
import { getProperties } from '@/lib/properties';
import { jsonLd, catalogGraph } from '@/lib/seo';
import { mainPhone, site, whatsappUrl } from '@/lib/site';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 9;
type Operation = 'todas' | 'renta' | 'venta';
type Props = { searchParams: Promise<{ operacion?: string; pagina?: string }> };

const noindex = process.env.NEXT_PUBLIC_NOINDEX === 'true';

function parse(sp: { operacion?: string; pagina?: string }) {
  const operation: Operation = sp.operacion === 'renta' || sp.operacion === 'venta' ? sp.operacion : 'todas';
  const page = Math.max(1, Math.floor(Number(sp.pagina)) || 1);
  return { operation, page };
}

function href(operation: Operation, page: number) {
  const q = new URLSearchParams();
  if (operation !== 'todas') q.set('operacion', operation);
  if (page > 1) q.set('pagina', String(page));
  const s = q.toString();
  return `/propiedades${s ? `?${s}` : ''}`;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { operation, page } = parse(await searchParams);
  const label = operation === 'renta' ? 'en renta' : operation === 'venta' ? 'en venta' : 'en renta y venta';
  const title = `Propiedades ${label}${page > 1 ? `, página ${page}` : ''}`;
  const description = `Catálogo de propiedades ${label} de ${site.name} en la Ciudad de México, con fotos, superficie y precios.`;
  const url = href(operation, page);
  return {
    title,
    description,
    alternates: { canonical: url },
    // Los filtros repiten contenido del catálogo completo: se siguen, pero no se indexan.
    robots: noindex || operation !== 'todas' ? { index: false, follow: true } : undefined,
    openGraph: { type: 'website', url, title: `${title} | ${site.name}`, description, locale: 'es_MX' },
  };
}

export default async function CatalogPage({ searchParams }: Props) {
  const { operation, page } = parse(await searchParams);
  const all = await getProperties();

  const counts = {
    todas: all.length,
    renta: all.filter((p) => p.rentPrice > 0).length,
    venta: all.filter((p) => p.salePrice > 0).length,
  };
  const filtered = all.filter((p) => (operation === 'todas' ? true : operation === 'renta' ? p.rentPrice > 0 : p.salePrice > 0));
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (page > pages) redirect(href(operation, pages));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const wa = whatsappUrl('Hola, quisiera conocer las propiedades que tienen disponibles.');
  const tabs: { id: Operation; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'renta', label: 'En renta' },
    { id: 'venta', label: 'En venta' },
  ];

  return (
    <div className="bg-white pb-24 pt-28 md:pt-36">
      <div className="container-page">
        <Reveal>
          <nav aria-label="Ruta de navegación" className="text-[0.95rem] text-slate">
            <Link href="/" className="link-line text-graphite">
              Inicio
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span aria-current="page">Propiedades</span>
          </nav>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="h-section">Propiedades disponibles</h1>
              <p className="mt-5 text-lg text-slate">
                {filtered.length > 0
                  ? `${filtered.length} ${filtered.length === 1 ? 'propiedad publicada' : 'propiedades publicadas'}${
                      pages > 1 ? `. Página ${page} de ${pages}.` : '.'
                    }`
                  : 'Cuéntanos qué buscas y te decimos qué tenemos disponible.'}
              </p>
            </div>

            {all.length > 0 && (
              <nav aria-label="Filtrar por operación" className="flex w-full shrink-0 border border-ink lg:w-auto">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={href(tab.id, 1)}
                    aria-current={operation === tab.id ? 'true' : undefined}
                    scroll={false}
                    className={cn(
                      'inline-flex min-h-11 flex-1 items-center justify-center whitespace-nowrap px-3 text-[0.95rem] font-semibold transition-colors sm:px-5 lg:flex-none',
                      operation === tab.id ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-mist',
                    )}
                  >
                    {tab.label}
                    <span className={cn('ml-2 font-normal', operation === tab.id ? 'text-white/80' : 'text-slate')}>
                      {counts[tab.id]}
                    </span>
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </Reveal>

        <DrawLine className="mt-12" />

        {visible.length === 0 ? (
          <Reveal className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl">
                {all.length === 0
                  ? 'El catálogo en línea se está actualizando.'
                  : `No hay propiedades ${operation === 'renta' ? 'en renta' : 'en venta'} publicadas por ahora.`}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-slate">
                Dinos zona, presupuesto y si quieres comprar o rentar, y te decimos qué tenemos disponible, incluso lo que aún no está publicado.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link href="/#contacto" className="btn btn-ink">
                Contarnos qué busco
              </Link>
              <a
                href={wa ?? `tel:${mainPhone.tel}`}
                {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="btn btn-line btn-line-dark"
              >
                {wa ? 'Preguntar por WhatsApp' : `Llamar al ${mainPhone.display}`}
              </a>
            </div>
          </Reveal>
        ) : (
          <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((property, index) =>
              index < 3 ? (
                // Primera fila: entra con CSS (solo desplazamiento) para no retrasar el LCP esperando a JavaScript.
                <li key={property.id} className="slide-up" style={{ '--d': `${index * 80}ms` } as React.CSSProperties}>
                  <PropertyCard property={property} priority heading="h2" />
                </li>
              ) : (
                <Reveal as="li" key={property.id} delay={(index % 3) * 0.08}>
                  <PropertyCard property={property} heading="h2" />
                </Reveal>
              ),
            )}
          </ul>
        )}

        <Pagination page={page} pages={pages} hrefFor={(n) => href(operation, n)} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(catalogGraph(visible, href(operation, page), (page - 1) * PAGE_SIZE)) }} />
    </div>
  );
}
