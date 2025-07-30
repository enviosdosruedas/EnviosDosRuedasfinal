
export interface PrecioRango {
  distancia_min_km: number;
  distancia_max_km: number;
  precio_rango: number;
}

// Datos proporcionados, ordenados por distancia_min_km
export const preciosLowCost: PrecioRango[] = [
  { distancia_min_km: 0.00, distancia_max_km: 2.99, precio_rango: 2150.00 },
  { distancia_min_km: 3.00, distancia_max_km: 4.99, precio_rango: 2900.00 },
  { distancia_min_km: 5.00, distancia_max_km: 8.99, precio_rango: 4000.00 },
  { distancia_min_km: 9.00, distancia_max_km: 12.99, precio_rango: 5800.00 },
  { distancia_min_km: 13.01, distancia_max_km: 20.00, precio_rango: 8200.00 },
];

/**
 * Obtiene el precio del servicio Low Cost basado en la distancia.
 * @param distanciaKm La distancia en kilómetros.
 * @returns El precio del rango correspondiente o undefined si la distancia está fuera de los rangos definidos.
 */
export function obtenerPrecioLowCostPorDistancia(distanciaKm: number): number | undefined {
  for (const rango of preciosLowCost) {
    if (distanciaKm >= rango.distancia_min_km && distanciaKm <= rango.distancia_max_km) {
      return rango.precio_rango;
    }
  }
  // Si la distancia es mayor que el rango máximo definido, o menor que el mínimo (aunque el mínimo es 0)
  // se considera fuera de rango.
  return undefined;
}
