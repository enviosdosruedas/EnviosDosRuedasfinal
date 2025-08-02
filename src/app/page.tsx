import { EnhancedHero } from "@/components/homenew/enhanced-hero"
import { ServicesOverview } from "@/components/homenew/services-overview"
import { VisionSection } from "@/components/homenew/vision-section"
import { EntrepreneurSolutions } from "@/components/homenew/entrepreneur-solutions"
import { CtaSection } from "@/components/homenew/cta-section"
import { CarruselRedes } from "@/components/homenew/carrusel-redes"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <EnhancedHero />
      <ServicesOverview />
      <VisionSection />
      <EntrepreneurSolutions />
      <CtaSection />
      <CarruselRedes />
    </div>
  )
}
