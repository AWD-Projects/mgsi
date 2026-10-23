'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[4/3] place-items-center bg-mist text-slate">
        <span className="flex flex-col items-center gap-2">
          <ImageOff className="size-10" strokeWidth={1.25} aria-hidden="true" />
          Fotos próximamente
        </span>
      </div>
    );
  }

  const go = (next: number) => setIndex((next + images.length) % images.length);

  return (
    <div>
      <div
        className="relative aspect-[4/3] overflow-hidden bg-mist"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Fotos de ${title}`}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${title}, foto ${index + 1} de ${images.length}`}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Foto anterior"
              className="absolute left-0 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-white text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Foto siguiente"
              className="absolute right-0 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-white text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <p className="absolute bottom-0 left-0 bg-ink px-3 py-1.5 text-sm font-medium text-white" aria-live="polite">
              {index + 1} / {images.length}
            </p>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="snap-rail mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <li key={src} className="w-24 shrink-0 sm:w-28">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'relative block aspect-[4/3] w-full overflow-hidden border-2 transition-colors',
                  i === index ? 'border-brand' : 'border-transparent opacity-80 hover:opacity-100',
                )}
              >
                <Image src={src} alt="" fill sizes="112px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
