'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/data/experiences';
import { t as localize } from '@/data/types';

/**
 * "Experiencias": scroll horizontal animado con pin + scrub de ScrollTrigger.
 * Los datos vienen de /src/data/experiences.ts. En modo "reducir movimiento"
 * cae a un carrusel horizontal normal.
 */
export default function Experiences() {
  const t = useTranslations('experiences');
  const locale = useLocale();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const el = track.current;
      if (!el) return;
      const getScrollAmount = () => Math.max(0, el.scrollWidth - window.innerWidth);

      const tween = gsap.to(el, { x: () => -getScrollAmount(), ease: 'none' });

      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experiences" ref={section} className="relative overflow-hidden bg-palm text-sand">
      <div
        ref={track}
        className="no-scrollbar flex h-[100svh] min-h-[600px] w-max items-center gap-6 overflow-x-auto px-6 md:gap-10 md:px-12"
      >
        {/* Panel de introduccion */}
        <div className="flex h-full w-[85vw] flex-col justify-center md:w-[38vw]">
          <span className="gold-line mb-6" />
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">{t('title')}</h2>
          <p className="mt-5 max-w-sm text-base font-light text-sand/80 md:text-lg">{t('subtitle')}</p>
          <span className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest2 text-gold">
            {t('scrollHint')}
            <span className="h-px w-10 bg-gold" />
          </span>
        </div>

        {/* Paneles de experiencias */}
        {experiences.map((exp) => (
          <article
            key={exp.id}
            className="group relative h-[72vh] w-[85vw] shrink-0 overflow-hidden rounded-sm sm:w-[60vw] md:h-[78vh] md:w-[42vw]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-luxe group-hover:scale-105"
              style={{ backgroundImage: `url(${exp.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <h3 className="font-serif text-3xl md:text-4xl">{localize(exp.title, locale)}</h3>
              <p className="mt-3 max-w-md text-sm font-light text-sand/85 md:text-base">
                {localize(exp.description, locale)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
