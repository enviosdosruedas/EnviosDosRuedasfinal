// prisma/script/subirtodo.ts
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, '../datos');

async function importTable<T>(
  model: keyof Prisma.TypeMap['model'],
  fileName: string,
  transform?: (data: any) => T
) {
  const filePath = path.join(dataDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`Archivo no encontrado para la tabla ${model}: ${fileName}. Saltando...`);
    return;
  }

  console.log(`Importando datos para la tabla: ${model}...`);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData) as any[];

  if (data.length === 0) {
    console.log(`No hay datos para importar en la tabla ${model}.`);
    return;
  }

  const transformedData = transform ? data.map(transform) : data;

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await prisma[model].createMany({
      data: transformedData,
      skipDuplicates: true, // This can be useful, but be aware of its implications
    });
    console.log(`Datos para la tabla ${model} importados exitosamente.`);
  } catch (error) {
    console.error(`Error importando datos para la tabla ${model}:`, error);
    // Optionally, you might want to handle errors more gracefully,
    // e.g., by logging which records failed.
  }
}

async function clearDatabase() {
    console.log("Limpiando la base de datos...");
    // The order is important due to foreign key constraints
    await prisma.etiqueta.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.client.deleteMany({});
    await prisma.socialPost.deleteMany({});
    await prisma.priceRange.deleteMany({});
    await prisma.repartidor.deleteMany({});
    console.log("Base de datos limpiada.");
}

async function main() {
  console.log('Iniciando proceso de importación de datos...');

  await clearDatabase();
  
  // The order of importation should respect dependencies if any
  // For now, it seems most are independent, but it's good practice.
  await importTable('repartidor', 'repartidor.json');
  await importTable('priceRange', 'priceRange.json');
  await importTable('client', 'client.json', (item: any) => ({
    ...item,
    addressLat: item.addressLat ? new Prisma.Decimal(item.addressLat) : null,
    addressLng: item.addressLng ? new Prisma.Decimal(item.addressLng) : null,
  }));
  await importTable('order', 'order.json', (item: any) => ({
    ...item,
    originLat: item.originLat ? new Prisma.Decimal(item.originLat) : null,
    originLng: item.originLng ? new Prisma.Decimal(item.originLng) : null,
    destinationLat: item.destinationLat ? new Prisma.Decimal(item.destinationLat) : null,
    destinationLng: item.destinationLng ? new Prisma.Decimal(item.destinationLng) : null,
    quotedPrice: item.quotedPrice ? new Prisma.Decimal(item.quotedPrice) : null,
    shippingCost: item.shippingCost ? new Prisma.Decimal(item.shippingCost) : null,
    totalCost: item.totalCost ? new Prisma.Decimal(item.totalCost) : null,
    // Ensure date fields are correctly formatted
    pickupDate: new Date(item.pickupDate),
    deliveryDate: new Date(item.deliveryDate),
    pickupDateTime: new Date(item.pickupDateTime),
    deliveryDateTime: new Date(item.deliveryDateTime),
  }));
  await importTable('socialPost', 'socialPost.json', (item: any) => ({
    ...item,
    timestamp: item.timestamp ? new Date(item.timestamp) : new Date(),
  }));
   await importTable('etiqueta', 'etiqueta.json', (item: any) => ({
    ...item,
    montoACobrar: item.montoACobrar ? new Prisma.Decimal(item.montoACobrar) : null,
    createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    updatedAt: new Date(),
  }));

  console.log('¡Todos los datos han sido importados!');
}

main()
  .catch(e => {
    console.error('Ocurrió un error durante la importación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Conexión con la base de datos cerrada.');
  });
