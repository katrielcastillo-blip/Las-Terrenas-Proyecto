import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import WhyLasTerrenas from '@/components/WhyLasTerrenas';
import VillasGrid from '@/components/VillasGrid';
import Experiences from '@/components/Experiences';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WhyLasTerrenas />
      <VillasGrid />
      <Experiences />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  );
}
