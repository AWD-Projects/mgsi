import { cn } from '@/lib/utils';

/**
 * Motivo de marca: losas inclinadas apiladas, como las torres del logo.
 * Decorativo, sin texto, con baja opacidad. Cada nivel entra de abajo hacia arriba al hacer scroll (CSS puro).
 */
const levels = [
  { x: 40, w: 150 },
  { x: 24, w: 178 },
  { x: 52, w: 160 },
  { x: 14, w: 196 },
  { x: 60, w: 150 },
  { x: 30, w: 182 },
  { x: 8, w: 200 },
  { x: 48, w: 164 },
];

export default function Niveles({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'brand' }) {
  const height = 26;
  const gap = 12;
  const total = levels.length * (height + gap);
  return (
    <svg aria-hidden="true" focusable="false" viewBox={`0 0 220 ${total}`} className={cn('pointer-events-none select-none', className)}>
      {levels.map((level, index) => {
        const y = index * (height + gap);
        const skew = 22;
        const points = `${level.x + skew},${y} ${level.x + level.w},${y} ${level.x + level.w - skew},${y + height} ${level.x},${y + height}`;
        return (
          <polygon
            key={index}
            points={points}
            fill={tone === 'brand' ? '#B40039' : '#ffffff'}
            className="nivel"
            style={{ '--o': tone === 'brand' ? 1 : 0.2 + (index % 3) * 0.05, '--rd': `${(levels.length - index) * 7}%` } as React.CSSProperties}
          />
        );
      })}
    </svg>
  );
}
