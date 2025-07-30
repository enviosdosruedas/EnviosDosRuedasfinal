
export interface MotoFijaPlan {
  name: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export const motoFijaPlans: MotoFijaPlan[] = [
  {
    name: "Medio Día",
    duration: "4 horas",
    price: "Desde $37.600",
    description: "Ideal para picos de demanda específicos",
    features: [
      "4 horas de servicio dedicado",
      "Horario a elección",
      "Repartidor exclusivo",
      "Comunicación directa",
      "Entregas hasta 10km",
    ],
    popular: false,
  },
  {
    name: "Día Completo",
    duration: "8 horas",
    price: "Desde $68.800",
    description: "La opción más popular para restaurantes",
    features: [
      "8 horas de servicio dedicado",
      "Horario comercial completo",
      "Repartidor exclusivo",
      "Comunicación directa",
      "Entregas ilimitadas",
      "Soporte prioritario",
    ],
    popular: true,
  },
  {
    name: "Personalizado",
    duration: "A medida",
    price: "Consultar",
    description: "Solución adaptada a tus necesidades específicas",
    features: [
      "Horarios flexibles",
      "Múltiples repartidores",
      "Cobertura extendida",
      "Servicios adicionales",
      "Facturación mensual",
      "Gerente de cuenta dedicado",
    ],
    popular: false,
  },
];
