# Westland Marcaciones — Despliegue en GitHub Pages

## Archivos que van en la raíz del repositorio
- `index.html` — la aplicación completa
- `manifest.json` — hace que el navegador pueda "instalar" la app
- `sw.js` — service worker (permite instalación y funcionamiento sin conexión de la pantalla base)

Los tres archivos deben quedar **al mismo nivel** (la raíz del repo), no en subcarpetas.

## Pasos para activar GitHub Pages
1. En tu repositorio de GitHub, ve a **Settings → Pages**.
2. En "Source", selecciona la rama (normalmente `main`) y la carpeta `/ (root)`.
3. Dale **Save**. GitHub te da una URL tipo:
   `https://tu-usuario.github.io/nombre-del-repo/`
4. Espera 1–2 minutos y entra a esa URL — ya debe cargar la app.

## Por qué cambié cómo se genera el manifest y el service worker
Antes, tanto el `manifest.json` como el service worker se generaban "al vuelo" con JavaScript (usando `Blob` URLs), en vez de ser archivos reales. Eso funcionaba parcialmente en Netlify, pero **no es confiable para que Chrome/Android reconozca la app como instalable**, y en algunos casos el service worker ni siquiera lograba registrarse (los navegadores bloquean el registro de service workers desde `blob:` URLs). Ahora ambos son archivos reales y estáticos — esto es lo correcto para que "Agregar a pantalla de inicio" funcione bien y de forma consistente en Android e iOS.

## Cómo instalar la app en el teléfono
- **Android (Chrome):** entra a la URL, espera unos segundos, te debe aparecer un banner o el botón de instalar (⋮ → "Instalar aplicación" o "Agregar a pantalla de inicio").
- **iPhone (Safari):** entra a la URL → botón compartir (□↑) → "Agregar a pantalla de inicio".

## Sobre el ícono
El ícono sigue apuntando a la misma imagen que ya usabas (alojada en ibb.co). Funciona, pero depende de que ese servicio externo siga activo. Si en algún momento quieres que el ícono viva dentro del mismo repositorio (más confiable a largo plazo), súbelo como `icon-192.png` y `icon-512.png` en la raíz del repo y avísame para actualizar las rutas en `manifest.json` y en el `<link rel="apple-touch-icon">` del `index.html`.

## Sobre Firebase
El cambio de hosting (Netlify → GitHub Pages) **no afecta Firebase**. La base de datos, autenticación y reglas siguen siendo las mismas — solo cambia dónde vive el archivo `index.html`. No hace falta tocar nada en Firebase Console por este cambio.
