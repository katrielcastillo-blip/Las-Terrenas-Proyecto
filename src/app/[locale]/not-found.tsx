import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 font-serif text-4xl text-palm md:text-5xl">Las Terrenas</h1>
      <p className="mt-4 max-w-md font-light text-charcoal/70">
        Esta pagina no existe. / This page does not exist.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Inicio / Home
      </Link>
    </section>
  );
}
