'use client';

import { useRef } from 'react';
import { useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import * as m from 'motion/react-m';

/**
 * Gráficos en movimiento del hero (solo decorativos, detrás del contenido):
 * losas inclinadas que flotan y suben con parallax, y una luz suave que sigue al puntero.
 */
const slabs = [
  { top: '14%', right: '-4%', w: 360, o: 0.1, dur: 9 },
  { top: '26%', right: '2%', w: 300, o: 0.14, dur: 11 },
  { top: '38%', right: '-8%', w: 400, o: 0.08, dur: 10 },
  { top: '50%', right: '4%', w: 320, o: 0.16, dur: 12 },
  { top: '62%', right: '-2%', w: 380, o: 0.1, dur: 8 },
  { top: '74%', right: '6%', w: 280, o: 0.13, dur: 13 },
];

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const mx = useMotionValue(0.75);
  const my = useMotionValue(0.35);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgb(180 0 57 / 0.38), transparent 70%)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
    >
      <m.div style={{ backgroundImage: glow }} className="absolute inset-0 hidden md:block" />
      <m.div style={{ y: lift }} className="absolute inset-0">
        {slabs.map((s, i) => (
          <m.span
            key={i}
            className="absolute hidden h-9 bg-white lg:block"
            style={{ top: s.top, right: s.right, width: s.w, opacity: s.o, clipPath: 'polygon(7% 0, 100% 0, 93% 100%, 0 100%)' }}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: [0, -18, 0], opacity: s.o }}
            transition={{
              x: { duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
              opacity: { duration: 1.2, delay: 0.3 + i * 0.12 },
            }}
          />
        ))}
      </m.div>
    </div>
  );
}
