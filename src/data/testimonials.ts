import type { Localized } from './types';

/**
 * TESTIMONIOS
 * ------------------------------------------------------------------
 * Edita, agrega o quita testimonios modificando este arreglo.
 *  - `quote` es bilingue: { es, en }.
 *  - `name` y `location` normalmente no se traducen.
 *  - `rating` es de 1 a 5 (se muestra con estrellas).
 * ------------------------------------------------------------------
 */

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  quote: Localized;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Sophie & Marc',
    location: 'Paris, France',
    rating: 5,
    quote: {
      es: 'La villa supero todas nuestras expectativas. Despertar con el sonido del mar y desayunar frente al oceano fue simplemente magico. Volveremos sin dudarlo.',
      en: 'The villa exceeded every expectation. Waking up to the sound of the sea and having breakfast facing the ocean was simply magical. We will be back without a doubt.',
    },
  },
  {
    name: 'James Whitfield',
    location: 'London, UK',
    rating: 5,
    quote: {
      es: 'Atencion impecable de principio a fin. La reserva por WhatsApp fue instantanea y la casa estaba aun mejor que en las fotos. Un lujo autentico.',
      en: 'Impeccable service from start to finish. Booking over WhatsApp was instant and the house was even better than the photos. Authentic luxury.',
    },
  },
  {
    name: 'Elena Rossi',
    location: 'Milano, Italia',
    rating: 5,
    quote: {
      es: 'Las Terrenas nos conquisto y esta villa fue el hogar perfecto para descubrirla. Privacidad, diseno y una piscina de ensueno. Cinco estrellas cortas.',
      en: 'Las Terrenas won us over and this villa was the perfect home to discover it. Privacy, design, and a dream pool. Five stars is not enough.',
    },
  },
  {
    name: 'The Andersen Family',
    location: 'Toronto, Canada',
    rating: 5,
    quote: {
      es: 'Viajamos con tres ninos y todo estuvo pensado al detalle. Espacio de sobra, seguridad y una playa a pocos pasos. Las mejores vacaciones en familia.',
      en: 'We travelled with three kids and everything was thought through. Plenty of space, safety, and a beach steps away. The best family holiday ever.',
    },
  },
];
