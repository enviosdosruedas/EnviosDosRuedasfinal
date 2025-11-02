// prisma/script/bajartodo.ts
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const outputDir = path.join(process.cwd(), 'prisma', 'datos');

// Función para manejar la serialización de BigInt
function replacer(key: string, value: any) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  // Convert Decimal.js objects to numbers
  if (value && typeof value === 'object' && value.constructor.name === 'Decimal') {
    return value.toNumber();
  }
  return value;
}

async function exportTable(tableName: keyof PrismaClient, fileName: string) {
  console.log(`Exportando tabla: ${tableName}...`);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let records;
    if (tableName === 'socialPost') {
        records = await (prisma[tableName] as any).findMany({
            orderBy: {
                timestamp: 'desc',
            },
        });
    } else {
        records = await (prisma[tableName] as any).findMany();
    }
    
    const jsonContent = JSON.stringify(records, replacer, 2);
    fs.writeFileSync(path.join(outputDir, fileName), jsonContent, 'utf-8');
    console.log(`Tabla ${tableName} exportada exitosamente a ${fileName}`);
  } catch (error) {
    console.error(`Error exportando la tabla ${tableName}:`, error);
    throw error; // Re-throw error para detener el proceso principal
  }
}

async function main() {
  console.log('Iniciando proceso de exportación de datos...');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Directorio de datos creado en: ${outputDir}`);
  }

  const tablesToExport = [
    { tableName: 'socialPost', fileName: 'socialPosts.json' },
    { tableName: 'client', fileName: 'clients.json' },
    { tableName: 'order', fileName: 'orders.json' },
    { tableName: 'etiqueta', fileName: 'etiquetas.json' },
    { tableName: 'priceRange', fileName: 'priceRanges.json' },
    { tableName: 'repartidor', fileName: 'repartidores.json' },
  ] as const;

  try {
    for (const { tableName, fileName } of tablesToExport) {
      // Aserción de tipo para asegurar que tableName es una clave válida de prisma
      await exportTable(tableName as keyof PrismaClient, fileName);
    }
    console.log('¡Todos los datos han sido exportados exitosamente!');
  } catch (error) {
    console.error('Ocurrió un error durante la exportación:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('Conexión con la base de datos cerrada.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
