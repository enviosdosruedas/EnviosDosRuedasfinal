// prisma/script/bajartodo.ts
import { Prisma, PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();
const outputDir = path.join(__dirname, "..", "datos");

// Utility to handle JSON serialization of BigInt and Decimal
function replacer(key: string, value: any): any {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  if (value instanceof Prisma.Decimal) {
    return value.toNumber();
  }
  return value;
}

type ModelName = keyof typeof prisma;

const tablesToExport: ModelName[] = [
  "client",
  "order",
  "priceRange",
  "repartidor",
  "etiqueta",
  "socialPost"
];

const modelHasCreatedAt = (modelName: ModelName): boolean => {
    // A simple way to check if a model has a 'createdAt' field.
    // This could be made more robust with reflection if needed.
    const sampleModel = prisma[modelName];
    if (sampleModel && 'findFirst' in sampleModel) {
        // This is a heuristic. A better approach might involve parsing the DMMF.
        return ['client', 'order', 'etiqueta', 'priceRange', 'repartidor'].includes(modelName as string);
    }
    return false;
}

const modelHasTimestamp = (modelName: ModelName): boolean => {
    return modelName === 'socialPost';
}


async function exportTable(tableName: ModelName) {
  console.log(`Exportando tabla: ${String(tableName)}...`);
  try {
    let records;
    const prismaModel = prisma[tableName] as any;

    if (modelHasCreatedAt(tableName)) {
      records = await prismaModel.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else if (modelHasTimestamp(tableName)) {
        records = await prismaModel.findMany({
            orderBy: {
                timestamp: 'desc',
            },
        });
    } else {
      records = await prismaModel.findMany();
    }
    
    const fileName = `${String(tableName)}.json`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(records, replacer, 2));

    console.log(`Tabla ${String(tableName)} exportada exitosamente a ${fileName}`);
  } catch (error) {
    console.error(`Error exportando la tabla ${String(tableName)}:`, error);
    throw error;
  }
}

async function main() {
  console.log("Iniciando proceso de exportación de datos...");

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    for (const tableName of tablesToExport) {
        // We ensure that we only process valid model names from our list
        if (typeof tableName === 'string' && tableName in prisma) {
             await exportTable(tableName);
        }
    }
  } catch (error) {
    console.error("Ocurrió un error durante la exportación:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("Conexión con la base de datos cerrada.");
  }
}

main();
