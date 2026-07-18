'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { scrollToId } from '@/lib/lenis';
import { siteConfig } from '@/data/config';
import LanguageSwitcher from './LanguageSwitcher';

const SECTIONS = ['villas', 'experiences', 'testimonials', 'contact'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Al llegar al home tras navegar desde otra pagina, hace scroll a la
  // seccion pendiente guardada antes de navegar.
  useEffect(() => {
    if (!isHome) return;
    const pending = sessionStorage.getItem('scrollTo');
    if (pending) {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => scrollToId(pending), 400);
    }
  }, [isHome]);

  const handleNav = useCallback(
    (id: string) => {
      setMenuOpen(false);
      if (scrollToId(id)) return;
      // No estamos en el home: guardamos destino y navegamos.
      sessionStorage.setItem('scrollTo', id);
      router.push('/');
    },
    [router],
  );

  const solid = scrolled || menuOpen || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
        solid ? 'bg-sand/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-luxe flex h-16 items-center justify-between md:h-20">
        {/* Marca */}
        <Link
          href="/"
          className={`font-serif text-xl tracking-wide transition-colors md:text-2xl ${
            solid ? 'text-palm' : 'text-sand'
          }`}
        >
          {siteConfig.brandName}
        </Link>

        {/* Enlaces desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNav(id)}
              className={`text-xs font-medium uppercase tracking-widest transition-colors duration-300 hover:text-gold ${
                solid ? 'text-charcoal' : 'text-sand'
              }`}
            >
              {t(id)}
            </button>
          ))}
          <LanguageSwitcher className={solid ? 'text-charcoal' : 'text-sand'} />
        </div>

        {/* Boton menu movil */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher className={solid ? 'text-charcoal' : 'text-sand'} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={menuOpen}
            className={`flex h-8 w-8 flex-col items-center justify-center gap-1.5 ${
              solid ? 'text-charcoal' : 'text-sand'
            }`}
          >
            <span
              className={`h-px w-6 bg-current transition-all duration-300 ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-6 bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-px w-6 bg-current transition-all duration-300 ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Menu movil desplegable */}
      <div
        className={`overflow-hidden bg-sand/95 backdrop-blur-md transition-[max-height] duration-500 ease-luxe md:hidden ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="container-luxe flex flex-col gap-1 py-4">
          {SECTIONS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNav(id)}
              className="py-3 text-left text-sm font-medium uppercase tracking-widest text-charcoal transition-colors hover:text-gold"
            >
              {t(id)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
