// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Comenzando el proceso de limpieza de la base de datos...');

  // Eliminar registros en un orden que respete las claves foráneas
  // Primero los modelos que dependen de otros.
  
  // Etiqueta no parece tener dependencias salientes directas en el esquema que bloqueen
  await prisma.etiqueta.deleteMany({});
  console.log('-> Todas las etiquetas han sido eliminadas.');

  // Order depende de Client
  await prisma.order.deleteMany({});
  console.log('-> Todas las órdenes han sido eliminadas.');

  // SocialPost no tiene dependencias
  await prisma.socialPost.deleteMany({});
  console.log('-> Todas las publicaciones sociales han sido eliminadas.');

  // PriceRange no tiene dependencias
  await prisma.priceRange.deleteMany({});
  console.log('-> Todos los rangos de precios han sido eliminados.');
  
  // Client puede ser eliminado después de Order
  await prisma.client.deleteMany({});
  console.log('-> Todos los clientes han sido eliminados.');

  // Repartidor no tiene dependencias entrantes de los modelos borrados
  // Si hubiera repartidores, se podrían borrar aquí.
  // await prisma.repartidor.deleteMany({});
  // console.log('-> Todos los repartidores han sido eliminados.');

  console.log('✅ Proceso de limpieza completado.');
}

main()
  .catch((e) => {
    console.error('Error durante el proceso de limpieza:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
