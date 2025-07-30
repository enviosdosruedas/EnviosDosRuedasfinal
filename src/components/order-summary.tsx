
"use client";

import { Button } from "@/components/ui/button";
import { Clock, Loader2, MapPin, User, Phone, Mail, DollarSign, FileText } from "lucide-react";

interface OrderSummaryProps {
  pickupFullAddress: string;
  pickupContactName: string;
  pickupPhoneNumber: string;
  pickupFormattedDateTime: string;

  deliveryFullAddress: string;
  deliveryContactName: string;
  deliveryPhoneNumber: string;
  deliveryEmail?: string;
  deliveryFormattedDateTime: string;

  distance: string;
  deliveryNoteText: string;
  shippingCostFormatted: string;
  deliveryTipFormatted: string;
  totalCostFormatted: string;

  onMakeOrder: () => void;
  isSubmitting?: boolean;
}

export function OrderSummary({
  pickupFullAddress,
  pickupContactName,
  pickupPhoneNumber,
  pickupFormattedDateTime,
  deliveryFullAddress,
  deliveryContactName,
  deliveryPhoneNumber,
  deliveryEmail,
  deliveryFormattedDateTime,
  distance,
  deliveryNoteText,
  shippingCostFormatted,
  deliveryTipFormatted,
  totalCostFormatted,
  onMakeOrder,
  isSubmitting = false,
}: OrderSummaryProps) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-4 space-y-6">
      <div>
        <h3 className="pb-3 block text-sm font-semibold text-gray-900">
          DETALLES DE RECOGIDA
        </h3>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
            <span>{pickupFullAddress}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
            <span>{pickupContactName}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
            <span>{pickupPhoneNumber}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
            <span className="font-medium">{pickupFormattedDateTime}</span>
          </div>
        </div>
      </div>

      <hr />

      <div>
        <h3 className="pb-3 block text-sm font-semibold text-gray-900">
          DETALLES DE LA ENTREGA
        </h3>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
            <span>{deliveryFullAddress}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
            <span>{deliveryContactName}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
            <span>{deliveryPhoneNumber}</span>
          </div>
          {deliveryEmail && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
              <span>{deliveryEmail}</span>
            </div>
          )}
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
            <span className="font-medium">{deliveryFormattedDateTime}</span>
          </div>
        </div>
      </div>

      <hr />

      <div>
        <h3 className="pb-3 block text-sm font-semibold text-gray-900">
          RESUMEN DEL PEDIDO
        </h3>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Distancia:</span>
            <span className="font-medium">{distance}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="flex-shrink-0 mr-2">Nota de entrega:</span>
            <span className="font-medium text-right break-all">{deliveryNoteText || "-"}</span>
          </div>
        </div>
      </div>
      
      <hr />

      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Costes de envío</span>
          <span className="font-medium">{shippingCostFormatted}</span>
        </div>
        <div className="flex justify-between">
          <span>Propina de entrega</span>
          <span className="font-medium">{deliveryTipFormatted}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>{totalCostFormatted}</span>
        </div>
      </div>

      <div className="text-center mt-8 mb-2 mx-2">
        <Button
          type="button"
          onClick={onMakeOrder}
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 w-full text-base font-semibold rounded-lg"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Procesando..." : "Hacer pedido"}
        </Button>
      </div>
    </div>
  );
}