/**
 * @fileoverview Script para poblar la base de datos con datos de archivos JSON.
 *
 * Este script lee todos los modelos definidos en `prisma/schema.prisma`, busca
 * un archivo JSON correspondiente para cada modelo en el directorio `prisma/datos`,
 * y luego inserta los datos en la base de datos.
 *
 * Características:
 * - Detección automática de todos los modelos de Prisma.
 * - Carga de datos desde archivos JSON individuales (ej. `Client.json`, `Order.json`).
 * - Utiliza `createMany` con `skipDuplicates` para una inserción masiva y segura.
 * - Manejo automático de la conversión de fechas en formato ISO a objetos `Date`.
 * - Proporciona retroalimentación detallada en la consola sobre el progreso.
 *
 * Para ejecutar este script:
 * bunx tsx prisma/script/subirtodo.ts
 */
'use strict';

import { Prisma, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Función para transformar los valores antes de la inserción.
// Convierte strings en formato ISO 8601 a objetos Date.
function reviveDates(key: string, value: any): any {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  if (typeof value === 'string' && isoDateRegex.test(value)) {
    return new Date(value);
  }
  return value;
}

/**
 * Carga los datos de un modelo específico a la base de datos.
 * @param {string} modelName - El nombre del modelo en Prisma (ej. "Client").
 */
async function seedModel(modelName: Prisma.ModelName) {
  const model = (prisma as any)[modelName.charAt(0).toLowerCase() + modelName.slice(1)];
  const filePath = path.join(__dirname, '..', 'datos', `${modelName}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`🟡 No se encontró el archivo para el modelo ${modelName}. Omitiendo.`);
    return;
  }

  console.log(`⏳ Iniciando carga para el modelo: ${modelName}...`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // Usamos JSON.parse con la función 'reviver' para convertir fechas
    const data = JSON.parse(fileContent, reviveDates);

    if (!Array.isArray(data) || data.length === 0) {
      console.log(`⚪️ No hay datos en el archivo para ${modelName}. Omitiendo.`);
      return;
    }

    const result = await model.createMany({
      data,
      skipDuplicates: true,
    });
    
    console.log(`✅ ${result.count} registros nuevos agregados a ${modelName}.`);

  } catch (error) {
    console.error(`❌ Error cargando el modelo ${modelName}:`, error);
    // Continuar con el siguiente modelo aunque uno falle
  }
}

/**
 * Función principal que orquesta el proceso de carga de datos.
 */
async function main() {
  console.log('🚀 Iniciando el script de carga de datos...');
  
  // 1. Obtener todos los nombres de los modelos del esquema de Prisma
  const modelNames = Object.values(Prisma.ModelName);

  console.log(`🔍 Modelos encontrados: ${modelNames.join(', ')}`);

  // 2. Cargar datos para cada modelo secuencialmente
  for (const modelName of modelNames) {
    await seedModel(modelName);
  }

  console.log('\n🎉 ¡Proceso de carga de datos completado!');
}

main()
  .catch((error) => {
    console.error('\n🔥 Ha ocurrido un error inesperado durante el proceso de carga:', error);
    process.exit(1);
  })
  .finally(async () => {
    // 3. Desconectar Prisma Client
    await prisma.$disconnect();
    console.log('🚪 Desconectado de la base de datos.');
  });
