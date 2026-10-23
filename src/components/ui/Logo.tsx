import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** "light" = versión blanca para fondos oscuros; "color" = versión de marca para fondos claros */
  variant?: 'light' | 'color';
  className?: string;
  priority?: boolean;
}

const sources = {
  light: { src: '/images/logo-white.svg', width: 721, height: 408 },
  color: { src: '/images/logo-color.svg', width: 878, height: 494 },
} as const;

export default function Logo({ variant = 'color', className, priority }: LogoProps) {
  const logo = sources[variant];
  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt="MG Servicio Inmobiliario"
      priority={priority}
      unoptimized
      className={cn('h-11 w-auto', className)}
    />
  );
}
