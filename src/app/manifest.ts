import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MG Servicio Inmobiliario',
    short_name: 'MGSI',
    description: 'Inmobiliaria en la Col. Del Valle, CDMX: compra, venta, renta y administración de propiedades.',
    lang: 'es-MX',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#B40039',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
