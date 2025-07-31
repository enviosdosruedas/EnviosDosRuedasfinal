
"use client";

import { useState, useEffect } from "react";
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { Footer } from "@/components/homenew/footer";
import { OrderStatus } from "@/components/tracking/order-status";
import { DriverInfo } from "@/components/tracking/driver-info";
import { UpdatesTimeline } from "@/components/tracking/updates-timeline";
import { OrderDetails } from "@/components/tracking/order-details";
import { InteractiveTrackingMap } from "@/components/tracking/interactive-tracking-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search } from "lucide-react";
import type { TrackingData } from "./actions";
import { getOrderTrackingDetails } from "./actions";
import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';


export default function SeguimientoPage() {
  const { toast } = useToast();
  const [orderIdInput, setOrderIdInput] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formattedEstimatedArrival, setFormattedEstimatedArrival] = useState<string>("N/A");

  useEffect(() => {
    if (trackingData?.estimatedArrival) {
      try {
        const dateObj = parseISO(trackingData.estimatedArrival);
        if (isValid(dateObj)) {
          setFormattedEstimatedArrival(format(dateObj, "p", { locale: es }));
        } else {
          setFormattedEstimatedArrival("Hora inválida");
        }
      } catch (e) {
        console.error("Error parsing estimated arrival for display:", trackingData.estimatedArrival, e);
        setFormattedEstimatedArrival("Hora inválida");
      }
    } else {
      setFormattedEstimatedArrival("N/A");
    }
  }, [trackingData?.estimatedArrival]);


  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      toast({
        title: "Error de Entrada",
        description: "Por favor, ingrese un ID de pedido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setTrackingData(null);

    const result = await getOrderTrackingDetails(orderIdInput.trim());

    if (result.success && result.data) {
      setTrackingData(result.data);
    } else {
      setError(result.error || "No se pudieron obtener los detalles del seguimiento.");
      toast({
        title: "Error de Seguimiento",
        description: result.error || "No se pudo encontrar el pedido o hubo un problema al obtener los datos.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  
  const formatCurrency = (value: number | bigint | undefined | null): string => {
    if (value === undefined || value === null) return "$0.00";
    const numValue = typeof value === 'bigint' ? Number(value) : value;
    return `$${numValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const mapCenter = trackingData?.driverLocation || trackingData?.pickupLocation || { lat: -38.0023, lng: -57.5575 };

  const getPickupTimeForTimeline = () => {
    // This ensures the raw ISO string is passed to UpdatesTimeline if it's the first update
    // UpdatesTimeline will then format it client-side.
    if (trackingData?.order?.pickupDateTime) {
      const dateObj = typeof trackingData.order.pickupDateTime === 'string' 
                      ? parseISO(trackingData.order.pickupDateTime) 
                      : trackingData.order.pickupDateTime;
      if (isValid(dateObj)) {
        return dateObj.toISOString();
      }
    }
    return new Date().toISOString(); // Fallback, though should be handled by server
  };


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <OptimizedHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <Link href="/">
            <Button variant="outline" className="text-primary border-primary hover:bg-accent">
              ← Volver al Inicio
            </Button>
          </Link>
        </div>

        <div className="max-w-md mx-auto mb-8 p-6 bg-card rounded-lg shadow-sm border border-border">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground text-center">
              Rastrear Pedido
            </h2>
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-muted-foreground mb-1">
                ID del Pedido
              </label>
              <Input
                id="orderId"
                type="text"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="Ej: 101 o tu ID de envío"
                className="w-full"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Buscando..." : "Rastrear"}
            </Button>
          </form>
        </div>

        {trackingData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <OrderStatus
                status={trackingData.status}
                estimatedArrival={formattedEstimatedArrival}
                timeRemaining={trackingData.timeRemaining}
              />

              <DriverInfo driver={trackingData.driverInfo} />

              <UpdatesTimeline updates={
                  // Construct initial update with ISO string time for client-side formatting
                  trackingData.order.pickupDateTime ? 
                  [
                    {
                      time: getPickupTimeForTimeline(), 
                      status: "Pedido Recibido y Programado",
                      description: `Tu pedido ${trackingData.order.id} ha sido confirmado y programado para retiro.`,
                      icon: "started",
                      isActive: true
                    },
                     ...trackingData.updates.filter(u => u.icon !== 'started' && u.status !== "Pedido Recibido") 
                  ]
                  : trackingData.updates
                } 
              />


              <OrderDetails
                orderId={String(trackingData.order.id)} 
                orderSummary={{
                  items: 1, 
                  subtotal: formatCurrency(trackingData.order.shippingCost), 
                  total: formatCurrency(trackingData.order.totalCost),
                }}
              />
            </div>

            {/* Right Column - Map */}
            <div className="lg:sticky lg:top-6 h-[400px] lg:h-auto">
               <InteractiveTrackingMap
                center={mapCenter}
                pickupLocation={trackingData.pickupLocation || undefined}
                deliveryLocation={trackingData.deliveryLocation || undefined}
                driverLocation={trackingData.driverLocation || undefined}
                orderId={String(trackingData.order.id)}
              />
            </div>
          </div>
        )}
        {!isLoading && error && !trackingData && (
          <div className="text-center py-10">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
