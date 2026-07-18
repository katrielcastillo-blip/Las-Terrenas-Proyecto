'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/data/testimonials';
import { t as localize } from '@/data/types';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex justify-center gap-1" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-gold">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/** Carrusel elegante de testimonios. Datos desde /src/data/testimonials.ts. */
export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const count = testimonials.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Autoplay suave
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(id);
  }, [count]);

  // Animacion de entrada de la seccion
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('[data-testimonials-inner]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const current = testimonials[index];

  return (
    <section id="testimonials" ref={root} className="bg-sand py-24 md:py-36">
      <div data-testimonials-inner className="container-luxe flex flex-col items-center text-center">
        <span className="gold-line mb-6" />
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl text-palm md:text-5xl">{t('title')}</h2>

        <div className="relative mt-14 flex min-h-[220px] w-full max-w-3xl flex-col items-center">
          {/* Quotes */}
          {testimonials.map((item, i) => (
            <blockquote
              key={i}
              aria-hidden={i !== index}
              className={`absolute inset-0 flex flex-col items-center transition-opacity duration-700 ease-luxe ${
                i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <Stars count={item.rating} />
              <p className="mt-6 font-serif text-2xl font-light italic leading-relaxed text-charcoal md:text-3xl">
                &ldquo;{localize(item.quote, locale)}&rdquo;
              </p>
              <footer className="mt-6">
                <div className="text-sm font-medium uppercase tracking-widest text-palm">{item.name}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-charcoal/50">{item.location}</div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Controles */}
        <div className="mt-10 flex items-center gap-6">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={t('prev')}
            className="text-charcoal/50 transition-colors hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={t('goTo', { number: i + 1 })}
                aria-current={i === index ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-gold' : 'w-1.5 bg-charcoal/25 hover:bg-charcoal/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={t('next')}
            className="text-charcoal/50 transition-colors hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
