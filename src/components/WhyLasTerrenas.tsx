'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * "Por que Las Terrenas": los parrafos se revelan al hacer scroll y
 * dos imagenes se mueven con efecto parallax.
 */
export default function WhyLasTerrenas() {
  const t = useTranslations('why');
  const paragraphs = t.raw('paragraphs') as string[];
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Revela cada parrafo linea por linea
      gsap.utils.toArray<HTMLElement>('[data-why="paragraph"]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // Parallax de las imagenes
      gsap.utils.toArray<HTMLElement>('[data-why="parallax"]').forEach((el) => {
        gsap.to(el, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={root} className="bg-sand py-24 md:py-36">
      <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Texto */}
        <div>
          <span className="gold-line mb-6" />
          <span className="eyebrow" data-why="paragraph">
            {t('eyebrow')}
          </span>
          <h2 data-why="paragraph" className="mt-5 max-w-md font-serif text-4xl leading-tight text-palm md:text-5xl">
            {t('title')}
          </h2>
          <div className="mt-8 space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                data-why="paragraph"
                className="max-w-lg text-base font-light leading-relaxed text-charcoal/80 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Imagenes con parallax */}
        <div className="relative grid grid-cols-2 gap-4 md:gap-6">
          <div className="relative col-span-1 mt-10 aspect-[3/4] overflow-hidden rounded-sm">
            <div
              data-why="parallax"
              className="absolute inset-[-14%] bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/why/01.jpg)' }}
            />
          </div>
          <div className="relative col-span-1 aspect-[3/4] overflow-hidden rounded-sm">
            <div
              data-why="parallax"
              className="absolute inset-[-14%] bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/why/02.jpg)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
