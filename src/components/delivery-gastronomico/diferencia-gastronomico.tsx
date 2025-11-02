
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Users, BarChart, XCircle, CheckCircle } from "lucide-react";

export function DiferenciaGastronomico() {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-display">Más que un Delivery, un Socio Estratégico</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Entendemos los desafíos del delivery tradicional y ofrecemos una solución profesional que protege tu marca y fideliza a tus clientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problemas con Apps */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <XCircle className="w-6 h-6 mr-2" />
                El Problema con las Apps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Las apps de delivery masivas priorizan su propia marca, no la tuya. Los repartidores rotan constantemente, no conocen tu producto y la comunicación es nula.</p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-destructive/80">
                <li><span className="font-semibold text-foreground">Dilución de tu marca:</span> Tu cliente interactúa con la app, no contigo.</li>
                <li><span className="font-semibold text-foreground">Servicio impersonal:</span> Repartidores sin compromiso ni conocimiento.</li>
                <li><span className="font-semibold text-foreground">Falta de control:</span> Cero comunicación directa ante imprevistos.</li>
                <li><span className="font-semibold text-foreground">Comisiones elevadas:</span> Reducen drásticamente tu margen de ganancia.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Solución Envios DosRuedas */}
          <Card className="border-green-600/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <CheckCircle className="w-6 h-6 mr-2" />
                Nuestra Solución Profesional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Ofrecemos un servicio de Moto Fija donde el repartidor es una extensión de tu equipo, comprometido con tu negocio y tus clientes.</p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-green-700/80">
                <li><span className="font-semibold text-foreground">Tu marca es la protagonista:</span> El repartidor representa a tu restaurante.</li>
                <li><span className="font-semibold text-foreground">Servicio consistente:</span> El mismo repartidor que conoce tus productos y clientes.</li>
                <li><span className="font-semibold text-foreground">Control total:</span> Comunicación directa para resolver cualquier eventualidad.</li>
                <li><span className="font-semibold text-foreground">Costo fijo y predecible:</span> Pagas por el servicio, no por tus ventas.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
