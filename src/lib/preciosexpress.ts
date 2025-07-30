
export interface PrecioRango {
  distancia_min_km: number;
  distancia_max_km: number;
  precio_rango: number;
}

export const preciosExpress: PrecioRango[] = [
  { distancia_min_km: 0.00, distancia_max_km: 2.99, precio_rango: 2700.00 },
  { distancia_min_km: 3.00, distancia_max_km: 4.99, precio_rango: 3400.00 },
  { distancia_min_km: 5.00, distancia_max_km: 5.99, precio_rango: 4200.00 },
  { distancia_min_km: 6.00, distancia_max_km: 6.99, precio_rango: 5000.00 },
  { distancia_min_km: 7.00, distancia_max_km: 7.99, precio_rango: 5800.00 },
  { distancia_min_km: 8.00, distancia_max_km: 8.99, precio_rango: 6500.00 },
  { distancia_min_km: 9.00, distancia_max_km: 10.00, precio_rango: 7350.00 },
  { distancia_min_km: 10.01, distancia_max_km: 11.00, precio_rango: 8250.00 },
  { distancia_min_km: 11.01, distancia_max_km: 12.00, precio_rango: 9000.00 },
  { distancia_min_km: 12.01, distancia_max_km: 13.00, precio_rango: 9750.00 },
  { distancia_min_km: 13.01, distancia_max_km: 14.00, precio_rango: 10500.00 },
  { distancia_min_km: 14.01, distancia_max_km: 15.00, precio_rango: 11250.00 },
  { distancia_min_km: 15.01, distancia_max_km: 16.00, precio_rango: 12000.00 },
  { distancia_min_km: 16.01, distancia_max_km: 17.00, precio_rango: 12750.00 },
  { distancia_min_km: 17.01, distancia_max_km: 18.00, precio_rango: 13500.00 },
  { distancia_min_km: 18.01, distancia_max_km: 19.00, precio_rango: 14250.00 },
  { distancia_min_km: 19.01, distancia_max_km: 20.00, precio_rango: 15000.00 },
];

/**
 * Obtiene el precio del servicio Express basado en la distancia.
 * @param distanciaKm La distancia en kilómetros.
 * @returns El precio del rango correspondiente o undefined si la distancia está fuera de los rangos definidos.
 */
export function obtenerPrecioExpressPorDistancia(distanciaKm: number): number | undefined {
  for (const rango of preciosExpress) {
    if (distanciaKm >= rango.distancia_min_km && distanciaKm <= rango.distancia_max_km) {
      return rango.precio_rango;
    }
  }
  // Si la distancia es mayor que el rango máximo definido, o menor que el mínimo (aunque el mínimo es 0)
  // se considera fuera de rango.
  return undefined;
}
