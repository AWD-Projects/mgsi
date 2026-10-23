import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Segundos de retraso aproximado (escalonado entre elementos hermanos). */
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * Entrada al hacer scroll con CSS puro (animation-timeline: view()).
 * Sin JavaScript ni hidratación: si el navegador no lo soporta, el contenido simplemente se ve.
 */
export default function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  return (
    <Tag className={cn('reveal', className)} style={{ '--rd': `${Math.round(delay * 100)}%` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
