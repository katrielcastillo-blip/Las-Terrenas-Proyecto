'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * Selector ES / EN. Mantiene la ruta actual al cambiar de idioma.
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    if (next === locale) return;
    // pathname (sin prefijo de idioma) ya incluye el slug actual de la
    // villa, por lo que se conserva la pagina al cambiar de idioma.
    router.replace(pathname, { locale: next });
  }

  return (
    <div className={`flex items-center gap-1 text-xs font-medium tracking-widest ${className}`}>
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          {index > 0 && <span className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-label={loc === 'es' ? t('switchToEs') : t('switchToEn')}
            aria-current={loc === locale ? 'true' : undefined}
            className={`uppercase transition-colors duration-300 ${
              loc === locale ? 'text-gold' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {t(loc as 'es' | 'en')}
          </button>
        </span>
      ))}
    </div>
  );
}
