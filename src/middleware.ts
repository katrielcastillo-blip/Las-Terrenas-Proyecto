import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Aplica el middleware a todas las rutas excepto API, assets estaticos y archivos internos.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
