'use client';

import { useTranslations } from 'next-intl';
import { buildWhatsAppLink } from '@/data/config';

/** Boton flotante de WhatsApp, visible en todo el sitio. */
export default function WhatsAppFloat() {
  const t = useTranslations('whatsappFloat');
  const href = buildWhatsAppLink(t('message'));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('label')}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 ease-luxe hover:scale-110 md:bottom-8 md:right-8"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.463 1.712 6.41L3.2 28.8l6.57-1.723a12.74 12.74 0 0 0 6.234 1.587h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.805-12.8Zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.003 1.05 1.068-3.9-.252-.4a10.58 10.58 0 0 1-1.62-5.63c0-5.867 4.774-10.64 10.645-10.64 2.843 0 5.514 1.108 7.524 3.12a10.57 10.57 0 0 1 3.116 7.526c0 5.867-4.774 10.64-10.645 10.64Zm5.837-7.966c-.32-.16-1.893-.934-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.588-.95-.848-1.593-1.895-1.78-2.215-.187-.32-.02-.492.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.735-.987-2.375-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.46 4.827.763.33 1.36.526 1.824.674.767.244 1.464.21 2.016.127.615-.092 1.893-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
      </svg>
    </a>
  );
}
