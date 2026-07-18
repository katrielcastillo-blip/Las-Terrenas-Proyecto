'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Galeria de fotos de la villa con imagen principal y miniaturas. */
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const t = useTranslations('villa');
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('[data-gallery-fade]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <span className="eyebrow" data-gallery-fade>
        {t('gallery')}
      </span>

      {/* Imagen principal */}
      <div
        data-gallery-fade
        className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-sm bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${images[active]})` }}
        role="img"
        aria-label={`${alt} — ${active + 1}`}
      />

      {/* Miniaturas */}
      <div data-gallery-fade className="mt-4 grid grid-cols-5 gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${alt} ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            className={`aspect-square overflow-hidden rounded-sm bg-cover bg-center transition-all duration-300 ${
              i === active ? 'ring-2 ring-gold ring-offset-2 ring-offset-white' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
    </div>
  );
}
