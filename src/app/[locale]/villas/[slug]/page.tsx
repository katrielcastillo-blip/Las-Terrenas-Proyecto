import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/data/config';
import { getVillaBySlug, villas } from '@/data/villas';
import { t as localize } from '@/data/types';
import Gallery from '@/components/villa/Gallery';
import AmenityList from '@/components/villa/AmenityList';
import BookingOptions from '@/components/villa/BookingOptions';
import Footer from '@/components/Footer';

type PageParams = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    villas.map((villa) => ({ locale, slug: villa.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });
  const villaName = localize(villa.name, locale);
  const title = t('villaTitle', { villa: villaName, brand: siteConfig.brandName });
  const description = t('villaDescription', { villa: villaName, guests: villa.guests });

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}/villas/${slug}`,
      languages: { es: `/es/villas/${slug}`, en: `/en/villas/${slug}` },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale,
      url: `/${locale}/villas/${slug}`,
      siteName: siteConfig.brandName,
      images: [{ url: villa.cover, width: 1200, height: 630, alt: villaName }],
    },
  };
}

export default async function VillaPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const villa = getVillaBySlug(slug);
  if (!villa) notFound();

  const t = await getTranslations('villa');
  const villaName = localize(villa.name, locale);

  return (
    <>
      <article className="bg-white pt-24 md:pt-32">
        <div className="container-luxe">
          {/* Volver */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/60 transition-colors hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('back')}
          </Link>

          {/* Encabezado */}
          <header className="mt-8 max-w-2xl">
            <span className="gold-line mb-5" />
            <h1 className="font-serif text-4xl leading-tight text-palm md:text-6xl">{villaName}</h1>
            <p className="mt-3 text-lg font-light italic text-charcoal/60">
              {localize(villa.tagline, locale)}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-charcoal/60">
              <span>
                {villa.guests} · {t('guests')}
              </span>
              <span>
                {villa.bedrooms} · {t('bedrooms')}
              </span>
              <span>
                {villa.bathrooms} · {t('bathrooms')}
              </span>
            </div>
          </header>

          {/* Contenido: galeria + descripcion a la izquierda, reserva a la derecha */}
          <div className="mt-12 grid gap-12 pb-24 lg:grid-cols-[1.6fr_1fr] lg:gap-16 md:mt-16">
            <div className="space-y-16">
              <Gallery images={villa.images} alt={villaName} />

              <section>
                <span className="eyebrow">{t('overview')}</span>
                <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-charcoal/80 md:text-lg">
                  {localize(villa.description, locale)}
                </p>
              </section>

              <AmenityList amenities={villa.amenities} />
            </div>

            {/* Panel de reserva (sticky en desktop) */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="mb-5">
                <h2 className="font-serif text-2xl text-palm">{t('bookTitle')}</h2>
                <p className="mt-1 text-sm font-light text-charcoal/70">{t('bookSubtitle')}</p>
              </div>
              <BookingOptions villaName={villaName} maxGuests={villa.guests} />
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
