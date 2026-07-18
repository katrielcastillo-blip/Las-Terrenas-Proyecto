import type { Localized } from './types';

/**
 * VILLAS
 * ------------------------------------------------------------------
 * Aqui vive TODO el contenido de tus villas. Para agregar, editar o
 * quitar una villa, modifica este arreglo. No hace falta tocar
 * ningun componente.
 *
 * Notas:
 *  - `slug` es la parte final de la URL: /es/villas/<slug>. Usa solo
 *     minusculas, numeros y guiones. Debe ser unico.
 *  - `images` son rutas dentro de /public. Reemplaza los archivos
 *     placeholder por tus fotos reales manteniendo los mismos nombres,
 *     o cambia las rutas aqui.
 *  - `amenities` son identificadores. Su texto traducido vive en
 *     /messages/es.json y /messages/en.json bajo "amenities".
 *     Amenidades disponibles: wifi, pool, ac, kitchen, parking, beach,
 *     ocean_view, garden, breakfast, cleaning, workspace, bbq.
 *  - Los textos (name, tagline, description) son bilingues: { es, en }.
 * ------------------------------------------------------------------
 */

export type Villa = {
  slug: string;
  name: Localized;
  tagline: Localized;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  /** Imagen principal usada en las cards y el hero de la villa. */
  cover: string;
  /** Galeria de la pagina de detalle. */
  images: string[];
  amenities: string[];
  description: Localized;
};

export const villas: Villa[] = [
  {
    slug: 'villa-palmera',
    name: { es: 'Villa Palmera', en: 'Villa Palmera' },
    tagline: {
      es: 'Refugio frente al mar entre palmeras',
      en: 'Beachfront retreat among the palms',
    },
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    cover: '/images/villas/villa-1/01.jpg',
    images: [
      '/images/villas/villa-1/01.jpg',
      '/images/villas/villa-1/02.jpg',
      '/images/villas/villa-1/03.jpg',
      '/images/villas/villa-1/04.jpg',
      '/images/villas/villa-1/05.jpg',
    ],
    amenities: ['wifi', 'pool', 'ac', 'kitchen', 'beach', 'ocean_view', 'parking', 'cleaning'],
    description: {
      es: 'Una villa de cuatro habitaciones a pasos de la arena, donde el sonido de las olas acompana cada manana. Espacios abiertos, techos altos de madera y una piscina infinita que se funde con el horizonte del Atlantico. Ideal para familias o grupos que buscan privacidad sin renunciar a la playa.',
      en: 'A four-bedroom villa steps from the sand, where the sound of the waves accompanies every morning. Open spaces, high wooden ceilings, and an infinity pool that blends into the Atlantic horizon. Perfect for families or groups seeking privacy without giving up the beach.',
    },
  },
  {
    slug: 'villa-coralina',
    name: { es: 'Villa Coralina', en: 'Villa Coralina' },
    tagline: {
      es: 'Elegancia tropical con jardin privado',
      en: 'Tropical elegance with a private garden',
    },
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    cover: '/images/villas/villa-2/01.jpg',
    images: [
      '/images/villas/villa-2/01.jpg',
      '/images/villas/villa-2/02.jpg',
      '/images/villas/villa-2/03.jpg',
      '/images/villas/villa-2/04.jpg',
      '/images/villas/villa-2/05.jpg',
    ],
    amenities: ['wifi', 'pool', 'ac', 'kitchen', 'garden', 'parking', 'breakfast', 'workspace'],
    description: {
      es: 'Rodeada de un jardin tropical exuberante, Villa Coralina combina lineas limpias y detalles artesanales dominicanos. Tres suites luminosas, una terraza sombreada para cenas al aire libre y una piscina rodeada de vegetacion. Un remanso de calma a cinco minutos del pueblo.',
      en: 'Surrounded by a lush tropical garden, Villa Coralina blends clean lines with Dominican artisan details. Three bright suites, a shaded terrace for open-air dinners, and a pool framed by greenery. A haven of calm five minutes from town.',
    },
  },
  {
    slug: 'villa-almendra',
    name: { es: 'Villa Almendra', en: 'Villa Almendra' },
    tagline: {
      es: 'Vistas al oceano desde la colina',
      en: 'Ocean views from the hillside',
    },
    guests: 10,
    bedrooms: 5,
    bathrooms: 5,
    cover: '/images/villas/villa-3/01.jpg',
    images: [
      '/images/villas/villa-3/01.jpg',
      '/images/villas/villa-3/02.jpg',
      '/images/villas/villa-3/03.jpg',
      '/images/villas/villa-3/04.jpg',
      '/images/villas/villa-3/05.jpg',
    ],
    amenities: ['wifi', 'pool', 'ac', 'kitchen', 'ocean_view', 'parking', 'bbq', 'cleaning'],
    description: {
      es: 'Encaramada en una colina con vistas panoramicas al oceano, Villa Almendra es la mayor de la coleccion. Cinco habitaciones, amplias terrazas para atardeceres inolvidables y una piscina de borde infinito. Perfecta para celebraciones, retiros o reuniones familiares memorables.',
      en: 'Perched on a hillside with panoramic ocean views, Villa Almendra is the largest in the collection. Five bedrooms, expansive terraces for unforgettable sunsets, and an infinity-edge pool. Perfect for celebrations, retreats, or memorable family gatherings.',
    },
  },
];

/** Busca una villa por su slug. Devuelve undefined si no existe. */
export function getVillaBySlug(slug: string): Villa | undefined {
  return villas.find((villa) => villa.slug === slug);
}
