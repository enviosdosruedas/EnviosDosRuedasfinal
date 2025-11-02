
'use server';

import prisma from '@/lib/prisma';
import { Prisma, ServiceTypeEnum as PrismaServiceTypeEnum, type Client, type Order as PrismaOrder } from '@prisma/client';
import { z } from 'zod';
import type {
  ClientSearchInput, ClientSearchResult,
  RegisterClientInput, RegisterClientResult,
  QuoteShipmentInput, QuoteDetails, QuoteShipmentResult,
  SaveShipmentInput, SaveShipmentResult
} from '@/types/order-actions';
import { format, parse } from 'date-fns';


// --- Google Maps API Helper ---
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAR_DEL_PLATA_COMPONENT_FILTER = '&components=country:AR|administrative_area:Buenos%20Aires|locality:Mar%20del%20Plata';

interface GeocodeResult {
  lat: number;
  lng: number;
}

interface GoogleGeocodeResponse {
  results: {
    geometry: { location: GeocodeResult };
    formatted_address: string;
  }[];
  status: string;
  error_message?: string;
}

async function geocodeAddressWithGoogle(address: string, cityHint: string = "Mar del Plata"): Promise<GeocodeResult | null> {
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY" || GOOGLE_MAPS_API_KEY === "demo-key") {
    console.warn(`Google Maps API key not configured or is placeholder. Geocoding for "${address}" skipped. Returning simulated coordinates for ${cityHint}.`);
    // Simulate coordinates based on hints to distinguish them in tests
    if (address.toLowerCase().includes("origen") || cityHint.toLowerCase().includes("origen")) return { lat: -38.0055, lng: -57.5426 }; // Simulated origin
    if (address.toLowerCase().includes("destino") || cityHint.toLowerCase().includes("destino")) return { lat: -37.9948, lng: -57.5576 }; // Simulated destination
    if (address.toLowerCase().includes("cliente") || cityHint.toLowerCase().includes("cliente")) return { lat: -38.0174, lng: -57.5209 }; // Simulated client address
    return { lat: -38.0023, lng: -57.5575 }; // Default Mar del Plata
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ", " + cityHint + ", Argentina")}${MAR_DEL_PLATA_COMPONENT_FILTER}&key=${GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Geocoding HTTP error for "${address}": ${response.status} ${response.statusText}. Response: ${errorText}`);
      return null;
    }
    const data = await response.json() as GoogleGeocodeResponse;
    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].geometry.location;
    }
    console.error(`Geocoding API error for "${address}": ${data.status} - ${data.error_message || 'No results'}`);
    return null;
  } catch (error: unknown) {
    const e = error instanceof Error ? error : new Error(String(error));
    console.error(`Network error during geocoding for "${address}":`, e.message);
    return null;
  }
}

// --- Client Search and Registration ---
const clientSearchSchema = z.object({
  phone: z.string().min(1, 'El número de teléfono es requerido.').regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
});

export async function searchClientByPhone(input: ClientSearchInput): Promise<ClientSearchResult> {
  try {
    const validatedData = clientSearchSchema.parse(input);
    const client = await prisma.client.findUnique({
      where: { phone: validatedData.phone },
    });
    if (client) {
      const clientData = {
        ...client,
        addressLat: client.addressLat?.toNumber() ?? null,
        addressLng: client.addressLng?.toNumber() ?? null,
      };
      return { success: true, data: clientData as unknown as Client }; // Cast needed due to Decimal to number
    }
    return { success: true, data: null, message: 'Cliente no encontrado.' };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Datos de entrada inválidos.', fieldErrors: error.issues };
    }
    console.error('Error searching client by phone:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Error al buscar cliente: ${errorMessage}` };
  }
}

const registerClientSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido y debe tener al menos 2 caracteres.'),
  lastName: z.string().min(2, 'El apellido es requerido y debe tener al menos 2 caracteres.').optional().or(z.literal('')),
  phone: z.string().min(1, 'El teléfono es requerido.').regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
  email: z.string().email('El email no es válido.').optional().or(z.literal('')), 
  address: z.string().min(5, 'La dirección es requerida y debe tener al menos 5 caracteres.'),
});

export async function registerClient(input: RegisterClientInput): Promise<RegisterClientResult> {
  try {
    const validatedData = registerClientSchema.parse(input);

    const existingByPhone = await prisma.client.findUnique({ where: { phone: validatedData.phone } });
    if (existingByPhone) {
      return { success: false, error: `Ya existe un cliente con el teléfono ${validatedData.phone}.` };
    }
    if (validatedData.email && validatedData.email.trim() !== '') {
      const existingByEmail = await prisma.client.findUnique({ where: { email: validatedData.email } });
      if (existingByEmail) {
        return { success: false, error: `Ya existe un cliente con el email ${validatedData.email}.` };
      }
    }

    const coords = await geocodeAddressWithGoogle(validatedData.address, "cliente");

    const newClient = await prisma.client.create({
      data: {
        name: validatedData.name,
        lastName: validatedData.lastName || null,
        phone: validatedData.phone,
        email: validatedData.email || null,
        address: validatedData.address,
        addressLat: coords ? new Prisma.Decimal(coords.lat.toFixed(7)) : null,
        addressLng: coords ? new Prisma.Decimal(coords.lng.toFixed(7)) : null,
        isActive: true,
      },
    });
     const clientData = {
        ...newClient,
        addressLat: newClient.addressLat?.toNumber() ?? null,
        addressLng: newClient.addressLng?.toNumber() ?? null,
      };
    return { success: true, data: clientData as unknown as Client }; // Cast for lat/lng
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Datos de entrada inválidos.', fieldErrors: error.issues };
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[] | undefined;
        if (target?.includes('phone')) return { success: false, error: 'El número de teléfono ya está registrado.' };
        if (target?.includes('email')) return { success: false, error: 'La dirección de email ya está registrada.' };
        return { success: false, error: 'Error de duplicado al guardar el cliente.' };
      }
    }
    console.error('Error registering client:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Error al registrar cliente: ${errorMessage}` };
  }
}


// --- Shipment Quoting ---
interface GoogleDirectionsResponse {
  routes: {
    legs: {
      distance: { text: string; value: number }; // value is in meters
      duration: { text: string; value: number }; // value is in seconds
    }[];
  }[];
  status: string;
  error_message?: string;
}

const quoteShipmentSchema = z.object({
  originAddress: z.string().min(5, "La dirección de origen es requerida."),
  destinationAddress: z.string().min(5, "La dirección de destino es requerida."),
  serviceType: z.nativeEnum(PrismaServiceTypeEnum, { errorMap: () => ({ message: "Tipo de servicio inválido." }) }),
});

export async function quoteShipment(input: QuoteShipmentInput): Promise<QuoteShipmentResult> {
  try {
    const validatedData = quoteShipmentSchema.parse(input);

    const originCoords = await geocodeAddressWithGoogle(validatedData.originAddress, "origen");
    if (!originCoords) return { success: false, error: `No se pudo geolocalizar la dirección de origen: ${validatedData.originAddress}` };

    const destinationCoords = await geocodeAddressWithGoogle(validatedData.destinationAddress, "destino");
    if (!destinationCoords) return { success: false, error: `No se pudo geolocalizar la dirección de destino: ${validatedData.destinationAddress}` };
    
    let distanceKm: number;
    let distanceText: string;
    let durationText: string;
    let price: number | null;

    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY" || GOOGLE_MAPS_API_KEY === "demo-key") {
      console.warn("Google Maps API key not configured or is placeholder. Simulating directions for quote.");
      // Simulate distance (e.g., between 1 and 15 km)
      distanceKm = Math.random() * 14 + 1; 
      distanceText = `${distanceKm.toFixed(1)} km (simulado)`;
      durationText = `${Math.round(distanceKm * 5 + 5)} min (simulado)`; // Simulate duration

    } else {
      const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.lat},${originCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&key=${GOOGLE_MAPS_API_KEY}&language=es`;
      
      const directionsResponse = await fetch(directionsUrl);
      if (!directionsResponse.ok) {
        const errorText = await directionsResponse.text();
        console.error(`Google Directions API HTTP error: ${directionsResponse.status}. URL: ${directionsUrl}. Response: ${errorText}`);
        return { success: false, error: `Error del API de Google Maps (status ${directionsResponse.status}): ${directionsResponse.statusText}` };
      }

      const directionsData = await directionsResponse.json() as GoogleDirectionsResponse;

      if (directionsData.status !== 'OK' || !directionsData.routes || directionsData.routes.length === 0) {
        console.error(`Google Directions API logical error. Status: ${directionsData.status}. Message: ${directionsData.error_message}`);
        return { success: false, error: `No se pudo calcular la ruta: ${directionsData.error_message || directionsData.status}` };
      }

      const leg = directionsData.routes[0].legs[0];
      distanceKm = leg.distance.value / 1000; // Convert meters to km
      distanceText = leg.distance.text;
      durationText = leg.duration.text;
    }
    
    // Fetch price from database
    const priceRangeRecord = await prisma.priceRange.findFirst({
        where: {
          distanciaMinKm: { lte: new Prisma.Decimal(distanceKm.toFixed(2)) },
          distanciaMaxKm: { gte: new Prisma.Decimal(distanceKm.toFixed(2)) },
          serviceType: validatedData.serviceType,
          isActive: true,
        },
    });

    price = priceRangeRecord ? priceRangeRecord.precioRango.toNumber() : null;

    return {
      success: true,
      data: {
        price,
        distanceText,
        durationText,
        originLat: originCoords.lat,
        originLng: originCoords.lng,
        destinationLat: destinationCoords.lat,
        destinationLng: destinationCoords.lng,
      },
    };

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Datos de entrada para cotización inválidos.", fieldErrors: error.issues };
    }
    console.error('Error quoting shipment (outer catch):', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Error al cotizar envío: ${errorMessage}` };
  }
}

// --- Shipment Saving ---
export async function getAuthenticatedRepartidorIdFromServerSession(): Promise<number | null> {
  console.warn("DEV MODE: `getAuthenticatedRepartidorIdFromServerSession` is using simulated authentication.");
  try {
    const firstRepartidor = await prisma.repartidor.findFirst({ 
        where: { isActive: true } 
    }); 
    if (firstRepartidor) {
      console.log(`DEV MODE: Using Repartidor ID ${firstRepartidor.id} for order creation authorization check.`);
      return firstRepartidor.id;
    }
    console.error("DEV MODE: No active repartidor found for authorization check. Please seed repartidores.");
    return null;
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("Error fetching placeholder repartidor:", error.message);
    return null;
  }
}

const saveShipmentSchema = z.object({
  clientId: z.number().int().optional(),
  
  originFullName: z.string().min(3, 'Nombre del punto de recogida es requerido.'),
  originPhone: z.string().regex(/^\+?\d{7,15}$/, 'Teléfono de recogida inválido.'),
  originAddress: z.string().min(5, 'La dirección de origen es requerida.'),
  originLat: z.number(),
  originLng: z.number(),

  destinationContactName: z.string().min(3, 'Nombre del destinatario es requerido.'),
  destinationContactPhone: z.string().regex(/^\+?\d{7,15}$/, 'Teléfono del destinatario inválido.'),
  destinationContactEmail: z.string().email('Email del destinatario inválido.').optional().or(z.literal('')),
  destinationAddress: z.string().min(5, 'La dirección de destino es requerida.'),
  destinationLat: z.number(),
  destinationLng: z.number(),
  
  serviceType: z.nativeEnum(PrismaServiceTypeEnum),
  quotedPrice: z.number().positive('El precio cotizado debe ser positivo.'),
  distanceText: z.string().optional(),
  durationText: z.string().optional(),
  
  clientNameAtOrder: z.string().optional(),
  clientPhoneAtOrder: z.string().optional(),

  pickupDate: z.coerce.date({ required_error: "Fecha de retiro es requerida." }),
  pickupTimeFrom: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido para retiro desde."),
  pickupTimeTo: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido para retiro hasta."),
  deliveryDate: z.coerce.date({ required_error: "Fecha de entrega es requerida." }),
  deliveryTimeFrom: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido para entrega desde."),
  deliveryTimeTo: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido para entrega hasta."),
  
  shippingCost: z.number().positive().optional(),
  totalCost: z.number().positive().optional(),
})
.refine(data => {
    if(data.pickupTimeFrom && data.pickupTimeTo) return data.pickupTimeFrom < data.pickupTimeTo;
    return true;
}, { message: "La hora de inicio de retiro debe ser anterior a la hora de fin.", path: ["pickupTimeTo"] })
.refine(data => {
    if(data.deliveryTimeFrom && data.deliveryTimeTo) return data.deliveryTimeFrom < data.deliveryTimeTo;
    return true;
}, { message: "La hora de inicio de entrega debe ser anterior a la hora de fin.", path: ["deliveryTimeTo"] })
.refine(data => {
    if (data.pickupDate && data.deliveryDate) return data.pickupDate <= data.deliveryDate;
    return true;
}, {
    message: "La fecha de entrega no puede ser anterior a la fecha de retiro.",
    path: ["deliveryDate"],
})
.refine(data => {
    if (data.pickupDate && data.deliveryDate && data.pickupDate.getTime() === data.deliveryDate.getTime()) { 
        const pickupEndMinutes = parseInt(data.pickupTimeTo.split(':')[0], 10) * 60 + parseInt(data.pickupTimeTo.split(':')[1], 10);
        const deliveryStartMinutes = parseInt(data.deliveryTimeFrom.split(':')[0], 10) * 60 + parseInt(data.deliveryTimeFrom.split(':')[1], 10);
        return deliveryStartMinutes > pickupEndMinutes;
    }
    return true;
}, {
    message: "Si la entrega es el mismo día, la hora 'desde' de entrega debe ser posterior a la hora 'hasta' de retiro.",
    path: ["deliveryTimeFrom"],
});


export async function saveShipment(input: SaveShipmentInput): Promise<SaveShipmentResult> {
  try {
    const authenticatedRepartidorId = await getAuthenticatedRepartidorIdFromServerSession();
    if (authenticatedRepartidorId === null) {
      return { success: false, error: 'No autorizado. Debes ser un repartidor autenticado para crear órdenes.' };
    }

    const validatedData = saveShipmentSchema.parse(input);
    
    const [pHoursFrom, pMinutesFrom] = validatedData.pickupTimeFrom.split(':').map(Number);
    const finalPickupDateTime = new Date(validatedData.pickupDate);
    finalPickupDateTime.setHours(pHoursFrom, pMinutesFrom, 0, 0);

    const [dHoursFrom, dMinutesFrom] = validatedData.deliveryTimeFrom.split(':').map(Number);
    const finalDeliveryDateTime = new Date(validatedData.deliveryDate);
    finalDeliveryDateTime.setHours(dHoursFrom, dMinutesFrom, 0, 0);


    const orderData: Prisma.OrderCreateInput = {
      client: validatedData.clientId !== undefined ? { connect: { id: validatedData.clientId } } : undefined,
      
      originFullName: validatedData.originFullName,
      originPhone: validatedData.originPhone,
      originAddress: validatedData.originAddress, // Mapped to primary originAddress
      originLat: new Prisma.Decimal(validatedData.originLat.toFixed(7)),
      originLng: new Prisma.Decimal(validatedData.originLng.toFixed(7)),
      
      destinationContactName: validatedData.destinationContactName,
      destinationContactPhone: validatedData.destinationContactPhone,
      destinationContactEmail: validatedData.destinationContactEmail || null,
      destinationAddress: validatedData.destinationAddress, // Mapped to primary destinationAddress
      destinationLat: new Prisma.Decimal(validatedData.destinationLat.toFixed(7)),
      destinationLng: new Prisma.Decimal(validatedData.destinationLng.toFixed(7)),
      
      serviceType: validatedData.serviceType,
      quotedPrice: new Prisma.Decimal(validatedData.quotedPrice.toFixed(2)),
      distanceText: validatedData.distanceText,
      durationText: validatedData.durationText,
      
      clientNameAtOrder: validatedData.clientNameAtOrder || validatedData.destinationContactName,
      clientPhoneAtOrder: validatedData.clientPhoneAtOrder || validatedData.destinationContactPhone,

      pickupDate: validatedData.pickupDate, 
      pickupTimeFrom: validatedData.pickupTimeFrom,
      pickupTimeTo: validatedData.pickupTimeTo,
      
      deliveryDate: validatedData.deliveryDate, 
      deliveryTimeFrom: validatedData.deliveryTimeFrom,
      deliveryTimeTo: validatedData.deliveryTimeTo,

      pickupDateTime: finalPickupDateTime, 
      deliveryDateTime: finalDeliveryDateTime,
      
      // The following fields (pickupStreetAddress, deliveryAddress) are nullable in your schema image.
      // If they are distinct from originAddress/destinationAddress and need to be populated,
      // ensure validatedData contains them or derive them appropriately.
      // For now, to ensure the main non-nullable address fields are set, I'm focusing on those.
      // If they are intended as aliases, the primary mapping above is correct.
      // pickupStreetAddress: validatedData.originAddress, // This was the previous mapping
      // deliveryAddress: validatedData.destinationAddress, // This was the previous mapping
      
      shippingCost: new Prisma.Decimal((validatedData.shippingCost ?? validatedData.quotedPrice).toFixed(2)),
      totalCost: new Prisma.Decimal((validatedData.totalCost ?? validatedData.quotedPrice).toFixed(2)),
      // status will default to "pendiente" as per Prisma schema
    };

    const order: PrismaOrder = await prisma.order.create({ data: orderData });
    return { success: true, message: `Envío ${order.id} creado exitosamente.`, shipmentId: order.id as number };

  } catch (error: unknown) {
     if (error instanceof z.ZodError) {
      console.error("Zod validation error during saveShipment:", error.flatten().fieldErrors);
      return { success: false, error: "Error de validación al guardar el envío.", fieldErrors: error.issues };
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma Known Request Error on saveShipment:", error.code, error.meta);
      if (error.code === 'P2002') return { success: false, error: 'Error de duplicado al guardar el envío (P2002).' };
      if (error.code === 'P2003') {
         const fieldNameMeta = error.meta as { field_name?: string };
         const fieldName = fieldNameMeta?.field_name;
         if (fieldName && typeof fieldName === 'string') {
            if (fieldName.includes('clientId_fkey')) return { success: false, error: 'El cliente especificado no existe (Error P2003 en clientId).' };
         }
        return { success: false, error: 'Error de referencia al guardar el envío (cliente no válido - P2003).' };
      }
      return { success: false, error: `Error de base de datos (${error.code}) al guardar el envío.` };
    }
    console.error('Error saving shipment (unknown):', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Error inesperado al guardar el envío: ${errorMessage}` };
  }
}
