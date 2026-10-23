# MG Servicio Inmobiliario — sitio público

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · MongoDB (solo lectura) · SendGrid · Netlify.

Las propiedades se administran en el proyecto `mg-portal`; este sitio solo las muestra.

## Desarrollo
```bash
cp .env.example .env.local   # completar valores
npm install
npm run dev
npm run lint && npm run typecheck && npm run build
```
Requiere Node 22.

## Variables de entorno (Netlify)
| Variable | Uso |
|---|---|
| `MONGODB_URI` (`MONGODB_DB` opcional) | Lectura de propiedades |
| `SENDGRID_API_KEY`, `SENDGRID_FROM`, `SENDGRID_TO` | Formulario de contacto |
| `NEXT_PUBLIC_SITE_URL` | URL canónica, sitemap, JSON-LD |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Opcional; por defecto `525555342493` (55 5534 2493) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Verificación de Search Console |
| `NEXT_PUBLIC_NOINDEX` | `true` en previews para no indexar |

## Ramas
`dev` → preview de Netlify. `main` → producción (solo con aprobación).

## Documentos
`PRODUCT.md` (contexto) y `DESIGN.md` (reglas visuales).
