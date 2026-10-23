'use client';

import { useRef } from 'react';
import { useScroll, useTransform, type MotionValue } from 'motion/react';
import * as m from 'motion/react-m';

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  // Mínimo 0.6 de opacidad: el texto siempre cumple contraste y nunca queda oculto.
  const opacity = useTransform(progress, range, [0.6, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block">
      {children}
    </m.span>
  );
}

/** El texto se "enciende" palabra por palabra mientras se hace scroll. */
export default function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.5 / words.length);
        return (
          <span key={i}>
            <Word range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>{' '}
          </span>
        );
      })}
    </p>
  );
}
