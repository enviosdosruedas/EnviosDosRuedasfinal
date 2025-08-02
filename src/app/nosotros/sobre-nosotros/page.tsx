import { AboutHero } from "@/components/about/about-hero";
import { WhoWeAre } from "@/components/about/who-we-are";
import { CompanyValues } from "@/components/about/company-values";
import { CompanyStory } from "@/components/about/company-story";
import { TeamSection } from "@/components/about/team-section";
import { MissionVision } from "@/components/about/mission-vision";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestra Historia | Sobre EnviosDosRuedas",
  description:
    "Conocé la historia, el equipo y los valores de EnviosDosRuedas. Somos tu aliado local en Mar del Plata, comprometidos con la confianza, la rapidez y el éxito de tu negocio.",
  keywords: "sobre nosotros, envios dosruedas, historia empresa, valores, equipo, mar del plata, mensajeria, logistica local",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <WhoWeAre />
      <CompanyValues />
      <CompanyStory />
      <TeamSection />
      <MissionVision />
    </main>
  );
}
