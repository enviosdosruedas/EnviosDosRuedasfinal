
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, ArrowRight } from "lucide-react";
import Image from "next/image";

export function CtaGastronomico() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699";
    const message = "Hola, me gustaría recibir asesoramiento sobre el servicio de Delivery Gastronómico Profesional.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contacto-asesor" className="py-20 bg-gradient-to-r from-primary to-blue-700 text-primary-foreground">
      <div className="container mx-auto px-4">
        <Card className="bg-background/90 backdrop-blur-sm border-secondary/30 text-foreground max-w-4xl mx-auto shadow-2xl">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-display">¡Estamos listos para empezar!</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Profesionaliza tu delivery y lleva tu restaurante al siguiente nivel. Contáctanos hoy mismo para una asesoría sin cargo.
            </p>

            <div className="flex flex-col items-center justify-center gap-6">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Image src="/logo_envios.svg" alt="WhatsApp Icon" width={24} height={24} className="mr-3" />
                Contactar a Matías por WhatsApp
              </Button>
              <div className="text-center">
                <p className="font-semibold text-muted-foreground">Matías Cejas, tu asesor personal.</p>
                <p className="text-sm text-muted-foreground/80">Respondemos al instante.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
