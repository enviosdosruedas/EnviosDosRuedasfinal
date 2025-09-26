/**
 * @fileoverview Script para descargar todas las tablas de la base de datos a archivos JSON.
 *
 * Este script se conecta a la base de datos a través de Prisma Client,
 * lee todos los modelos definidos en el esquema y exporta los datos de cada
 * tabla a un archivo JSON individual en el directorio `prisma/datos`.
 *
 * Características:
 * - Detección automática de todos los modelos de Prisma.
 * - Creación del directorio de salida si no existe.
 * - Manejo de tipos de datos complejos como `Decimal` y `Date`, convirtiéndolos a strings.
 * - Notificaciones en consola sobre el progreso y el resultado de la operación.
 *
 * Para ejecutar este script:
 * bunx tsx prisma/script/bajartodo.ts
 */
'use strict';

import { Prisma, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Función para convertir valores que no son serializables a JSON directamente.
function jsonReplacer(key: string, value: any): any {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  // Prisma Decimal.js objects
  if (value && typeof value === 'object' && value.constructor && value.constructor.name === 'Decimal') {
    return value.toString();
  }
  return value;
}


async function main() {
  console.log('🚀 Iniciando la descarga de todas las tablas...');
  
  // 1. Definir el directorio de salida
  const datosDir = path.join(__dirname, '..', 'datos');
  
  // 2. Asegurarse de que el directorio de datos exista
  if (!fs.existsSync(datosDir)) {
    console.log(`📂 Creando directorio en: ${datosDir}`);
    fs.mkdirSync(datosDir, { recursive: true });
  }

  // 3. Obtener todos los nombres de los modelos del esquema de Prisma
  const modelNames = Object.keys(Prisma.ModelName);

  console.log(`🔍 Modelos encontrados: ${modelNames.join(', ')}`);

  // 4. Iterar sobre cada modelo y descargar sus datos
  for (const modelName of modelNames) {
    console.log(`⏳ Descargando tabla: ${modelName}...`);
    try {
      // Acceder al modelo de forma dinámica
      const model = (prisma as any)[modelName.charAt(0).toLowerCase() + modelName.slice(1)];
      
      if (!model || typeof model.findMany !== 'function') {
        console.warn(`🟡 No se pudo encontrar el método 'findMany' para el modelo ${modelName}. Omitiendo.`);
        continue;
      }
      
      const records = await model.findMany();
      
      if (records.length === 0) {
        console.log(`⚪️ No hay registros en la tabla ${modelName}. No se generará archivo.`);
        continue;
      }

      // Convertir a JSON manejando tipos especiales
      const jsonContent = JSON.stringify(records, jsonReplacer, 2);
      
      // Definir la ruta del archivo de salida
      const filePath = path.join(datosDir, `${modelName}.json`);
      
      // Escribir el archivo JSON
      fs.writeFileSync(filePath, jsonContent);
      
      console.log(`✅ Tabla ${modelName} descargada exitosamente en ${filePath} (${records.length} registros).`);

    } catch (error) {
      console.error(`❌ Error al descargar la tabla ${modelName}:`, error);
    }
  }

  console.log('\n🎉 ¡Proceso de descarga completado!');
}

main()
  .catch((e) => {
    console.error('🔥 Ha ocurrido un error inesperado en el script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🚪 Desconectado de la base de datos.');
  });
