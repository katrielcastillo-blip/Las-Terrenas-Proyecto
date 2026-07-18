import type Lenis from 'lenis';

/**
 * Guarda una referencia compartida a la instancia de Lenis para poder
 * hacer scroll suave a una seccion desde cualquier componente (por
 * ejemplo, los enlaces del navbar).
 */
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

/**
 * Hace scroll suave a un elemento por su id. Devuelve false si el
 * elemento no existe en la pagina actual (para poder navegar al home).
 */
export function scrollToId(id: string, offset = -72): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
  return true;
}
