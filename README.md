# Villas de Lujo en Las Terrenas

Sitio web de alquiler vacacional de lujo en **Las Terrenas, República Dominicana**, con estética de lujo minimalista tropical y animaciones al hacer scroll (_scrollytelling_). Bilingüe (español / inglés).

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** GSAP + ScrollTrigger
- **Scroll suave:** Lenis
- **Idiomas:** next-intl (español por defecto en `/es`, inglés en `/en`)
- **Deploy:** Vercel (sin configuración extra)

---

## 🚀 Arrancar el proyecto en tu computadora

Necesitas [Node.js](https://nodejs.org) versión 20 o superior.

```bash
npm install     # instala las dependencias (solo la primera vez)
npm run dev      # arranca el sitio en modo desarrollo
```

Luego abre **http://localhost:3000** en tu navegador. Te redirige automáticamente a `/es`.

Otros comandos útiles:

```bash
npm run build      # genera la versión de producción
npm run typecheck  # revisa que no haya errores de TypeScript
```

---

## ✨ Lo más importante: personalizar el sitio

Casi todo lo que vas a querer cambiar está en **3 archivos de datos** y **2 archivos de idiomas**. **No necesitas saber programar** para editar el contenido: son archivos de texto con un formato sencillo.

| Quiero cambiar... | Edito este archivo |
| --- | --- |
| Nombre de marca, WhatsApp, redes, email | `src/data/config.ts` |
| Las villas (nombres, huéspedes, fotos, descripción) | `src/data/villas.ts` |
| Los testimonios | `src/data/testimonials.ts` |
| Las experiencias (Playa Bonita, etc.) | `src/data/experiences.ts` |
| Los textos de la interfaz (botones, títulos, menú) | `messages/es.json` y `messages/en.json` |
| Las fotos y el video | carpeta `public/images/` y `public/videos/` |

> 💡 Consejo: haz los cambios de a poco y guarda. Si tienes `npm run dev` corriendo, verás los cambios al instante en el navegador.

---

### 1) Poner tu nombre de marca y tu número de WhatsApp

Abre **`src/data/config.ts`** y edita estos valores:

```ts
brandName: '[NOMBRE_MARCA]',          // 👉 pon aquí el nombre de tu marca
whatsappNumber: '+1809XXXXXXX',        // 👉 tu WhatsApp con código de país
contactEmail: 'reservas@tu-dominio.com',
siteUrl: 'https://www.tu-dominio.com', // 👉 tu dominio final (para SEO)
social: {
  instagram: 'https://instagram.com/tu-cuenta',
  facebook: 'https://facebook.com/tu-cuenta',
  tiktok: '',                          // deja '' (vacío) para ocultar un ícono
},
```

- El **número de WhatsApp** se usa en TODO el sitio (botón flotante, botones de reserva). Solo lo cambias aquí, una vez.
  Escríbelo con el código de país. Ejemplo República Dominicana: `+18091234567`.
- El **nombre de marca** aparece en el logo, el footer y los títulos de Google (SEO).

---

### 2) Editar las villas

Abre **`src/data/villas.ts`**. Cada villa es un bloque como este:

```ts
{
  slug: 'villa-palmera',                 // parte final de la URL: /es/villas/villa-palmera
  name: { es: 'Villa Palmera', en: 'Villa Palmera' },
  tagline: {
    es: 'Refugio frente al mar entre palmeras',
    en: 'Beachfront retreat among the palms',
  },
  guests: 8,                             // número de huéspedes
  bedrooms: 4,                           // habitaciones
  bathrooms: 4,                          // baños
  cover: '/images/villas/villa-1/01.jpg',// foto principal (cards)
  images: [                              // galería de la página de detalle
    '/images/villas/villa-1/01.jpg',
    '/images/villas/villa-1/02.jpg',
    // ...
  ],
  amenities: ['wifi', 'pool', 'ac', 'kitchen', 'beach', 'ocean_view'],
  description: {
    es: 'Descripción en español...',
    en: 'Description in English...',
  },
},
```

- **Para agregar una villa:** copia un bloque completo (desde `{` hasta `},`) y pégalo dentro de los corchetes `[ ]`, cambiando los datos. Usa un `slug` único.
- **Para quitar una villa:** borra su bloque completo.
- **Amenidades disponibles** (escríbelas tal cual): `wifi`, `pool`, `ac`, `kitchen`, `parking`, `beach`, `ocean_view`, `garden`, `breakfast`, `cleaning`, `workspace`, `bbq`. El texto traducido de cada una está en `messages/es.json` y `messages/en.json` bajo `"amenities"`.
- Todos los textos van en los dos idiomas: `{ es: '...', en: '...' }`.

> ⚠️ **No se muestran precios** en ningún lado (es intencional). Siempre se invita a “Consultar disponibilidad”.

---

### 3) Editar testimonios y experiencias

- **Testimonios:** `src/data/testimonials.ts`. Cada uno tiene `name`, `location`, `rating` (1 a 5 estrellas) y `quote` en los dos idiomas.
- **Experiencias:** `src/data/experiences.ts`. Cada una tiene `title`, `description` (bilingües) e `image`.

Se agregan y se quitan igual que las villas: copiando o borrando bloques.

---

### 4) Cambiar los textos de la interfaz (menú, botones, títulos)

Están en **`messages/es.json`** (español) y **`messages/en.json`** (inglés). Los dos archivos tienen exactamente las mismas “llaves”; si cambias un texto en uno, cambia el equivalente en el otro.

Ejemplo:

```json
"hero": {
  "titleLine1": "Villas de lujo",
  "titleLine2": "frente al Caribe"
}
```

---

## 📷 Cambiar las fotos

Todas las imágenes son **placeholders** (bloques de color). Reemplázalos por tus fotos reales **manteniendo el mismo nombre de archivo** y no tendrás que tocar nada de código.

Coloca tus fotos en `public/images/` según esta tabla:

| Archivo a reemplazar | Qué foto poner | Tamaño sugerido |
| --- | --- | --- |
| `public/images/hero-fallback.jpg` | Imagen de respaldo del Hero (se ve si no hay video) | 1920×1080 |
| `public/images/why/01.jpg` | Foto vertical para “Por qué Las Terrenas” | 900×1200 |
| `public/images/why/02.jpg` | Segunda foto vertical de esa sección | 900×1200 |
| `public/images/villas/villa-1/01.jpg` … `05.jpg` | Fotos de la **Villa 1** (la `01` es la principal) | 1200×800 |
| `public/images/villas/villa-2/01.jpg` … `05.jpg` | Fotos de la **Villa 2** | 1200×800 |
| `public/images/villas/villa-3/01.jpg` … `05.jpg` | Fotos de la **Villa 3** | 1200×800 |
| `public/images/experiences/playa-bonita.jpg` | Foto de Playa Bonita | 1200×1000 |
| `public/images/experiences/cascada-el-limon.jpg` | Foto de la Cascada El Limón | 1200×1000 |
| `public/images/experiences/playa-rincon.jpg` | Foto de Playa Rincón | 1200×1000 |
| `public/images/experiences/gastronomia.jpg` | Foto de gastronomía local | 1200×1000 |
| `public/images/cta.jpg` | Foto de fondo de la llamada final a reservar | 1920×1080 |
| `public/images/og.jpg` | Imagen que se ve al compartir el sitio en redes/WhatsApp | 1200×630 |

**Consejos:**
- Usa fotos horizontales (apaisadas) salvo las de la carpeta `why/`, que son verticales.
- Guarda las fotos en formato `.jpg` con el **mismo nombre** que el placeholder.
- Comprime las fotos (por ejemplo en [squoosh.app](https://squoosh.app)) para que el sitio cargue rápido en el celular.
- Si quieres **más o menos fotos** por villa, ajusta la lista `images` en `src/data/villas.ts`.

### El video del Hero

Coloca tu video en `public/videos/hero.mp4` (MP4, en loop, sin audio, idealmente menos de 10 MB). Mientras no exista, se muestra automáticamente la imagen `hero-fallback.jpg`. Hay más detalles en `public/videos/LEEME-poner-hero-mp4-aqui.txt`.

---

## 🌐 Subir el sitio a internet con Vercel (gratis)

[Vercel](https://vercel.com) es gratuito para este tipo de sitio y no requiere configuración extra.

### Paso a paso

1. **Sube el código a GitHub** (si aún no lo está). Este proyecto ya es un repositorio; solo tienes que subir tus cambios:
   ```bash
   git add .
   git commit -m "Mi contenido"
   git push
   ```

2. **Crea una cuenta en Vercel** en [vercel.com](https://vercel.com) usando tu cuenta de GitHub (botón “Continue with GitHub”).

3. En el panel de Vercel, haz clic en **“Add New… → Project”**.

4. **Importa este repositorio** de GitHub (búscalo en la lista y pulsa “Import”).

5. Vercel detecta que es **Next.js** automáticamente. **No cambies nada**: deja el Framework Preset en `Next.js` y los comandos por defecto.

6. Pulsa **“Deploy”** y espera 1–2 minutos. Al terminar tendrás una dirección tipo `https://tu-proyecto.vercel.app`.

7. **(Opcional) Conectar tu propio dominio:** en el proyecto de Vercel ve a **Settings → Domains**, agrega tu dominio (por ejemplo `www.tuvilla.com`) y sigue las instrucciones para apuntar el DNS. Luego actualiza `siteUrl` en `src/data/config.ts` con ese dominio.

> Cada vez que hagas `git push` con cambios, **Vercel actualiza el sitio solo**. No tienes que volver a hacer nada.

---

## 💳 Conectar pagos (Stripe) más adelante — opcional

El botón **“Reservar online”** ya muestra un resumen de la reserva y un paso de pago marcado como _“próximamente / te contactaremos para confirmar”_. La estructura está lista para conectar [Stripe](https://stripe.com) cuando quieras: los detalles están comentados dentro de `src/components/villa/BookingOptions.tsx`.

---

## 🗂️ Estructura del proyecto (referencia)

```
las-terrenas-luxury-rental/
├─ messages/
│  ├─ es.json            # textos de la interfaz en español
│  └─ en.json            # textos de la interfaz en inglés
├─ public/
│  ├─ images/            # 👉 aquí van tus fotos (reemplaza los placeholders)
│  └─ videos/            # 👉 aquí va hero.mp4
├─ src/
│  ├─ app/[locale]/      # páginas (home y detalle de villa) por idioma
│  ├─ components/        # secciones y piezas visuales (no hace falta editarlas)
│  ├─ data/              # 👉 CONTENIDO EDITABLE: config, villas, testimonios, experiencias
│  └─ i18n/              # configuración de idiomas (no hace falta editarla)
└─ README.md
```

Las carpetas marcadas con 👉 son las que vas a tocar para mantener el sitio.
