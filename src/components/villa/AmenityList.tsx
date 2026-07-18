import { useTranslations } from 'next-intl';

/** Iconos de linea simples por amenidad (mismos ids que en villas.ts). */
const ICONS: Record<string, JSX.Element> = {
  wifi: (
    <>
      <path d="M5 12.5a9 9 0 0 1 14 0M8 15.5a5 5 0 0 1 8 0" />
      <circle cx="12" cy="19" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  pool: <path d="M4 18c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1M7 15V6a2 2 0 0 1 4 0M13 15V6a2 2 0 0 1 4 0" />,
  ac: (
    <>
      <rect x="3" y="5" width="18" height="8" rx="1.5" />
      <path d="M7 16v1M12 16v2M17 16v1" />
    </>
  ),
  kitchen: (
    <>
      <path d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12" />
      <path d="M16 3c-1.5 0-2.5 2-2.5 4.5S15 12 16 12s2.5-2 2.5-4.5S17.5 3 16 3zM16 12v9" />
    </>
  ),
  parking: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 16V8h3a2 2 0 0 1 0 4H9" />
    </>
  ),
  beach: (
    <>
      <path d="M3 20h18M12 20V9" />
      <path d="M12 9c-3-4-7-3-8 0 3-1 5 0 8 0zM12 9c3-4 7-3 8 0-3-1-5 0-8 0z" />
    </>
  ),
  ocean_view: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M3 16c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1M3 20c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
    </>
  ),
  garden: (
    <>
      <path d="M12 21v-6" />
      <path d="M12 15c-3 0-5-2-5-5 3 0 5 2 5 5zM12 12c0-3 2-5 5-5 0 3-2 5-5 5z" />
    </>
  ),
  breakfast: (
    <>
      <path d="M4 8h12v3a6 6 0 0 1-12 0V8zM16 9h2a2 2 0 0 1 0 4h-2M4 20h14" />
    </>
  ),
  cleaning: (
    <>
      <path d="M12 3v9M8 12h8l-1 8H9l-1-8z" />
    </>
  ),
  workspace: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  bbq: (
    <>
      <path d="M5 6h14l-2 7H7L5 6zM9 13l-1 6M15 13l1 6M10 3l-1 2M14 3l-1 2" />
    </>
  ),
};

export default function AmenityList({ amenities }: { amenities: string[] }) {
  const t = useTranslations('amenities');

  return (
    <div>
      <h2 className="font-serif text-2xl text-palm">{t('title')}</h2>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {amenities.map((id) => (
          <li key={id} className="flex items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-teal"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[id] ?? <circle cx="12" cy="12" r="3" />}
            </svg>
            <span className="text-sm font-light text-charcoal/80">{t(id)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
