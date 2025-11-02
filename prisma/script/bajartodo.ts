// prisma/script/bajartodo.ts
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const outputDir = path.join(__dirname, '..', 'datos');

// Helper para convertir tipos de Prisma (como Decimal) a tipos nativos de JSON
function prismaToJson(data: any): any {
  if (data === null) return null;
  if (data instanceof Date) return data.toISOString();
  if (data instanceof Object && data.constructor.name === 'Decimal') {
    return data.toNumber();
  }
  if (Array.isArray(data)) {
    return data.map(prismaToJson);
  }
  if (typeof data === 'object') {
    const newObj: { [key: string]: any } = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newObj[key] = prismaToJson(data[key]);
      }
    }
    return newObj;
  }
  return data;
}

async function exportTable(tableName: keyof PrismaClient, fileName: string) {
  console.log(`Exportando tabla: ${tableName}...`);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const records = await (prisma[tableName] as any).findMany({
        // Corrección: Usar 'timestamp' en lugar de 'createdAt' para SocialPost
        orderBy: tableName === 'socialPost' ? { timestamp: 'desc' } : 
                 tableName === 'order' ? { createdAt: 'desc' } : 
                 tableName === 'client' ? { createdAt: 'desc' } : 
                 tableName === 'etiqueta' ? { createdAt: 'desc' } : 
                 undefined,
    });
    
    const jsonRecords = prismaToJson(records);

    fs.writeFileSync(
      path.join(outputDir, `${fileName}.json`),
      JSON.stringify(jsonRecords, null, 2)
    );

    console.log(` -> Tabla ${tableName} exportada a ${fileName}.json (${records.length} registros).`);
  } catch (error) {
    console.error(`Error exportando la tabla ${tableName}:`, error);
    throw error; // Detener el proceso si hay un error
  }
}

async function main() {
  console.log('Iniciando proceso de exportación de datos...');
  
  if (!fs.existsSync(outputDir)) {
    console.log(`Creando directorio de datos en: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tablesToExport: { name: keyof PrismaClient, file: string }[] = [
    { name: 'socialPost', file: 'socialPosts' },
    { name: 'client', file: 'clients' },
    { name: 'order', file: 'orders' },
    { name: 'etiqueta', file: 'etiquetas' },
    { name: 'priceRange', file: 'priceRanges' },
    { name: 'repartidor', file: 'repartidores' },
  ];

  try {
    for (const table of tablesToExport) {
      // Validar que la tabla existe en el cliente de Prisma antes de intentar exportar
      if (table.name in prisma) {
        await exportTable(table.name, table.file);
      } else {
        console.warn(`Advertencia: La tabla '${table.name}' no se encontró en el cliente de Prisma y será omitida.`);
      }
    }
    console.log('\n¡Exportación de datos completada exitosamente!');
  } catch (e) {
    console.error('Ocurrió un error durante la exportación:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
