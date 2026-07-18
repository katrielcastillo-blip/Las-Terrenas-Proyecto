import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Wrappers de <Link>, useRouter, etc. conscientes del idioma activo.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
