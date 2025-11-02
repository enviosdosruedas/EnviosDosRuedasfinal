// prisma/script/subirtodo.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const datosDir = path.join(__dirname, '../datos');

// Función para limpiar una tabla
async function clearTable(tableName: keyof typeof prisma) {
  if (!prisma[tableName] || !(prisma[tableName] as any).deleteMany) {
    console.error(`El modelo ${String(tableName)} no es válido o no tiene el método deleteMany.`);
    return;
  }
  try {
    const result = await (prisma[tableName] as any).deleteMany({});
    console.log(`Tabla ${String(tableName)} limpiada. ${result.count} registros eliminados.`);
  } catch (error) {
    console.error(`Error limpiando la tabla ${String(tableName)}:`, error);
    throw error;
  }
}

// Función para importar datos a una tabla
async function importTable(tableName: keyof typeof prisma, fileName: string) {
  const filePath = path.join(datosDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`Archivo ${fileName} no encontrado. Omitiendo importación para la tabla ${String(tableName)}.`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!Array.isArray(data)) {
    console.error(`El archivo ${fileName} no contiene un array de datos.`);
    return;
  }

  console.log(`Importando ${data.length} registros a la tabla ${String(tableName)}...`);

  // Convertir campos Decimal y DateTime de string a sus tipos correspondientes
  const processedData = data.map(record => {
    const newRecord: { [key: string]: any } = {};
    for (const key in record) {
      const value = record[key];
      // Asumiendo que los campos decimal se guardan como strings y los de fecha también
      if (typeof value === 'string') {
        if (!isNaN(Date.parse(value)) && key.toLowerCase().includes('at')) {
          newRecord[key] = new Date(value);
        } else {
          newRecord[key] = value;
        }
      } else if (typeof value === 'number' && (key.toLowerCase().includes('price') || key.toLowerCase().includes('cost') || key.toLowerCase().includes('distancia'))) {
        newRecord[key] = new Prisma.Decimal(value);
      }
      else {
        newRecord[key] = value;
      }
    }
    return newRecord;
  });

  try {
    // Usamos `createMany` que es más eficiente para inserciones masivas.
    // Asegúrate de que tu proveedor de BD lo soporte (PostgreSQL, MySQL, etc., lo hacen).
    await (prisma[tableName] as any).createMany({
      data: processedData,
      skipDuplicates: true, // Opcional: útil si podrías tener duplicados
    });
    console.log(`Tabla ${String(tableName)} importada exitosamente.`);
  } catch (error) {
    console.error(`Error importando datos a la tabla ${String(tableName)}:`, error);
    throw error;
  }
}

async function main() {
  console.log('Iniciando proceso de importación de datos...');
  try {
    // El orden de limpieza es importante para evitar violaciones de claves foráneas
    // Se limpia desde las tablas que dependen de otras hacia las tablas de las que dependen
    await clearTable('Etiqueta');
    await clearTable('Order');
    await clearTable('SocialPost');
    await clearTable('Client');
    await clearTable('PriceRange');
    await clearTable('Repartidor');

    console.log('\nTodas las tablas han sido limpiadas. Iniciando inserción...\n');

    // El orden de inserción también es importante, inverso al de limpieza
    await importTable('Repartidor', 'repartidor.json');
    await importTable('PriceRange', 'priceRange.json');
    await importTable('Client', 'client.json');
    await importTable('Order', 'order.json');
    await importTable('SocialPost', 'socialPost.json');
    await importTable('Etiqueta', 'etiqueta.json');

    console.log('\nProceso de importación de datos completado exitosamente.');
  } catch (error) {
    console.error('Ocurrió un error durante la importación:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('Conexión con la base de datos cerrada.');
  }
}

main();
