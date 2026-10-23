/**
 * Fuente única de datos de MG Servicio Inmobiliario.
 * Teléfonos, dirección y horario salen de aquí para el sitio, el SEO y el correo.
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mgsi.netlify.app').replace(/\/$/, '');

export const site = {
  name: 'MG Servicio Inmobiliario',
  shortName: 'MGSI',
  url: siteUrl,
  locale: 'es-MX',
  email: 'contacto@mgsi.mx',
  /** WhatsApp de MGSI: lada de país 52 + 10 dígitos (55 5534 2493). Se puede sobrescribir con NEXT_PUBLIC_WHATSAPP_NUMBER. */
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '525555342493').replace(/\D/g, ''),
  phones: [
    { display: '55 5534 2493', tel: '+525555342493' },
    { display: '55 5534 5944', tel: '+525555345944' },
    { display: '55 5524 8780', tel: '+525555248780' },
  ],
  address: {
    street: 'Av. Coyoacán 1435, Centro Urbano Presidente Alemán, Edificio H, Despacho 60-B',
    lines: [
      'Av. Coyoacán 1435',
      'Centro Urbano Presidente Alemán',
      'Edificio H, Despacho 60-B',
      'Col. Del Valle, C.P. 03100',
      'Ciudad de México',
    ],
    locality: 'Ciudad de México',
    region: 'CDMX',
    postalCode: '03100',
    country: 'MX',
  },
  hours: {
    label: 'Lunes a viernes',
    ranges: [
      { opens: '09:30', closes: '14:30', text: '9:30 a 14:30 h' },
      { opens: '15:30', closes: '18:00', text: '15:30 a 18:00 h' },
    ],
  },
  social: {
    facebook: 'https://www.facebook.com/mgservicioinmobiliario',
    instagram: 'https://www.instagram.com/mgservicioinmobiliario',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Av. Coyoacán 1435, Col. Del Valle, 03100 Ciudad de México'),
} as const;

export const mainPhone = site.phones[0];

/** Enlace a WhatsApp con mensaje prellenado; null si aún no hay número configurado. */
export function whatsappUrl(message: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
