const MINOR_WORDS = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'en', 'con', 'a', 'al', 'por', 'para']);
const KEEP_UPPER = new Set(['cdmx', 'edomex', 'df', 'wc', 'sa', 'cv', 'ac', 'mg', 'mgsi']);
const ABBREVIATIONS: Record<string, string> = {
  'no.': 'No.',
  'desp.': 'Desp.',
  'av.': 'Av.',
  'col.': 'Col.',
  'int.': 'Int.',
  'cp': 'C.P.',
  'c.p.': 'C.P.',
  'esq.': 'Esq.',
  'blvd.': 'Blvd.',
  'edif.': 'Edif.',
  'piso': 'Piso',
};

/**
 * La base guarda muchos títulos en MAYÚSCULAS ("AV. PATRIOTISMO No. 409 DESP. 502").
 * Se normalizan los textos escritos casi todo en mayúsculas (aunque traigan un "No."); el resto se respeta.
 */
export function prettyTitle(value: string): string {
  const text = (value || '').trim().replace(/\s+/g, ' ');
  const upper = (text.match(/[A-ZÁÉÍÓÚÑ]/g) ?? []).length;
  const lower = (text.match(/[a-záéíóúñ]/g) ?? []).length;
  if (!text || upper + lower === 0 || upper / (upper + lower) < 0.8) return text;
  return text
    .split(' ')
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (ABBREVIATIONS[lower]) return ABBREVIATIONS[lower];
      if (KEEP_UPPER.has(lower)) return word.toUpperCase();
      if (/^\d/.test(word)) return word.toLowerCase();
      if (index > 0 && MINOR_WORDS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

/** "60 MTS", "60 mts2", "60" -> "60 m²". Si no encaja, devuelve el texto tal cual. */
export function prettySurface(value: string): string {
  const text = (value || '').trim();
  const match = text.match(/^(\d+(?:[.,]\d+)?)\s*(?:m(?:ts?|etros?)?\.?\s*(?:2|²|cuadrados?)?|m2|m²)?\.?$/i);
  if (match) return `${match[1].replace(',', '.')} m²`;
  return text;
}

export function formatPrice(value: number): string {
  return value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  });
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
    .replace(/-+$/g, '');
}

export function truncate(value: string, max: number): string {
  const text = value.trim().replace(/\s+/g, ' ');
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ') > 40 ? cut.lastIndexOf(' ') : cut.length).replace(/[,.;:\s]+$/, '') + '…';
}
