// src/app/admin/clientes/actions.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface GeocodeResult {
  lat: number;
  lng: number;
  formatted_address: string;
}

interface GoogleGeocodeResponse {
  results: {
    geometry: { location: { lat: number, lng: number } };
    formatted_address: string;
  }[];
  status: string;
  error_message?: string;
}

export async function geocodeAddress(address: string): Promise<{ success: boolean; data?: GeocodeResult; error?: string }> {
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
    console.warn("Geocoding skipped: Google Maps API key not configured.");
    // Simulate a successful response for development without a key
    return { 
        success: true, 
        data: { 
            lat: -38.0054, 
            lng: -57.5426, 
            formatted_address: `${address} (Ubicación Simulada)`
        }
    };
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}&language=es&components=country:AR|administrative_area:Buenos%20Aires|locality:Mar%20del%20Plata`;

  try {
    const response = await fetch(url);
    const data: GoogleGeocodeResponse = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      return {
        success: true,
        data: {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          formatted_address: data.results[0].formatted_address,
        },
      };
    } else {
      return { success: false, error: data.error_message || `No se encontraron resultados para "${address}".` };
    }
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error('Geocoding fetch error:', error);
    return { success: false, error: `Error de red al geolocalizar: ${error.message}` };
  }
}


const createClientSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido.'),
  lastName: z.string().optional(),
  phone: z.string().min(7, 'El teléfono es requerido.').regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
  email: z.string().email('Email inválido.').optional().or(z.literal('')),
  address: z.string().min(5, 'La dirección es requerida.'),
  addressLat: z.coerce.number(),
  addressLng: z.coerce.number(),
});

export interface CreateClientState {
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof createClientSchema>, string[]>>;
}

export async function createClient(
  prevState: CreateClientState,
  formData: FormData
): Promise<CreateClientState> {
  const rawData = {
    name: formData.get('name'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    address: formData.get('address'),
    addressLat: formData.get('addressLat'),
    addressLng: formData.get('addressLng'),
  };

  const validatedFields = createClientSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: 'Por favor, corrige los errores del formulario.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, lastName, phone, email, address, addressLat, addressLng } = validatedFields.data;

  try {
    await prisma.client.create({
      data: {
        name,
        lastName: lastName || null,
        phone,
        email: email || null,
        address,
        addressLat: new Prisma.Decimal(addressLat),
        addressLng: new Prisma.Decimal(addressLng),
        isActive: true,
      },
    });

    revalidatePath('/admin/clientes');

    return {
      message: `Cliente "${name} ${lastName || ''}" creado exitosamente.`,
    };

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        const target = e.meta?.target as string[];
        if (target.includes('phone')) {
          return { error: `El número de teléfono "${phone}" ya está registrado.` };
        }
        if (target.includes('email')) {
          return { error: `El email "${email}" ya está registrado.` };
        }
      }
    }
    console.error(e);
    return { error: 'Ocurrió un error en la base de datos al crear el cliente.' };
  }
}