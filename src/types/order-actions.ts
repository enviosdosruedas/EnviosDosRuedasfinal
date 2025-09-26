// src/types/order-actions.ts
import type { Client, Prisma, ServiceTypeEnum as PrismaServiceTypeEnum } from '@prisma/client';
import type { z } from 'zod';

// --- Types for searchClientByPhone ---
export interface ClientSearchInput {
  phone: string;
}
export interface ClientSearchResult {
  success: boolean;
  data?: Client | null; // Client type is from Prisma
  error?: string;
  message?: string; 
  fieldErrors?: z.ZodIssue[];
}

// --- Types for registerClient ---
export interface RegisterClientInput {
  name: string;
  lastName?: string;
  phone: string;
  email?: string;
  address: string;
}
export interface RegisterClientResult {
  success: boolean;
  data?: Client; // Client type is from Prisma
  error?: string;
  fieldErrors?: z.ZodIssue[];
}

// --- Types for quoteShipment ---
export interface QuoteShipmentInput {
  originAddress: string;
  destinationAddress: string;
  serviceType: PrismaServiceTypeEnum; 
}
export interface QuoteDetails {
  price: number | null; 
  distanceText: string;
  durationText: string;
  originLat: number; 
  originLng: number; 
  destinationLat: number; 
  destinationLng: number; 
}
export interface QuoteShipmentResult {
  success: boolean;
  data?: QuoteDetails;
  error?: string;
  fieldErrors?: z.ZodIssue[];
}

// --- Types for saveShipment ---
// Input now expects numbers for prices and coordinates, matching Zod schema.
// The Server Action will handle conversion to Decimal for Prisma.
export interface SaveShipmentInput {
  clientId?: number; 

  originFullName: string;
  originPhone: string;
  originAddress: string;
  originLat: number; 
  originLng: number; 

  destinationContactName: string;
  destinationContactPhone: string;
  destinationContactEmail?: string;
  destinationAddress: string;
  destinationLat: number; 
  destinationLng: number; 
  
  serviceType: PrismaServiceTypeEnum; 
  quotedPrice: number; 
  distanceText?: string;
  durationText?: string;
  
  clientNameAtOrder?: string; 
  clientPhoneAtOrder?: string;

  pickupDate: Date;
  pickupTimeFrom: string; 
  pickupTimeTo: string; 
  deliveryDate: Date;
  deliveryTimeFrom: string; 
  deliveryTimeTo: string;
  
  shippingCost?: number; 
  totalCost?: number; 
}

export interface SaveShipmentResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: z.ZodIssue[];
  shipmentId?: number; 
}
