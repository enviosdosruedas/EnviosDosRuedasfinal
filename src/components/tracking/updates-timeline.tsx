
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

interface UpdateItemRaw {
  time: string; // Expect ISO string from server
  status: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface UpdateItemFormatted extends Omit<UpdateItemRaw, 'time'> {
  formattedTime: string;
}


interface UpdatesTimelineProps {
  updates: UpdateItemRaw[];
}

export function UpdatesTimeline({ updates: rawUpdates }: UpdatesTimelineProps) {
  const [formattedUpdates, setFormattedUpdates] = useState<UpdateItemFormatted[]>([]);

  useEffect(() => {
    const newFormattedUpdates = rawUpdates.map(update => {
      let formattedTime = "Hora inválida";
      try {
        const dateObj = parseISO(update.time);
        if (isValid(dateObj)) {
          formattedTime = format(dateObj, "p", { locale: es }); // Format to 'h:mm a' e.g., "10:30 AM"
        }
      } catch (e) {
        console.error("Error parsing date for timeline:", update.time, e);
      }
      return {
        ...update,
        formattedTime,
      };
    });
    setFormattedUpdates(newFormattedUpdates);
  }, [rawUpdates]);

  const getIconSrc = (icon: string) => {
    switch (icon) {
      case 'started':
        return 'https://ext.same-assets.com/2423591613/3488193358.svg';
      case 'pickup':
        return 'https://ext.same-assets.com/2423591613/496802177.svg';
      case 'delivery':
        return 'https://ext.same-assets.com/2423591613/1262641226.svg';
      default:
        return 'https://ext.same-assets.com/2423591613/3488193358.svg';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Actualizaciones
      </h3>

      <div className="space-y-4">
        {formattedUpdates.map((update, index) => (
          <div key={`update-${update.status}-${index}`} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                update.isActive ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Image
                  src={getIconSrc(update.icon)}
                  alt={update.status}
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {update.status}
                </p>
                <p className="text-sm text-gray-500">
                  {update.formattedTime}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {update.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
