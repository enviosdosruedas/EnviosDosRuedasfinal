import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { EntrepreneursSection } from "@/components/landing/EntrepreneursSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { RequestDeliverySection } from "@/components/landing/RequestDeliverySection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <EntrepreneursSection />
        <StatsSection />
        <RequestDeliverySection />
      </main>
      <Footer />
    </div>
  );
}
