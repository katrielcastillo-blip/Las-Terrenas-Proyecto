import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/data/config';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import '../globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const title = t('homeTitle', { brand: siteConfig.brandName });
  const description = t('homeDescription');

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale,
      url: `/${locale}`,
      siteName: siteConfig.brandName,
      images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: siteConfig.brandName }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-sand text-charcoal antialiased">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <WhatsAppFloat />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
