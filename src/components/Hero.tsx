'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { scrollToId } from '@/lib/lenis';

/**
 * Hero fullscreen: video en loop y mute con fallback a imagen (poster).
 * El titular aparece con animacion y hay un indicador de scroll animado.
 */
export default function Hero() {
  const t = useTranslations('hero');
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      tl.from('[data-hero="eyebrow"]', { y: 24, opacity: 0, delay: 0.2 })
        .from('[data-hero="line"]', { y: 60, opacity: 0, stagger: 0.15 }, '-=0.6')
        .from('[data-hero="subtitle"]', { y: 24, opacity: 0 }, '-=0.6')
        .from('[data-hero="cta"]', { y: 24, opacity: 0 }, '-=0.7')
        .from('[data-hero="scroll"]', { opacity: 0 }, '-=0.4');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden">
      {/* Video de fondo con fallback a imagen (poster) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-fallback.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Capa oscura para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/60" />

      {/* Contenido */}
      <div className="container-luxe relative z-10 flex flex-col items-center text-center text-sand">
        <span data-hero="eyebrow" className="eyebrow text-gold">
          {t('eyebrow')}
        </span>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
          <span data-hero="line" className="block">
            {t('titleLine1')}
          </span>
          <span data-hero="line" className="block italic text-gold">
            {t('titleLine2')}
          </span>
        </h1>
        <p data-hero="subtitle" className="mt-8 max-w-xl text-base font-light leading-relaxed text-sand/90 md:text-lg">
          {t('subtitle')}
        </p>
        <button
          data-hero="cta"
          type="button"
          onClick={() => scrollToId('villas')}
          className="btn-primary mt-10 bg-gold text-charcoal hover:bg-sand"
        >
          {t('cta')}
        </button>
      </div>

      {/* Indicador de scroll animado */}
      <button
        data-hero="scroll"
        type="button"
        onClick={() => scrollToId('why')}
        aria-label={t('scroll')}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-sand"
      >
        <span className="text-[10px] uppercase tracking-widest2 text-sand/80">{t('scroll')}</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-sand/50">
          <span className="mt-2 h-2 w-px animate-bounce bg-sand" />
        </span>
      </button>
    </section>
  );
}
