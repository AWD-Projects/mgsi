'use client';

import { useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';

/** Barra fina de avance de lectura, pegada arriba. Decorativa. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand"
    />
  );
}
