
'use client';

import { ServicesOverview } from "@/components/home/services-overview";
import { EntrepreneurSolutions } from "@/components/home/entrepreneur-solutions";
import { StatsSection } from "@/components/home/stats-section";
import { CtaSection } from "@/components/sections/cta-section";
import { Footer } from "@/components/footer";
import { NeuralHorizonHero } from "@/components/home/NeuralHorizonHero";
import { Header } from "@/components/header";
import { VisionSection } from "@/components/home/vision-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { AiSummarySection } from "@/components/sections/ai-summary-section";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <NeuralHorizonHero />
        
        <div className="relative z-10 bg-background">
          <ServicesOverview />
          <EntrepreneurSolutions />
          <StatsSection />
          <VisionSection />
          <TestimonialsSection/>
          <AiSummarySection />
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
