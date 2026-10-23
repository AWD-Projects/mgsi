import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyContact from '@/components/StickyContact';
import { site, siteUrl } from '@/lib/site';
import { jsonLd, baseGraph } from '@/lib/seo';

const display = localFont({
  src: './fonts/Newsreader-Variable.woff2',
  variable: '--font-newsreader',
  weight: '200 800',
  display: 'swap',
});

const grotesk = localFont({
  src: './fonts/SchibstedGrotesk-Variable.woff2',
  variable: '--font-grotesk',
  weight: '400 900',
  display: 'swap',
});

const title = 'MG Servicio Inmobiliario | Compra, venta y renta en CDMX';
const description =
  'Inmobiliaria en la Col. Del Valle, CDMX. Compra, vende o renta con respaldo legal y administración de tu propiedad en una sola oficina. Llámanos o escríbenos.';
const noindex = process.env.NEXT_PUBLIC_NOINDEX === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: 'AMOXTLI®',
  alternates: { canonical: '/', languages: { 'es-MX': '/' } },
  robots: noindex
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
      },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    locale: 'es_MX',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: '#B40039',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${grotesk.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <StickyContact />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(baseGraph()) }} />
      </body>
    </html>
  );
}
