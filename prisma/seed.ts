// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el script de limpieza de la base de datos...');

  // El orden de eliminación es importante para evitar violaciones de claves foráneas
  // Eliminar registros de tablas que tienen dependencias primero.
  
  console.log('Eliminando registros de la tabla Etiqueta...');
  await prisma.etiqueta.deleteMany({});
  console.log('-> Tabla Etiqueta limpiada.');

  console.log('Eliminando registros de la tabla Order...');
  await prisma.order.deleteMany({});
  console.log('-> Tabla Order limpiada.');
  
  console.log('Eliminando registros de la tabla Client...');
  await prisma.client.deleteMany({});
  console.log('-> Tabla Client limpiada.');

  console.log('Eliminando registros de la tabla SocialPost...');
  await prisma.socialPost.deleteMany({});
  console.log('-> Tabla SocialPost limpiada.');

  console.log('Eliminando registros de la tabla PriceRange...');
  await prisma.priceRange.deleteMany({});
  console.log('-> Tabla PriceRange limpiada.');

  console.log('Eliminando registros de la tabla Repartidor...');
  await prisma.repartidor.deleteMany({});
  console.log('-> Tabla Repartidor limpiada.');

  console.log('\n¡Todas las tablas han sido limpiadas exitosamente!');
}

main()
  .catch((e) => {
    console.error('Ocurrió un error durante la limpieza de la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Desconectado de la base de datos.');
  });
