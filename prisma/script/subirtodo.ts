// prisma/script/subirtodo.ts
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, '..', 'datos');

async function importTable(fileName: string, model: keyof PrismaClient) {
  const filePath = path.join(dataDir, `${fileName}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`Archivo ${fileName}.json no encontrado. Omitiendo importación.`);
    return;
  }

  console.log(`Importando datos desde ${fileName}.json a la tabla ${model}...`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!Array.isArray(data)) {
    throw new Error(`El archivo ${fileName}.json no contiene un array.`);
  }

  for (const record of data) {
    // Convertir strings de fecha a objetos Date
    Object.keys(record).forEach(key => {
        if (typeof record[key] === 'string') {
            const date = new Date(record[key]);
            if (!isNaN(date.getTime()) && record[key].includes('T') && record[key].includes('Z')) {
                record[key] = date;
            }
        }
        // Asegurarse de que los campos Decimal se manejen como números
        if (key.toLowerCase().includes('lat') || key.toLowerCase().includes('lng') || key.toLowerCase().includes('precio')) {
            if (record[key] !== null && typeof record[key] !== 'number') {
                record[key] = parseFloat(record[key]);
            }
        }
    });

    // Corrección para SocialPost: si 'timestamp' es nulo, usar la fecha actual.
    if (model === 'socialPost' && !record.timestamp) {
        record.timestamp = new Date();
    }
    
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (prisma[model] as any).create({
            data: record,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            console.warn(`Registro duplicado omitido en ${model}: ${JSON.stringify(record)}`);
        } else {
            console.error(`Error importando registro a ${model}:`, record, error);
            throw error; // Detener si es un error diferente
        }
    }
  }
  console.log(` -> ${data.length} registros importados a la tabla ${model}.`);
}

async function main() {
  console.log('Iniciando proceso de importación de datos...');

  // El orden es importante para respetar las restricciones de clave externa.
  // Borrar en orden inverso a la creación.
  console.log('Limpiando la base de datos existente...');
  await prisma.etiqueta.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.priceRange.deleteMany({});
  await prisma.socialPost.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.repartidor.deleteMany({});
  console.log('Base de datos limpiada.');

  // Importar en el orden de dependencia.
  const tablesToImport = [
    { model: 'client' as keyof PrismaClient, file: 'clients' },
    { model: 'repartidor' as keyof PrismaClient, file: 'repartidores' },
    { model: 'socialPost' as keyof PrismaClient, file: 'socialPosts' },
    { model: 'priceRange' as keyof PrismaClient, file: 'priceRanges' },
    { model: 'order' as keyof PrismaClient, file: 'orders' },
    { model: 'etiqueta' as keyof PrismaClient, file: 'etiquetas' },
  ];

  try {
    for (const table of tablesToImport) {
       await importTable(table.file, table.model);
    }
    console.log('\n¡Importación de datos completada exitosamente!');
  } catch (e) {
    console.error('Ocurrió un error durante la importación:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
