import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MG Servicio Inmobiliario',
    short_name: 'MGSI',
    description: 'Más de 40 años en asesoría inmobiliaria, administrativa y legal.',
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
