/**
 * CONFIGURACION GLOBAL DEL SITIO
 * ------------------------------------------------------------------
 * Este es el archivo mas importante para personalizar el sitio.
 * Edita aqui tu nombre de marca, numero de WhatsApp, redes sociales
 * y datos de contacto. NO necesitas tocar ningun componente.
 * ------------------------------------------------------------------
 */

export const siteConfig = {
  /** Nombre de tu marca. Reemplaza [NOMBRE_MARCA] por el nombre real. */
  brandName: '[NOMBRE_MARCA]',

  /** Dominio final del sitio (sin barra al final). Usado para SEO / og:image. */
  siteUrl: 'https://www.tu-dominio.com',

  /**
   * Numero de WhatsApp en formato internacional SIN espacios ni signos,
   * empezando por el codigo de pais. Ejemplo Rep. Dominicana: 18091234567
   * Reemplaza el placeholder por tu numero real.
   */
  whatsappNumber: '+1809XXXXXXX',

  /** Correo de contacto para el formulario de solicitud. */
  contactEmail: 'reservas@tu-dominio.com',

  /** Ubicacion mostrada en el footer. */
  location: 'Las Terrenas, Samana, Republica Dominicana',

  /** Redes sociales. Deja el string vacio ('') para ocultar un icono. */
  social: {
    instagram: 'https://instagram.com/tu-cuenta',
    facebook: 'https://facebook.com/tu-cuenta',
    tiktok: '',
  },
} as const;

/**
 * Genera un enlace de WhatsApp con un mensaje pre-llenado.
 * @param message Texto que aparecera escrito en el chat.
 */
export function buildWhatsAppLink(message: string): string {
  const digits = siteConfig.whatsappNumber.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
