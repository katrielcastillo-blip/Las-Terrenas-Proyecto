'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { scrollToId } from '@/lib/lenis';
import { siteConfig } from '@/data/config';

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38zm6.97-11.4a1.58 1.58 0 1 1-1.58-1.58 1.58 1.58 0 0 1 1.58 1.58z" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  ),
  tiktok: (
    <path d="M16.6 5.8a4.28 4.28 0 0 1-1-2.8h-3.1v12.4a2.4 2.4 0 1 1-2.4-2.4c.16 0 .32.02.47.05V9.9a5.5 5.5 0 1 0 5.03 5.48V9.03a7.3 7.3 0 0 0 4.2 1.34V7.3a4.28 4.28 0 0 1-3.2-1.5z" />
  ),
};

export default function Footer() {
  const t = useTranslations('footer');

  const socialEntries = Object.entries(siteConfig.social).filter(([, url]) => url) as [
    keyof typeof siteConfig.social,
    string,
  ][];

  const links = [
    { id: 'villas', label: t('villas') },
    { id: 'experiences', label: t('experiences') },
    { id: 'testimonials', label: t('testimonials') },
    { id: 'contact', label: t('contact') },
  ];

  return (
    <footer className="bg-palm py-16 text-sand md:py-20">
      <div className="container-luxe grid gap-12 md:grid-cols-3">
        {/* Marca */}
        <div>
          <Link href="/" className="font-serif text-2xl tracking-wide">
            {siteConfig.brandName}
          </Link>
          <p className="mt-4 max-w-xs text-sm font-light text-sand/70">{t('tagline')}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-sand/50">{siteConfig.location}</p>
        </div>

        {/* Navegacion */}
        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-gold">{t('explore')}</h3>
          <ul className="mt-4 space-y-3">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(link.id)}
                  className="text-sm font-light text-sand/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Redes */}
        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-gold">{t('followUs')}</h3>
          <div className="mt-4 flex gap-4">
            {socialEntries.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(key)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/20 text-sand/80 transition-colors hover:border-gold hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  {SOCIAL_ICONS[key]}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-luxe mt-14 border-t border-sand/15 pt-6">
        <p className="text-xs text-sand/50">
          © {new Date().getFullYear()} {siteConfig.brandName}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
