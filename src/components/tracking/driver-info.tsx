import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

interface DriverProps {
  name: string;
  title: string;
  photo: string;
  phone: string;
}

interface DriverInfoProps {
  driver: DriverProps;
}

export function DriverInfo({ driver }: DriverInfoProps) {
  const handleCall = () => {
    window.open(`tel:${driver.phone}`, '_self');
  };

  const handleSms = () => {
    window.open(`sms:${driver.phone}`, '_self');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={driver.photo}
            alt={driver.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{driver.name}</h3>
          <p className="text-gray-600 text-sm">{driver.title}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleCall}
            size="sm"
            variant="outline"
            className="p-3 rounded-full"
            title="Llamar al conductor"
          >
            <Phone className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleSms}
            size="sm"
            variant="outline"
            className="p-3 rounded-full"
            title="Enviar SMS al conductor"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
