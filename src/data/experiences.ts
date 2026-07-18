import type { Localized } from './types';

/**
 * EXPERIENCIAS
 * ------------------------------------------------------------------
 * Contenido de la seccion horizontal "Experiencias" del home.
 * Edita, agrega o quita experiencias modificando este arreglo.
 *  - `title` y `description` son bilingues: { es, en }.
 *  - `image` es una ruta dentro de /public. Reemplaza el placeholder
 *     por tu foto real manteniendo el nombre, o cambia la ruta aqui.
 * ------------------------------------------------------------------
 */

export type Experience = {
  id: string;
  title: Localized;
  description: Localized;
  image: string;
};

export const experiences: Experience[] = [
  {
    id: 'playa-bonita',
    title: { es: 'Playa Bonita', en: 'Playa Bonita' },
    description: {
      es: 'Kilometros de arena blanca y aguas tranquilas, perfecta para largas caminatas al atardecer.',
      en: 'Miles of white sand and calm waters, perfect for long sunset walks.',
    },
    image: '/images/experiences/playa-bonita.jpg',
  },
  {
    id: 'cascada-el-limon',
    title: { es: 'Cascada El Limon', en: 'El Limon Waterfall' },
    description: {
      es: 'Una caida de 40 metros escondida en la selva, accesible a caballo o a pie entre paisajes de ensueno.',
      en: 'A 40-meter waterfall hidden in the jungle, reached on horseback or on foot through dreamlike scenery.',
    },
    image: '/images/experiences/cascada-el-limon.jpg',
  },
  {
    id: 'playa-rincon',
    title: { es: 'Playa Rincon', en: 'Playa Rincon' },
    description: {
      es: 'Considerada una de las mejores playas del Caribe, virgen y rodeada de montanas y cocoteros.',
      en: 'Rated one of the best beaches in the Caribbean, pristine and framed by mountains and coconut palms.',
    },
    image: '/images/experiences/playa-rincon.jpg',
  },
  {
    id: 'gastronomia',
    title: { es: 'Gastronomia local', en: 'Local Cuisine' },
    description: {
      es: 'Del pescado fresco del dia a la fusion franco-caribena que define la mesa de Las Terrenas.',
      en: 'From the fresh catch of the day to the French-Caribbean fusion that defines Las Terrenas dining.',
    },
    image: '/images/experiences/gastronomia.jpg',
  },
];
