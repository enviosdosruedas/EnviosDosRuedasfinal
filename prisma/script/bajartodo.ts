// prisma/script/bajartodo.ts
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const outputDir = path.join(__dirname, '../datos');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to handle Decimal to number conversion
function replacer(key: string, value: any) {
  if (value instanceof Prisma.Decimal) {
    return value.toNumber();
  }
  return value;
}

// Function to export a single table
async function exportTable(tableName: keyof PrismaClient, fileName: string) {
  console.log(`Exportando tabla: ${tableName}...`);
  try {
    const model = Prisma.dmmf.datamodel.models.find(m => m.name.toLowerCase() === tableName.toLowerCase());
    const hasCreatedAt = model?.fields.some(f => f.name === 'createdAt');

    const findManyArgs: any = {};
    if (hasCreatedAt) {
        findManyArgs.orderBy = { createdAt: 'desc' };
    } else if (model?.fields.some(f => f.name === 'timestamp')) {
        findManyArgs.orderBy = { timestamp: 'desc' };
    }

    const records = await (prisma[tableName] as any).findMany(findManyArgs);
    const jsonContent = JSON.stringify(records, replacer, 2);
    
    fs.writeFileSync(path.join(outputDir, fileName), jsonContent, 'utf-8');
    console.log(`Tabla ${tableName} exportada exitosamente a ${fileName}`);
  } catch (error) {
    console.error(`Error exportando la tabla ${tableName}:`, error);
    throw error; // Re-throw to stop the script
  }
}

async function main() {
  console.log('Iniciando proceso de exportación de datos...');
  const tablesToExport: { name: keyof PrismaClient, file: string }[] = [
    { name: 'socialPost', file: 'socialPost.json' },
    { name: 'client', file: 'client.json' },
    { name: 'order', file: 'order.json' },
    { name: 'repartidor', file: 'repartidor.json' },
    { name: 'priceRange', file: 'priceRange.json' },
    { name: 'etiqueta', file: 'etiqueta.json' },
  ];

  for (const table of tablesToExport) {
    await exportTable(table.name, table.file);
  }

  console.log('¡Todas las tablas han sido exportadas!');
}

main()
  .catch(e => {
    console.error('Ocurrió un error durante la exportación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Conexión con la base de datos cerrada.');
  });
