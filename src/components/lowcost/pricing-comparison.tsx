"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, Tags } from "lucide-react";
import Link from "next/link";
import { preciosLowCost } from "@/lib/precioslowcost";
import { preciosExpress } from "@/lib/preciosexpress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PricingComparison() {
  const comparisonRanges = preciosLowCost
    .filter(rango => rango.distancia_max_km < 13)
    .map(lowCostRango => {
      const expressRango = preciosExpress.find(
        (expressRango) =>
          expressRango.distancia_min_km === lowCostRango.distancia_min_km &&
          expressRango.distancia_max_km === lowCostRango.distancia_max_km
      );
      return {
        ...lowCostRango,
        precio_express: expressRango ? expressRango.precio_rango : null,
      };
    });

  const formatKmDisplay = (km: number) => {
    const kmFixed = parseFloat(km.toFixed(2));
    if (String(kmFixed.toFixed(2)).endsWith('.99')) {
      return Math.ceil(kmFixed).toString();
    }
    return Number.isInteger(kmFixed) ? kmFixed.toFixed(0) : kmFixed.toFixed(2).replace(".", ",");
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
            Ahorrá en Cada Envío: Compará Nuestras Tarifas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Mirá la diferencia y empezá a optimizar tus costos de logística hoy mismo.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700">
            <motion.table
              className="w-full text-left"
              variants={tableVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <thead className="bg-gray-100 dark:bg-slate-700/50">
                <tr>
                  <th className="p-5 font-semibold text-sm text-gray-600 dark:text-gray-300">Rango de Distancia</th>
                  <th className="p-5 font-semibold text-sm text-gray-600 dark:text-gray-300 text-center">Tarifa Express</th>
                  <th className="p-5 font-semibold text-sm text-gray-600 dark:text-gray-300 text-center relative">
                    <div className="flex items-center justify-center gap-2">
                      <Tags className="w-4 h-4 text-secondary" />
                      Tarifa Low Cost
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRanges.map((rango, index) => (
                  <motion.tr
                    key={index}
                    className="border-t border-gray-200 dark:border-slate-700"
                    variants={rowVariants}
                  >
                    <td className="p-5 font-medium text-gray-800 dark:text-gray-100">
                      {`Hasta ${formatKmDisplay(rango.distancia_max_km)} km`}
                    </td>
                    <td className="p-5 text-center text-gray-500 dark:text-gray-400 line-through">
                      {rango.precio_express ? `$${rango.precio_express.toLocaleString("es-AR")}` : "-"}
                    </td>
                    <td className="p-5 text-center bg-secondary/5 dark:bg-secondary/10">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-lg text-primary dark:text-secondary">
                          {`$${rango.precio_rango.toLocaleString("es-AR")}`}
                        </span>
                        {index === 2 && (
                          <span className="hidden sm:inline-block text-xs font-semibold bg-secondary text-black px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
            <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-700/50">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">¿Necesitás una cotización para tu envío específico?</p>
                <Button asChild size="sm">
                  <Link href="/cotizar/lowcost">
                    Calcular Envío Low Cost
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
