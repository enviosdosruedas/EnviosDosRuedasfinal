// src/app/admin/ordenes/page.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import prisma from "@/lib/prisma";
import { OrdenesTable } from "@/components/admin/ordenes/OrdenesTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gestión de Órdenes",
  description: "Administra, visualiza, crea y modifica las órdenes de envío.",
  robots: {
    index: false, // Prevent admin pages from being indexed by search engines
    follow: false,
  },
};

// Revalidate data to ensure it's fresh, e.g., every 60 seconds.
export const revalidate = 60;

export default async function AdminOrdenesPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      client: true, // Include related client data
    },
  });

  // Convert Decimal fields to numbers for client component compatibility
  const formattedOrders = orders.map(order => ({
    ...order,
    quotedPrice: order.quotedPrice?.toNumber() ?? 0,
    shippingCost: order.shippingCost?.toNumber() ?? 0,
    totalCost: order.totalCost?.toNumber() ?? 0,
    originLat: order.originLat?.toNumber() ?? null,
    originLng: order.originLng?.toNumber() ?? null,
    destinationLat: order.destinationLat?.toNumber() ?? null,
    destinationLng: order.destinationLng?.toNumber() ?? null,
    client: order.client ? {
        ...order.client,
        addressLat: order.client.addressLat?.toNumber() ?? null,
        addressLng: order.client.addressLng?.toNumber() ?? null,
    } : null,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Gestión de Órdenes</h1>
          <Button asChild>
            <Link href="/ordenes">
              <PlusCircle className="mr-2 h-4 w-4" />
              Crear Nueva Orden
            </Link>
          </Button>
        </div>
        <OrdenesTable orders={formattedOrders} />
      </main>
      <Footer />
    </div>
  );
}
