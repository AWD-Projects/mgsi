# DESIGN.md — MGSI

## 1. Visual Theme & Atmosphere
Minimalista: mucho aire, tipografía grande, líneas finas y casi nada de decoración. Firme, transparente, cercana. Hero oscuro con el degradado de marca (negro → vino → rojo) a pantalla completa; el resto alterna blanco, gris claro y negro. Sin motivos gráficos añadidos: solo tipografía, líneas finas y fotografía de las propiedades. Diales: variación 2, movimiento 1, densidad 2.

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
Plano, con vidrio (glassmorphism) en pocas superficies donde hay algo detrás que difuminar: encabezado al hacer scroll (`glass-light`), etiquetas y contador sobre fotos (`glass-light`/`glass-dark`), franja de datos del hero (`glass-frost`) y barra móvil de contacto. Siempre con borde fino, desenfoque 16–18 px y fondo casi opaco si el navegador no soporta `backdrop-filter`. No usar vidrio sobre fondo blanco liso ni en formularios. Sin sombras decorativas.

## 7. Do's and Don'ts
- Sí: datos reales, botones con acción concreta, un solo h1 por página.
- No: testimonios o cifras inventadas, adjetivos de marketing repetidos, tarjetas idénticas con iconos en círculo, animación decorativa.

## 8. Responsive Behavior
Sin JavaScript de animación: entradas por scroll con CSS (`animation-timeline: view()`, el contenido siempre es visible si no hay soporte). Móvil primero. Menú a pantalla completa en móvil; barra fija inferior (Llamar / WhatsApp) en la ficha de propiedad. Filtros de propiedades a ancho completo. `prefers-reduced-motion` respetado (se anima al estado final sin duración).

## 9. Agent Prompt Guide
Antes de tocar UI: leer este archivo y PRODUCT.md. Usar los tokens de `globals.css` (`@theme`). Los datos de contacto salen de `src/lib/site.ts`. No instalar paquetes ni cambiar colores/logos sin avisar.
