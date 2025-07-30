/**
 * @fileoverview Script para poblar la base de datos con datos iniciales desde un archivo JSON.
 *
 * Este script lee datos de `prisma/datos/datosparasubir.json` y los inserta en la base de datos
 * utilizando Prisma Client. Está diseñado para ser robusto, manejando cada conjunto de datos
 * en una transacción separada para garantizar la integridad de los datos.
 *
 * Características:
 * - Carga datos para los modelos: PriceRange, Repartidor, Client, Order, y SocialPost.
 * - Utiliza `createMany` para una inserción masiva eficiente, omitiendo duplicados.
 * - Proporciona retroalimentación detallada en la consola sobre el progreso.
 * - Manejo de errores para la lectura de archivos y operaciones de base de datos.
 * - Función principal asíncrona para orquestar la carga de datos.
 * - Se desconecta de la base de datos al finalizar, ya sea con éxito o con errores.
 *
 * Para ejecutar este script:
 * npx tsx prisma/script/subirtodo.ts
 */
'use strict';

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

/**
 * Interfaz que define la estructura del archivo JSON de datos.
 */
interface ISeedData {
  priceRanges: any[];
  repartidores: any[];
  clients: any[];
  orders: any[];
  socialPosts: any[];
}

/**
 * Carga los datos de un modelo específico a la base de datos.
 * Utiliza una transacción para asegurar la atomicidad de la operación.
 * @template T
 * @param {string} modelName - El nombre del modelo en Prisma (ej. "priceRange").
 * @param {T[]} data - El array de datos a cargar.
 */
async function seedModel<T>(modelName: keyof PrismaClient, data: T[]) {
  const model = prisma[modelName] as any;
  if (!data || data.length === 0) {
    console.log(`🟡 No hay datos para el modelo ${modelName}, omitiendo.`);
    return;
  }

  console.log(`⏳ Iniciando carga para el modelo: ${modelName}...`);
  
  try {
    // Usamos createMany para una inserción masiva más eficiente.
    // skipDuplicates evita errores si intentamos insertar registros que ya existen.
    const result = await model.createMany({
      data,
      skipDuplicates: true,
    });
    
    console.log(`✅ ${result.count} registros nuevos agregados a ${modelName}.`);
  } catch (error) {
    console.error(`❌ Error cargando el modelo ${modelName}:`, error);
    throw error; // Relanzamos el error para que la función principal lo capture.
  }
}

/**
 * Función principal que orquesta el proceso de carga de datos.
 */
async function main() {
  console.log('🚀 Iniciando el script de carga de datos...');

  try {
    // 1. Leer y parsear el archivo JSON
    const jsonPath = path.join(__dirname, '..', 'datos', 'datosparasubir.json');
    console.log(`📄 Leyendo datos desde: ${jsonPath}`);
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const { 
      priceRanges, 
      repartidores, 
      clients, 
      orders, 
      socialPosts 
    }: ISeedData = JSON.parse(jsonData);

    // Convertir campos de fecha de string a objeto Date
    const parseDates = (items: any[], dateFields: string[]) => {
      return items.map(item => {
        const newItem = { ...item };
        for (const field of dateFields) {
          if (newItem[field]) {
            newItem[field] = new Date(newItem[field]);
          }
        }
        return newItem;
      });
    };

    const datedPriceRanges = parseDates(priceRanges, ['createdAt', 'updatedAt']);
    const datedRepartidores = parseDates(repartidores, ['createdAt', 'updatedAt']);
    const datedClients = parseDates(clients, ['createdAt', 'updatedAt']);
    const datedOrders = parseDates(orders, ['pickupDate', 'pickupDateTime', 'deliveryDate', 'deliveryDateTime', 'createdAt', 'updatedAt']);
    const datedSocialPosts = parseDates(socialPosts, ['timestamp', 'createdAt', 'updatedAt']);

    // 2. Cargar datos para cada modelo secuencialmente
    await seedModel('priceRange', datedPriceRanges);
    await seedModel('repartidor', datedRepartidores);
    await seedModel('client', datedClients);
    await seedModel('order', datedOrders);
    await seedModel('socialPost', datedSocialPosts);

    console.log('\n🎉 ¡Todos los datos han sido cargados exitosamente!');

  } catch (error) {
    console.error('\n🔥 Ha ocurrido un error durante el proceso de carga:', error);
    process.exit(1);
  } finally {
    // 3. Desconectar Prisma Client
    await prisma.$disconnect();
    console.log('🚪 Desconectado de la base de datos.');
  }
}

// Ejecutar la función principal
main();
