'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';

// LazyMotion + domAnimation: carga solo las funciones de animación que usa el sitio (menos JS inicial).
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
