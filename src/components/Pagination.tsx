import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Paginación con enlaces reales (rastreables por buscadores). `hrefFor` arma la URL de cada página. */
export default function Pagination({
  page,
  pages,
  hrefFor,
}: {
  page: number;
  pages: number;
  hrefFor: (page: number) => string;
}) {
  if (pages <= 1) return null;

  // 1 … 4 5 6 … 12
  const set = new Set([1, pages, page - 1, page, page + 1]);
  const list = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const items: (number | 'gap')[] = [];
  list.forEach((n, i) => {
    if (i > 0 && n - list[i - 1] > 1) items.push('gap');
    items.push(n);
  });

  const edge = 'inline-flex min-h-11 items-center gap-2 px-4 text-[0.95rem] font-semibold transition-colors';
  return (
    <nav aria-label="Paginación del catálogo" className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={cn(edge, 'hover:bg-mist')}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Anterior
        </Link>
      ) : (
        <span className={cn(edge, 'text-slate/70')} aria-disabled="true">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Anterior
        </span>
      )}

      <ul className="order-last flex w-full items-center justify-center gap-1 sm:order-none sm:w-auto">
        {items.map((item, i) =>
          item === 'gap' ? (
            <li key={`g${i}`} aria-hidden="true" className="px-2 text-slate">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                aria-label={`Página ${item}`}
                aria-current={item === page ? 'page' : undefined}
                className={cn(
                  'grid size-11 place-items-center text-[0.95rem] font-semibold transition-colors',
                  item === page ? 'bg-ink text-white' : 'text-ink hover:bg-mist',
                )}
              >
                {item}
              </Link>
            </li>
          ),
        )}
      </ul>

      {page < pages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={cn(edge, 'hover:bg-mist')}>
          Siguiente
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      ) : (
        <span className={cn(edge, 'text-slate/70')} aria-disabled="true">
          Siguiente
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
