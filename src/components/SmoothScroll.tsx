'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis } from '@/lib/lenis';

/**
 * Integra Lenis (smooth scroll) con el ticker de GSAP y ScrollTrigger.
 * Debe envolver todo el contenido de la pagina. Respeta la preferencia
 * de "reducir movimiento" del sistema, desactivando el smooth scroll.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    setLenis(lenis);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
