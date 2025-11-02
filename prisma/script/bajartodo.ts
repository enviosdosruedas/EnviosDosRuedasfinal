// prisma/script/bajartodo.ts
import { PrismaClient, type Prisma } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const outputDir = path.join(__dirname, "../datos");

// Define un mapeador de tipos para convertir Decimal a string
const replacer = (key: string, value: unknown) => {
  if (typeof value === 'object' && value !== null && 'constructor' in value && (value.constructor as any).name === 'Decimal') {
    return (value as any).toString();
  }
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

type ModelName = Exclude<keyof Prisma.TypeMap['model'], '$transaction' | '$queryRaw' | '$executeRaw' | '$queryRawUnsafe' | '$executeRawUnsafe'>;

async function exportTable(tableName: ModelName, fileName: string) {
  console.log(`Exportando tabla: ${tableName}...`);
  try {
    let records;
    const model = prisma[tableName] as any;

    if (tableName === 'repartidor') {
        // Excluir el campo `password` para los repartidores
        records = await model.findMany({
            select: {
                id: true,
                name: true,
                lastName: true,
                phone: true,
                email: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    } else {
        records = await model.findMany();
    }
    
    const jsonContent = JSON.stringify(records, replacer, 2);
    fs.writeFileSync(path.join(outputDir, fileName), jsonContent);
    console.log(`Tabla ${tableName} exportada exitosamente a ${fileName}`);
  } catch (error) {
    console.error(`Error exportando la tabla ${tableName}:`, error);
    throw error;
  }
}

async function main() {
  console.log("Iniciando proceso de exportación de datos...");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tablesToExport: ModelName[] = [
    "client",
    "order",
    "priceRange",
    "repartidor",
  ];

  for (const tableName of tablesToExport) {
    await exportTable(tableName, `${tableName}.json`);
  }

  console.log("Proceso de exportación finalizado.");
}

main()
  .catch((e) => {
    console.error("Ocurrió un error durante la exportación:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Conexión con la base de datos cerrada.");
  });
