// prisma/script/bajartodo.ts
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const outputDir = path.join(__dirname, '../datos');

// Lista de tablas a exportar
const tablesToExport: (keyof PrismaClient)[] = [
  'client',
  'order',
  'etiqueta',
  'priceRange',
  'repartidor'
];

// Función para convertir Decimals a números
function convertDecimals(data: any[]): any[] {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (value && typeof value === 'object' && value.type === 'BigInt') {
      return BigInt(value.value).toString();
    }
    if (value instanceof Prisma.Decimal) {
      return value.toNumber();
    }
    return value;
  }));
}

async function exportTable(tableName: keyof PrismaClient, fileName: string) {
  console.log(`Exportando tabla: ${tableName}...`);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const records = await (prisma[tableName] as any).findMany({
       orderBy: {
        createdAt: 'desc',
      },
    });
    
    const recordsWithNumbers = convertDecimals(records);
    
    fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(recordsWithNumbers, null, 2));
    console.log(`Tabla ${tableName} exportada exitosamente a ${fileName}`);
  } catch (error) {
    // Check if the error is due to a missing 'createdAt' field
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2009' || error.code === 'P2022' || (error.meta && JSON.stringify(error.meta).includes('createdAt'))) {
       console.log(`La tabla ${tableName} no tiene 'createdAt', intentando sin ordenar...`);
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       const records = await (prisma[tableName] as any).findMany();
       const recordsWithNumbers = convertDecimals(records);
       fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(recordsWithNumbers, null, 2));
       console.log(`Tabla ${tableName} exportada exitosamente (sin ordenar) a ${fileName}`);
    } else {
        console.error(`Error exportando la tabla ${tableName}:`, error);
        throw error;
    }
  }
}

async function main() {
  console.log('Iniciando proceso de exportación de datos...');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Directorio creado: ${outputDir}`);
  }

  try {
    for (const tableName of tablesToExport) {
        // We need to cast tableName to any because of a limitation in Prisma's client type
        if (tableName in prisma) {
             await exportTable(tableName as any, `${String(tableName)}.json`);
        }
    }
    console.log('¡Todos los datos han sido exportados exitosamente!');
  } catch (error) {
    console.error('Ocurrió un error durante la exportación:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Conexión con la base de datos cerrada.');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
