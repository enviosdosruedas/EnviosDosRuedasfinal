import { LowcostHero } from "@/components/lowcost/lowcost-hero";
import { LowcostContent } from "@/components/lowcost/lowcost-content";
import { PricingComparison } from "@/components/lowcost/pricing-comparison";
import { LowcostBenefits } from "@/components/lowcost/lowcost-benefits";
import { HowLowcostWorks } from "@/components/lowcost/how-lowcost-works";
import { LowcostCta } from "@/components/lowcost/lowcost-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envíos Low Cost | Mensajería Económica en Mar del Plata",
  description:
    "Ahorrá en tus envíos con nuestro servicio Low Cost. Ideal para entregas programadas y no urgentes. La misma confianza y seguridad, al mejor precio.",
  keywords:
    "envios low cost mar del plata, mensajeria economica, envios baratos, paqueteria economica, envios programados, logistica barata",
};

export default function EnviosLowCostPage() {
  return (
    <main>
      <LowcostHero />
      <LowcostContent />
      <PricingComparison />
      <LowcostBenefits />
      <HowLowcostWorks />
      <LowcostCta />
    </main>
  );
}
