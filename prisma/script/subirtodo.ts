// prisma/script/subirtodo.ts
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, '../datos');

async function importTable<T>(
  tableName: keyof PrismaClient,
  fileName: string,
  transform?: (data: T) => Omit<T, 'id'>
) {
  console.log(`Importando datos para la tabla: ${tableName}...`);
  const filePath = path.join(dataDir, fileName);

  if (!fs.existsSync(filePath)) {
    console.log(`-> Archivo ${fileName} no encontrado, omitiendo.`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent) as T[];

  if (data.length === 0) {
    console.log(`-> No hay datos en ${fileName} para importar.`);
    return;
  }

  // Convertir strings de fecha a objetos Date y números a Decimal donde sea necesario
  const processedData = data.map((item: any) => {
      const newItem = { ...item };
      // Eliminar el id autoincremental
      delete newItem.id;
      
      for (const key in newItem) {
          if (typeof newItem[key] === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(newItem[key])) {
              newItem[key] = new Date(newItem[key]);
          }
           // Prisma maneja la conversión de number a Decimal automáticamente en createMany si el tipo de schema es Decimal
      }
      return newItem;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (prisma[tableName] as any).createMany({
    data: processedData,
    skipDuplicates: true, // Por si acaso
  });

  console.log(`-> ¡${result.count} registros importados a '${tableName}' desde ${fileName}!`);
}


async function clearDatabase() {
    console.log('Limpiando la base de datos...');
    // El orden de eliminación es importante para evitar violaciones de claves foráneas
    await prisma.etiqueta.deleteMany({});
    console.log('- Tabla Etiqueta limpiada.');
    await prisma.order.deleteMany({});
    console.log('- Tabla Order limpiada.');
    await prisma.client.deleteMany({});
    console.log('- Tabla Client limpiada.');
    await prisma.socialPost.deleteMany({});
    console.log('- Tabla SocialPost limpiada.');
    await prisma.priceRange.deleteMany({});
    console.log('- Tabla PriceRange limpiada.');
    await prisma.repartidor.deleteMany({});
    console.log('- Tabla Repartidor limpiada.');
    console.log('¡Base de datos limpiada!');
}


async function main() {
  console.log('Iniciando proceso de importación de datos...');

  // Limpiar la base de datos antes de importar
  await clearDatabase();
  
  console.log('\nComenzando la carga de datos...');
  // El orden de importación también es importante
  await importTable('socialPost', 'socialposts.json');
  await importTable('client', 'clients.json');
  await importTable('order', 'orders.json');
  await importTable('etiqueta', 'etiquetas.json');
  await importTable('priceRange', 'priceranges.json');
  await importTable('repartidor', 'repartidores.json');

  console.log('\n¡Proceso de importación completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('Ocurrió un error durante la importación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
