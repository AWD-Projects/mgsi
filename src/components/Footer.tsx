import Link from 'next/link';
import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons';
import Logo from '@/components/ui/Logo';
import { site } from '@/lib/site';

const links = [
  { label: 'Propiedades', href: '/propiedades' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink pb-20 text-white md:pb-0">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo variant="light" className="h-12" />
          <div className="mt-8 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de MG Servicio Inmobiliario"
              className="grid size-11 place-items-center text-white/80 transition-colors hover:text-white"
            >
              <FacebookIcon className="size-6" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de MG Servicio Inmobiliario"
              className="grid size-11 place-items-center text-white/80 transition-colors hover:text-white"
            >
              <InstagramIcon className="size-6" />
            </a>
          </div>
        </div>

        <address className="text-[0.95rem] not-italic leading-relaxed text-white/80 lg:col-span-4">
          {site.address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="mt-5 block">
            {site.hours.label}, {site.hours.ranges.map((r) => r.text).join(' y ')}
          </span>
          <span className="mt-5 block">
            {site.phones.map((phone, i) => (
              <span key={phone.tel}>
                {i > 0 && ' · '}
                <a href={`tel:${phone.tel}`} className="link-line">
                  {phone.display}
                </a>
              </span>
            ))}
          </span>
          <a href={`mailto:${site.email}`} className="link-line mt-2 inline-block">
            {site.email}
          </a>
        </address>

        <ul className="space-y-2 text-[0.95rem] text-white/80 lg:col-span-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-line">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
          <p>© {year} MG Servicio Inmobiliario. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{' '}
            <a href="https://www.amoxtli.tech" target="_blank" rel="noopener noreferrer" className="link-line font-medium text-white">
              AMOXTLI®
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
