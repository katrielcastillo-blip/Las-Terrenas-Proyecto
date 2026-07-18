import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Idiomas soportados. El espanol es el idioma por defecto.
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // Siempre muestra el prefijo de idioma en la URL (/es, /en).
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
