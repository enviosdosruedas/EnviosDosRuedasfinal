
'use client';

import { ServicesOverview } from "@/components/home/services-overview";
import { EntrepreneurSolutions } from "@/components/home/entrepreneur-solutions";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { Footer } from "@/components/footer";
import { NeuralHorizonHero } from "@/components/home/NeuralHorizonHero";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        <NeuralHorizonHero />
        <div className="relative z-10 bg-background">
          <ServicesOverview />
          <EntrepreneurSolutions />
          <StatsSection />
          <TestimonialsSection />
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
