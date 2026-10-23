'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { mainPhone, site, whatsappUrl } from '@/lib/site';
import { cn } from '@/lib/utils';

const nav = [
  { label: 'Propiedades', id: 'propiedades' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Contacto', id: 'contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const pathname = usePathname();
  // Solo la portada abre con un hero oscuro; en el resto de las páginas el encabezado va siempre sólido.
  const overHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || open || !overHero;
  const wa = whatsappUrl('Hola, me gustaría recibir información sobre sus servicios inmobiliarios.');

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        solid ? 'bg-white shadow-[0_1px_0_0_var(--color-line)]' : 'bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="MG Servicio Inmobiliario, ir al inicio" onClick={() => setOpen(false)}>
          <Logo variant={solid ? 'color' : 'light'} priority className="h-9 md:h-11" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={cn(
                'link-line py-1 text-[0.95rem] font-medium',
                solid ? 'text-graphite' : 'text-white',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={wa ?? `tel:${mainPhone.tel}`}
            {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="btn btn-brand hidden !min-h-10 !px-5 !py-2 md:inline-flex"
          >
            {wa ? 'Escribir por WhatsApp' : `Llamar ${mainPhone.display}`}
          </a>
          <button
            type="button"
            className={cn('-mr-2 grid size-11 place-items-center md:hidden', solid ? 'text-ink' : 'text-white')}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-movil"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink text-white md:hidden on-dark"
        >
          <nav aria-label="Menú móvil" className="container-page flex min-h-full flex-col justify-between pb-10 pt-8">
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-5 font-display text-4xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 grid gap-3">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-brand">
                  Escribir por WhatsApp
                </a>
              )}
              <a href={`tel:${mainPhone.tel}`} className="btn btn-line">
                <Phone className="size-4" aria-hidden="true" />
                Llamar al {mainPhone.display}
              </a>
              <p className="pt-3 text-sm text-white/80">
                {site.hours.label}, {site.hours.ranges.map((r) => r.text).join(' y ')}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
