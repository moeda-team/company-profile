'use client';

import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Industries from '@/components/landing/Industries';
import Solutions from '@/components/landing/Solutions';
import WorkflowSection from '@/components/landing/WorkflowSection';
import TechStack from '@/components/landing/TechStack';
import Portfolio from '@/components/landing/Portfolio';
import Statistics from '@/components/landing/Statistics';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export default function Home() {
  useScrollReveal();

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Industries />
      <Solutions />
      <WorkflowSection />
      <Portfolio />
      <Statistics />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
