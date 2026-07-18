/**
 * Tipos compartidos por los archivos de datos.
 * Un texto "Localized" tiene una version en espanol y otra en ingles.
 */
export type Localized = {
  es: string;
  en: string;
};

/** Devuelve el texto en el idioma pedido, con espanol como respaldo. */
export function t(text: Localized, locale: string): string {
  return locale === 'en' ? text.en : text.es;
}
