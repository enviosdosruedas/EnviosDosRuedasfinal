
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Loader2, PackageCheck, RotateCcw, ThumbsUp, AlertTriangle } from 'lucide-react';
import React, { useState, FormEvent, useMemo } from 'react';
import RouteMap from './route-map';
import { useToast } from '@/hooks/use-toast';
import { quoteShipment } from '@/app/ordenes/actions';
import { ServiceTypeEnum } from '@prisma/client';
import type { QuoteDetails } from '@/types/order-actions';
import type { LatLngLiteral } from 'leaflet';

export default function ExpressCalculator() {
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
        serviceType: ServiceTypeEnum.EXPRESS,
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
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl lg:max-w-3xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-primary">Calcula tu Envío Express</CardTitle>
            <CardDescription className="text-base md:text-lg mt-1">
              Ingresa las direcciones de origen y destino para obtener una cotización instantánea.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="origin" className="text-sm md:text-base">Dirección de Origen</Label>
                <Input
                  id="origin"
                  type="text"
                  placeholder="Ej: Av. Colón 1234, Mar del Plata"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  className="text-sm md:text-base"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="destination" className="text-sm md:text-base">Dirección de Destino</Label>
                <Input
                  id="destination"
                  type="text"
                  placeholder="Ej: Juan B. Justo 5678, Mar del Plata"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="text-sm md:text-base"
                />
              </div>
              <Button type="submit" className="w-full text-base py-2.5 md:py-3" size="lg" disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Calcular Ruta y Precio Express
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
              <Card className="mt-6 md:mt-8 bg-primary/5 border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl md:text-2xl text-primary flex items-center">
                    <PackageCheck className="mr-2 md:mr-3 h-6 w-6 md:h-7 md:w-7" />
                    Tu Cotización Express
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base mt-1">
                    Basado en la distancia y tiempo estimados para tu envío.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm md:text-base">
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
                    <span className="font-semibold text-lg md:text-xl text-primary">Precio Estimado:</span>
                    {quoteDetails.price !== null ? (
                      <span className="text-lg md:text-xl font-bold text-primary">${quoteDetails.price.toLocaleString('es-AR')}</span>
                    ) : (
                      <span className="text-lg md:text-xl font-bold text-amber-600">Consultar</span>
                    )}
                  </div>
                  {quoteDetails.price === null && (
                    <p className="text-xs md:text-sm text-amber-700 text-center pt-1">
                      Distancia excede rangos estándar o no pudo ser calculada. Contáctanos para cotización.
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 md:pt-6">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-sm md:text-base" 
                    disabled={quoteDetails.price === null}
                    onClick={() => alert('Funcionalidad "Confirmar Envío" pendiente de implementación.')}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Confirmar Envío Express
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm md:text-base" onClick={handleNewQuote}>
                    <RotateCcw className="mr-2 h-4 w-4 md:h-5 md:w-5" />
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
