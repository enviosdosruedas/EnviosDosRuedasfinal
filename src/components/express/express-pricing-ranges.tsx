"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, MapPin, ArrowRightCircle, Calculator, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PriceRange } from "@prisma/client";

// Define a client-safe type with numbers instead of Decimals
export type PriceRangeClient = Omit<PriceRange, 'distanciaMinKm' | 'distanciaMaxKm' | 'precioRango'> & {
  distanciaMinKm: number;
  distanciaMaxKm: number;
  precioRango: number;
};

interface ExpressPricingRangesProps {
  priceRanges: PriceRangeClient[];
}

export function ExpressPricingRanges({ priceRanges }: ExpressPricingRangesProps) {
  const displayedPriceRanges = priceRanges.slice(0, 7);

  const formatKmDisplay = (km: number, isMaxBoundaryInTitleOrRange: boolean = false) => {
    const kmFixed = parseFloat(km.toFixed(2)); 
    if (isMaxBoundaryInTitleOrRange && String(kmFixed.toFixed(2)).endsWith('.99')) {
      return Math.ceil(kmFixed).toString();
    }
    return Number.isInteger(kmFixed) ? kmFixed.toFixed(0) : kmFixed.toFixed(2).replace(".", ",");
  };

  const expressTiers = displayedPriceRanges.map((rango: PriceRangeClient) => {
    const titleMaxKmFormatted = formatKmDisplay(rango.distanciaMaxKm, true);
    const rangeMinKmFormatted = formatKmDisplay(rango.distanciaMinKm);
    const rangeMaxKmFormatted = formatKmDisplay(rango.distanciaMaxKm, true);

    return {
      name: `Hasta ${titleMaxKmFormatted} km`,
      icon: MapPin, 
      price: `$${rango.precioRango.toLocaleString("es-AR", {
        minimumFractionDigits: rango.precioRango % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      })}`,
      distanceRange: `${rangeMinKmFormatted} km - ${rangeMaxKmFormatted} km`,
      description: `Para envíos en el día solicitado antes de 15hs`,
      features: [
        "Servicio Express prioritario",
        "Entrega en el mismo día",
        "Seguimiento en tiempo real",
      ],
      color: "border-blue-200 bg-blue-50",
      badgeText: "Tarifa Express",
      badgeColor: "bg-blue-600",
      iconColor: "text-blue-600",
      priceColor: "text-blue-700",
      featureIconColor: "text-blue-500",
      iconBorderColor: "border-blue-200",
    };
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-gray-50 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-800 mb-4 font-display">
            Tarifas Envíos Express.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Consulta los precios para nuestros rangos de distancia más comunes. Para distancias mayores o una cotización exacta con mapa, utiliza nuestro cotizador.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expressTiers.map((tier, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card
                className={`relative ${tier.color} border-2 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 flex flex-col h-full`}
              >
                <Badge
                  className={`absolute -top-2.5 left-1/2 transform -translate-x-1/2 ${tier.badgeColor} text-white px-3 py-1 text-xs font-medium`}
                >
                  {tier.badgeText}
                </Badge>
                <CardHeader className="text-center pb-3 pt-8">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border-2 ${tier.iconBorderColor}`}>
                    <Zap className={`w-7 h-7 sm:w-8 sm:h-8 ${tier.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 font-display">
                    {tier.name}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-gray-500 font-sans">
                    {tier.distanceRange}
                  </p>
                  <div className={`text-2xl sm:text-3xl font-bold ${tier.priceColor} my-1 font-display`}>
                    {tier.price}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-3 text-center text-xs sm:text-sm font-sans">
                    {tier.description}
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm font-sans">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700"
                      >
                        <ArrowRightCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${tier.featureIconColor} mr-1.5 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
             custom={expressTiers.length}
             variants={cardVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="relative border-gray-300 bg-gray-100 border-2 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 flex flex-col h-full">
              <Badge
                  className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-3 py-1 text-xs font-medium"
              >
                  Cotización Dinámica
              </Badge>
              <CardHeader className="text-center pb-3 pt-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-gray-300">
                  <Calculator className="w-7 h-7 sm:w-8 sm:h-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 font-display">
                  Distancias Mayores
                </CardTitle>
                <p className="text-xs sm:text-sm text-gray-500 font-sans">
                  o Cotización Exacta con Mapa
                </p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-gray-600 mb-3 text-center text-xs sm:text-sm font-sans">
                  Para envíos que superen los rangos mostrados o para una cotización precisa con visualización de ruta, utiliza nuestro cotizador Express.
                </p>
                <Button
                  asChild
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold mt-3 py-2.5 text-sm sm:text-base font-sans"
                  size="lg"
                >
                  <Link href="/cotizar/express">
                    <Calculator className="w-4 h-4 mr-2" />
                    Ir al Cotizador Express
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
         <Card className="mt-8 md:mt-12 bg-yellow-50 border-yellow-300">
          <CardContent className="p-4 sm:p-6 flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="font-sans">
              <h4 className="font-semibold text-yellow-800 text-sm sm:text-base">Nota Importante sobre Tarifas Express:</h4>
              <p className="text-xs sm:text-sm text-yellow-700">
                Los precios mostrados son para los rangos iniciales y están sujetos a confirmación. El Cotizador Express proporciona el precio final más preciso basado en la distancia exacta, tiempo estimado y posibles factores adicionales (hora pico, tamaño del paquete).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
