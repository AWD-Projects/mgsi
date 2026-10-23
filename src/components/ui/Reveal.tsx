'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Segundos de retraso (escalonado entre hermanos). */
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section';
  /** up: sube y aparece. clip: se descubre de abajo hacia arriba. line: una línea que se dibuja. */
  variant?: 'up' | 'clip' | 'line';
}

/**
 * Entrada al hacer scroll con IntersectionObserver (funciona en todos los navegadores).
 * Sin JavaScript, o si el elemento ya está a la vista al cargar, el contenido simplemente se ve.
 */
export default function Reveal({ children, className, delay = 0, as: Tag = 'div', variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // ya visible: no se oculta
    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = 'in';
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      className={cn('reveal', `reveal-${variant}`, className)}
      style={{ '--rd': `${Math.round(delay * 1000)}ms` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
}
