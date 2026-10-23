import { cn } from '@/lib/utils';

/** Línea que se dibuja de izquierda a derecha al entrar en pantalla (CSS puro). */
export default function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn('draw-line block h-0.5 bg-ink', className)}
      style={{ '--rd': `${Math.round(delay * 100)}%` } as React.CSSProperties}
    />
  );
}
