// prisma/script/bajartodo.ts
import { PrismaClient, type Prisma } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const outputDir = path.join(__dirname, "..", "datos");

// Helper para convertir Decimal a String y manejar otros tipos
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function replacer(key: string, value: any) {
  if (value instanceof Date) {
    return value.toISOString();
  }
   if (typeof value === 'object' && value !== null && value.constructor && value.constructor.name === 'Decimal') {
    return value.toString();
  }
  return value;
}


type ModelName = keyof typeof Prisma.ModelName;

const tablesToExport: ModelName[] = [
  "client",
  "order",
  // "etiqueta", // Omitida temporalmente por error P2032
  // "priceRange", // Omitida por error de createdAt
  "repartidor",
];


async function exportTable(tableName: ModelName) {
  console.log(`Exportando tabla: ${tableName}...`);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const records = await (prisma[tableName] as any).findMany({
       orderBy: {
        id: 'asc', 
      },
    });

    const jsonContent = JSON.stringify(records, replacer, 2);
    const fileName = `${tableName}.json`;
    fs.writeFileSync(path.join(outputDir, fileName), jsonContent);
    console.log(`Tabla ${tableName} exportada exitosamente a ${fileName}`);
  } catch (error) {
    console.error(`Error exportando la tabla ${tableName}:`, error);
    throw error;
  }
}

async function main() {
  try {
    console.log("Iniciando proceso de exportación de datos...");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`Directorio de salida creado: ${outputDir}`);
    }

    for (const tableName of tablesToExport) {
      await exportTable(tableName);
    }

    console.log("¡Exportación de todas las tablas completada exitosamente!");
  } catch (error) {
    console.error("Ocurrió un error durante la exportación:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("Conexión con la base de datos cerrada.");
  }
}

main();
