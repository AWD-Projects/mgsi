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
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-6">
          <Logo variant="light" className="h-14" />
          <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-white/80">
            Asesoría inmobiliaria, administrativa y legal para quien compra, vende, renta o administra una propiedad en la Ciudad de México.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de MG Servicio Inmobiliario"
              className="grid size-11 place-items-center border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <FacebookIcon className="size-6" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de MG Servicio Inmobiliario"
              className="grid size-11 place-items-center border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <InstagramIcon className="size-6" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-white">Oficina</h2>
          <address className="mt-5 text-[0.95rem] not-italic leading-relaxed text-white/80">
            {site.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-5 text-[0.95rem] text-white/80">
            {site.hours.label}
            <span className="block">{site.hours.ranges.map((r) => r.text).join(' y ')}</span>
          </p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-white">Contacto</h2>
          <ul className="mt-5 space-y-2 text-[0.95rem] text-white/80">
            {site.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className="link-line">
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="link-line">
                {site.email}
              </a>
            </li>
          </ul>
          <ul className="mt-8 space-y-2 text-[0.95rem] text-white/80">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-line">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
