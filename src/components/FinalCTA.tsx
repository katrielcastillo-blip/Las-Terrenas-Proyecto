'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildWhatsAppLink } from '@/data/config';
import { scrollToId } from '@/lib/lenis';

/** CTA final de reserva. */
export default function FinalCTA() {
  const t = useTranslations('finalCta');
  const tw = useTranslations('whatsappFloat');
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('[data-cta-item]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative overflow-hidden bg-charcoal py-28 text-sand md:py-40"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(/images/cta.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 to-charcoal/90" />

      <div className="container-luxe relative z-10 flex flex-col items-center text-center">
        <span data-cta-item className="eyebrow text-gold">
          {t('eyebrow')}
        </span>
        <h2 data-cta-item className="mt-5 max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
          {t('title')}
        </h2>
        <p data-cta-item className="mt-6 max-w-xl text-base font-light text-sand/80 md:text-lg">
          {t('subtitle')}
        </p>
        <div data-cta-item className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollToId('villas')}
            className="btn-primary bg-gold text-charcoal hover:bg-sand"
          >
            {t('cta')}
          </button>
          <a
            href={buildWhatsAppLink(tw('message'))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            {t('whatsapp')}
          </a>
        </div>
      </div>
    </section>
  );
}
