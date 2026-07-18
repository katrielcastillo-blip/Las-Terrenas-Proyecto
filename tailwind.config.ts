import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de marca — lujo minimalista tropical
        sand: '#F5F0E8', // arena (fondo)
        palm: '#1B4332', // verde palma
        teal: '#2A9D8F', // teal
        gold: '#C9A227', // dorado (acentos)
        charcoal: '#1A1A1A', // carbon (texto)
      },
      fontFamily: {
        // Enlazadas a las variables CSS que carga next/font en el layout
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
