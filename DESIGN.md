# DESIGN.md — MGSI

## 1. Visual Theme & Atmosphere
Firme, transparente, cercana. Secciones que alternan negro/vino, blanco y gris claro. Una sola pieza firma: el motivo de "niveles" (losas apiladas inclinadas) derivado del logo, usado en hero, 404 y como numeral de apoyo en Nosotros. Diales: variación 6, movimiento 4, densidad 5.

## 2. Color Palette & Roles
- Rojo de marca `#B40039`: acciones principales, enlaces, acentos.
- Negro `#000000` y vino `#3C0013`: hero, footer, degradado (negro → vino → rojo).
- Blanco `#FFFFFF`: fondo base. Grises existentes de la marca para superficies (mist), texto secundario (graphite/slate).
- Texto sobre rojo siempre blanco; texto secundario sobre gris claro con contraste ≥ 4.5:1.

## 3. Typography Rules
- Display: Newsreader (variable, OFL, autoalojada) para títulos, precios y numerales.
- Texto: Schibsted Grotesk (variable, OFL, autoalojada) para UI y párrafos.
- Sin etiquetas decorativas en mayúsculas ni numeración decorativa sobre los títulos.

## 4. Component Stylings
- Radio 0 (esquinas rectas). Botones planos; primario rojo, secundario contorno.
- Ficha de propiedad: foto, línea negra superior, título, filas de dato (superficie, precio), enlace "Ver ficha completa".
- Formularios: campos subrayados, etiqueta arriba, errores en texto junto al campo.

## 5. Layout Principles
Contenedor de 1152px con márgenes de 24px (móvil 20px). Retícula de 12 columnas; secciones con la misma escala vertical. Servicios en tres columnas (Inmobiliaria / Administrativa / Legal).

## 6. Depth & Elevation
Plano. Separación con líneas finas y cambios de fondo; sin sombras ni glassmorphism.

## 7. Do's and Don'ts
- Sí: datos reales, botones con acción concreta, un solo h1 por página.
- No: testimonios o cifras inventadas, adjetivos de marketing repetidos, tarjetas idénticas con iconos en círculo, animación decorativa.

## 8. Responsive Behavior
Móvil primero. Menú a pantalla completa en móvil; barra fija inferior (Llamar / WhatsApp) en la ficha de propiedad. Filtros de propiedades a ancho completo. `prefers-reduced-motion` respetado (se anima al estado final sin duración).

## 9. Agent Prompt Guide
Antes de tocar UI: leer este archivo y PRODUCT.md. Usar los tokens de `globals.css` (`@theme`). Los datos de contacto salen de `src/lib/site.ts`. No instalar paquetes ni cambiar colores/logos sin avisar.
