
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, ArrowRightCircle, HelpCircle } from "lucide-react";
import Image from "next/image";
import type { PriceRange } from "@prisma/client";

// Define a client-safe type with numbers instead of Decimals
export type PriceRangeClient = Omit<PriceRange, 'distanciaMinKm' | 'distanciaMaxKm' | 'precioRango'> & {
  distanciaMinKm: number;
  distanciaMaxKm: number;
  precioRango: number;
};

interface EntrepreneurPricingRangesProps {
  priceRanges: PriceRangeClient[];
}


export function EntrepreneurPricingRanges({ priceRanges }: EntrepreneurPricingRangesProps) {
  // We'll use the same logic as the low-cost pricing
  const displayedPriceRanges = priceRanges.filter(
    (rango) => rango.distanciaMaxKm < 13
  );

  const formatKmDisplay = (km: number, isMaxBoundaryInTitleOrRange: boolean = false) => {
    const kmFixed = parseFloat(km.toFixed(2));
    if (isMaxBoundaryInTitleOrRange && String(kmFixed.toFixed(2)).endsWith('.99')) {
      return Math.ceil(kmFixed).toString();
    }
    return Number.isInteger(kmFixed) ? kmFixed.toFixed(0) : kmFixed.toFixed(2).replace(".", ",");
  };

  const entrepreneurTiers = displayedPriceRanges.map((rango: PriceRangeClient) => {
    const titleMaxKmFormatted = formatKmDisplay(rango.distanciaMaxKm, true);
    const rangeMinKmFormatted = formatKmDisplay(rango.distanciaMinKm);
    const rangeMaxKmFormatted = formatKmDisplay(rango.distanciaMaxKm, true);

    return {
      name: `Hasta ${titleMaxKmFormatted} km`,
      price: `$${rango.precioRango.toLocaleString("es-AR", {
        minimumFractionDigits: rango.precioRango % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      })}`,
      distanceRange: `${rangeMinKmFormatted} km - ${rangeMaxKmFormatted} km`,
      description: "Tarifa preferencial para miembros del Plan Emprendedor.",
      features: [
        "Servicio económico y confiable",
        "Entrega en el día solicitando antes de 13hs",
        "Ideal para alto volumen de envíos",
      ],
      color: "border-blue-200 bg-blue-50",
      badgeText: "Plan Emprendedor",
      badgeColor: "bg-blue-600",
    };
  });

  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699";
    const message = "Hola, necesito cotizar un envío para mi emprendimiento de más de 13 km.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-16 px-4 bg-gray-50 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-display">
            Tarifas Preferenciales del Plan Emprendedor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Precios exclusivos para nuestros socios emprendedores, basados en la estructura de Low Cost para maximizar tu ahorro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entrepreneurTiers.map((tier, index) => {
            return (
              <Card
                key={index}
                className={`relative ${tier.color} border-2 hover:shadow-lg transition-shadow duration-300 flex flex-col`}
              >
                <Badge
                  className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${tier.badgeColor} text-white px-3 py-1 text-xs`}
                >
                  {tier.badgeText}
                </Badge>
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-200">
                    <Coins className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800 font-display">
                    {tier.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {tier.distanceRange}
                  </p>
                  <div className="text-3xl font-bold text-blue-700 my-2 font-display">
                    {tier.price}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-4 text-center text-sm">
                    {tier.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700"
                      >
                        <ArrowRightCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}

          <Card className="relative border-gray-300 bg-gray-100 border-2 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <Badge
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-3 py-1 text-xs"
            >
                Cotización Personalizada
            </Badge>
            <CardHeader className="text-center pb-4 pt-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-300">
                <HelpCircle className="w-8 h-8 text-gray-700" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 font-display">
                Más de 13 km
              </CardTitle>
              <p className="text-sm text-gray-500">
                Envíos de Larga Distancia
              </p>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-gray-600 mb-4 text-center text-sm">
                Para envíos que superen los 13 km, contáctanos para una cotización especial para tu emprendimiento.
              </p>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white mt-4"
              >
                <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp Icon" width={20} height={20} className="w-5 h-5 mr-2" />
                Consultar por WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
