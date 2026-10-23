# PRODUCT.md — MG Servicio Inmobiliario (MGSI)

## Propósito
Sitio público de MG Servicio Inmobiliario. Muestra las propiedades disponibles (renta y venta), explica los tres frentes del despacho (inmobiliario, administrativo y legal) y lleva al visitante a contactar por WhatsApp, teléfono o formulario.

## Audiencia
- Personas y empresas que buscan rentar o comprar un inmueble en CDMX.
- Propietarios que quieren vender, rentar o que les administren su propiedad.
- Quienes necesitan revisión legal o notarial de una operación inmobiliaria.

## Acción principal
Preguntar por una propiedad o escribir al despacho (WhatsApp primero, teléfono y formulario como respaldo).

## Marca (3 adjetivos)
Firme, transparente, cercana. Más de 40 años de trayectoria.

## Datos reales (no inventar)
- Oficina: Av. Coyoacán 1435, Centro Urbano Presidente Alemán, Edificio H, Despacho 60-B, Col. Del Valle, C.P. 03100, CDMX.
- Horario: lunes a viernes, 9:30 a 14:30 h y 15:30 a 18:00 h.
- Teléfonos y correos: `src/lib/site.ts` (única fuente).
- Misión, visión y principios: texto de marca; no reescribir sin aprobación del cliente.
- No hay testimonios ni cifras de clientes publicados: no agregarlos hasta que el cliente los entregue y confirme.

## Datos y administración
- Las propiedades viven en MongoDB y se administran en el proyecto `mg-portal`. Este sitio solo lee (propiedades activas, sin el campo interno `notes`).
- No hay login ni panel de administración en este repositorio.

## Restricciones
- Colores y logos de la marca intocables.
- Hospedaje en Netlify; `dev` para pruebas con preview, `main` solo con aprobación explícita.
- Español de México.

## Voz
Directa y concreta; frases cortas; la acción dicha con claridad ("Preguntar por esta propiedad"). Sin adjetivos de relleno.
