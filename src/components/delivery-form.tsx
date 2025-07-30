
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import type { Dispatch, SetStateAction } from 'react';

interface DeliveryFormProps {
  deliveryFullName: string;
  setDeliveryFullName: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  deliveryEmail: string;
  setDeliveryEmail: Dispatch<SetStateAction<string>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  deliveryDate: string;
  setDeliveryDate: Dispatch<SetStateAction<string>>;
  deliveryTime: string;
  setDeliveryTime: Dispatch<SetStateAction<string>>;
  deliveryNote: string;
  setDeliveryNote: Dispatch<SetStateAction<string>>;
  deliveryTip: string;
  setDeliveryTip: Dispatch<SetStateAction<string>>;
}

export function DeliveryForm({
  deliveryFullName,
  setDeliveryFullName,
  phoneNumber,
  setPhoneNumber,
  deliveryEmail,
  setDeliveryEmail,
  address,
  setAddress,
  deliveryDate,
  setDeliveryDate,
  deliveryTime,
  setDeliveryTime,
  deliveryNote,
  setDeliveryNote,
  deliveryTip,
  setDeliveryTip,
}: DeliveryFormProps) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 sm:p-6 mb-4">
      <label className="pb-3 block text-sm font-semibold text-gray-900">
        ENTREGAR A
      </label>
      <div className="space-y-4">
        <Input
          type="text"
          required
          value={deliveryFullName}
          onChange={(e) => setDeliveryFullName(e.target.value)}
          placeholder="Nombre completo del destinatario"
          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
        />
        <Input
          type="tel"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Número de teléfono del destinatario"
          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
        />
        <Input
          type="email"
          value={deliveryEmail}
          onChange={(e) => setDeliveryEmail(e.target.value)}
          placeholder="Dirección de correo electrónico del destinatario (Opcional)"
          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            required
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección postal del destinatario"
            className="flex-1 border-gray-300 focus:border-primary focus:ring-primary"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-gray-300 hover:border-gray-400 self-start w-full sm:w-auto"
            title="Ubicar en mapa"
          >
            <Image
              src="https://ext.same-assets.com/4138676004/1916837550.svg"
              alt="Ubicar en mapa"
              width={24}
              height={24}
              data-ai-hint="location pin"
            />
            <span className="ml-2 sm:hidden">Ubicar en mapa</span>
          </Button>
        </div>
        <Input
          type="date"
          required
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
        />
        <Input
          type="time"
          required
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
        />
        <Textarea
          required
          value={deliveryNote}
          onChange={(e) => setDeliveryNote(e.target.value)}
          placeholder="Nota de entrega"
          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
        />
        <Input
          type="number"
          value={deliveryTip}
          onChange={(e) => setDeliveryTip(e.target.value)}
          placeholder="Propina de entrega (Opcional)"
          min="0"
          step="0.01"
          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
    </div>
  );
}