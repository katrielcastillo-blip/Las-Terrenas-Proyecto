import { notFound } from 'next/navigation';

/** Captura cualquier ruta no reconocida dentro de un idioma y muestra 404. */
export default function CatchAllPage() {
  notFound();
}
