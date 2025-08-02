"use client";

import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { preciosExpress, type PrecioRango } from "@/lib/preciosexpress";
import { motion } from "framer-motion";

export function ExpressPricingRanges() {
  const displayedPriceRanges = preciosExpress.slice(0, 7);

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
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
            Tarifas Claras para tus Envíos Urgentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Consultá nuestros precios base por distancia. Para una cotización exacta y en tiempo real, usá nuestra calculadora.
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
            <div className="p-6 bg-gray-100 dark:bg-slate-700/50">
              <h3 className="text-xl font-semibold text-primary dark:text-white">Tarifas de Referencia - Express</h3>
            </div>
            <motion.table
              className="w-full text-left"
              variants={tableVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Rango de Distancia</th>
                  <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 text-right">Tarifa Base</th>
                </tr>
              </thead>
              <tbody>
                {displayedPriceRanges.map((rango: PrecioRango, index: number) => (
                  <motion.tr
                    key={index}
                    className="border-t border-gray-200 dark:border-slate-700 even:bg-gray-50/50 dark:even:bg-slate-800/50"
                    variants={rowVariants}
                  >
                    <td className="p-4">
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {`Hasta ${formatKmDisplay(rango.distancia_max_km)} km`}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-bold text-lg text-primary dark:text-secondary">
                        {`$${rango.precio_rango.toLocaleString("es-AR")}`}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
            <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-700/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary dark:text-secondary" />
                  <p>Los precios son de referencia. Para distancias mayores o una cotización exacta, usá la calculadora.</p>
                </div>
                <Button asChild className="w-full sm:w-auto flex-shrink-0">
                  <Link href="/cotizar/express">
                    <Calculator className="mr-2 h-5 w-5" />
                    Usar Calculadora
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
