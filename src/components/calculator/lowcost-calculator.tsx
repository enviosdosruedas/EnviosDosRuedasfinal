
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Loader2, PackageCheck, RotateCcw, ThumbsUp } from 'lucide-react';
import React, { useState, FormEvent, useMemo } from 'react';
import RouteMap from './route-map';
import { useToast } from '@/hooks/use-toast';
import { quoteShipment } from '@/app/ordenes/actions';
import { ServiceTypeEnum } from '@prisma/client';
import type { QuoteDetails } from '@/types/order-actions';


export default function LowCostCalculator() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);

  const { toast } = useToast();

  const mapCoordinates = useMemo(() => {
    if (!quoteDetails) return null;
    return {
      origin: { lat: quoteDetails.originLat, lng: quoteDetails.originLng },
      destination: { lat: quoteDetails.destinationLat, lng: quoteDetails.destinationLng },
    };
  }, [quoteDetails]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, ingresa la dirección de origen y destino.",
      });
      return;
    }
    setIsCalculating(true);
    setQuoteDetails(null);

    const result = await quoteShipment({
        originAddress: origin,
        destinationAddress: destination,
        serviceType: ServiceTypeEnum.LOW_COST,
    });

    setIsCalculating(false);

    if (result.success && result.data) {
        setQuoteDetails(result.data);
        const priceText = result.data.price !== null ? `$${result.data.price.toLocaleString('es-AR')}` : "Consultar";
        toast({
            title: "Cotización Exitosa",
            description: `Distancia: ${result.data.distanceText}. Precio: ${priceText}`,
            variant: "default",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Error de Cálculo",
            description: result.error || "No se pudo calcular la ruta o el precio. Verifica las direcciones o inténtalo más tarde.",
        });
    }
  };

  const handleNewQuote = () => {
    setOrigin('');
    setDestination('');
    setQuoteDetails(null);
    setIsCalculating(false);
  };

  return (
    <section className="w-full py-12 md:py-16 bg-background font-sans">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl lg:max-w-3xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-primary font-display">Calcula tu Envío Low Cost</CardTitle>
            <CardDescription className="font-sans">
              Ingresa las direcciones de origen y destino para obtener una cotización para envíos programados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-base font-sans">Dirección de Origen</Label>
                <Input
                  id="origin"
                  type="text"
                  placeholder="Ej: Av. Colón 1234, Mar del Plata"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  className="text-base font-sans"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-base font-sans">Dirección de Destino</Label>
                <Input
                  id="destination"
                  type="text"
                  placeholder="Ej: Juan B. Justo 5678, Mar del Plata"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="text-base font-sans"
                />
              </div>
              <Button type="submit" className="w-full text-base py-3 font-sans" size="lg" disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Calcular Ruta y Precio Low Cost
                  </>
                )}
              </Button>
            </form>

            {mapCoordinates && (
              <RouteMap
                origin={mapCoordinates.origin}
                destination={mapCoordinates.destination}
              />
            )}
            
            {quoteDetails && !isCalculating && (
              <Card className="mt-8 bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-primary flex items-center font-display">
                    <PackageCheck className="mr-3 h-7 w-7" />
                    Tu Cotización Low Cost
                  </CardTitle>
                  <CardDescription className="font-sans">
                    Basado en la distancia y tiempo estimados para tu envío económico.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-base font-sans">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Distancia:</span>
                    <span className="text-foreground">{quoteDetails.distanceText || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Tiempo Estimado:</span>
                    <span className="text-foreground">{quoteDetails.durationText || 'N/A'}</span>
                  </div>
                  <hr className="my-2 border-border" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xl text-primary font-display">Precio Estimado:</span>
                    {quoteDetails.price !== null ? (
                      <span className="text-xl font-bold text-primary font-display">${quoteDetails.price.toLocaleString('es-AR')}</span>
                    ) : (
                      <span className="text-xl font-bold text-amber-600 font-display">Consultar</span>
                    )}
                  </div>
                  {quoteDetails.price === null && (
                    <p className="text-sm text-amber-700 text-center pt-2 font-sans">
                      La distancia excede nuestros rangos de precios estándar o no pudo ser calculada. Por favor, contáctanos para una cotización personalizada.
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 font-sans">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white" 
                    disabled={quoteDetails.price === null}
                    onClick={() => alert('Funcionalidad "Confirmar Envío Low Cost" pendiente de implementación.')}
                  >
                    <ThumbsUp className="mr-2 h-5 w-5" />
                    Confirmar Envío Low Cost
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={handleNewQuote}>
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Nueva Cotización
                  </Button>
                </CardFooter>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
