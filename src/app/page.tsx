import { OptimizedHeader } from "@/components/homenew/optimized-header"
import { EnhancedHero } from "@/components/homenew/enhanced-hero"
import HeroNuevo from "@/components/homenew/hero-nuevo"
import SliderServicios from "@/components/homenew/slider-servicios"
import { ServicesOverview } from "@/components/homenew/services-overview"
import { VisionSection } from "@/components/homenew/vision-section"
import { EntrepreneurSolutions } from "@/components/homenew/entrepreneur-solutions"
import { CtaSection } from "@/components/homenew/cta-section"
import { CarruselRedes } from "@/components/homenew/carrusel-redes"
import { Footer } from "@/components/homenew/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <OptimizedHeader />
      <EnhancedHero />
<HeroNuevo />
<SliderServicios />
      <ServicesOverview />
      <VisionSection />
      <EntrepreneurSolutions />
      <CtaSection />
      <CarruselRedes />
      <Footer />
    </div>
  )
}
