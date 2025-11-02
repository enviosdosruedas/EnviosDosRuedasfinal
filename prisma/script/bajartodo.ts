// prisma/script/bajartodo.ts
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const outputDir = path.join(__dirname, '../datos');

// Helper para convertir Decimal a number para la serialización JSON
const replacer = (key: string, value: unknown) => {
  if (value instanceof Prisma.Decimal) {
    return value.toNumber();
  }
  return value;
};

async function exportTable(tableName: keyof PrismaClient, fileName: string) {
  console.log(`Exportando tabla: ${tableName}...`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await (prisma[tableName] as any).findMany();
  
  if (data.length > 0) {
    const jsonContent = JSON.stringify(data, replacer, 2);
    fs.writeFileSync(path.join(outputDir, fileName), jsonContent, 'utf8');
    console.log(`-> ¡${data.length} registros de '${tableName}' exportados a ${fileName}!`);
  } else {
    console.log(`-> No hay registros en '${tableName}' para exportar.`);
  }
}

async function main() {
  console.log('Iniciando proceso de exportación de datos...');

  // Asegurarse de que el directorio de datos exista
  if (!fs.existsSync(outputDir)) {
    console.log(`Creando directorio: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Exportar todas las tablas
  await exportTable('socialPost', 'socialposts.json');
  await exportTable('client', 'clients.json');
  await exportTable('order', 'orders.json');
  await exportTable('etiqueta', 'etiquetas.json');
  await exportTable('priceRange', 'priceranges.json');
  await exportTable('repartidor', 'repartidores.json');

  console.log('\n¡Proceso de exportación completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('Ocurrió un error durante la exportación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
