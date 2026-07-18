'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { villas } from '@/data/villas';
import { t as localize } from '@/data/types';

/**
 * "Nuestras Villas": grid de cards que entran con stagger al hacer scroll.
 * Los datos vienen de /src/data/villas.ts.
 */
export default function VillasGrid() {
  const t = useTranslations('villas');
  const locale = useLocale();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('[data-villa-card]', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '[data-villa-grid]', start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="villas" ref={root} className="bg-white py-24 md:py-36">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <span className="gold-line mx-auto mb-6" />
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-4 font-serif text-4xl text-palm md:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-base font-light text-charcoal/70 md:text-lg">{t('subtitle')}</p>
        </div>

        <div data-villa-grid className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {villas.map((villa) => (
            <Link
              key={villa.slug}
              href={`/villas/${villa.slug}`}
              data-villa-card
              className="group flex flex-col overflow-hidden rounded-sm bg-sand/40 transition-shadow duration-500 ease-luxe hover:shadow-xl"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-luxe group-hover:scale-105"
                  style={{ backgroundImage: `url(${villa.cover})` }}
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl text-palm">{localize(villa.name, locale)}</h3>
                <p className="mt-1 text-sm font-light italic text-charcoal/60">
                  {localize(villa.tagline, locale)}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-widest text-charcoal/60">
                  <span>{t('guests', { count: villa.guests })}</span>
                  <span className="text-gold">·</span>
                  <span>{t('bedrooms', { count: villa.bedrooms })}</span>
                  <span className="text-gold">·</span>
                  <span>{t('bathrooms', { count: villa.bathrooms })}</span>
                </div>

                <span className="btn-outline mt-6 w-full">{t('cta')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
