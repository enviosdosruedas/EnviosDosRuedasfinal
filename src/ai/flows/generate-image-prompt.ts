// src/ai/flows/generate-image-prompt.ts
'use server';
/**
 * @fileOverview Flow para generar prompts detallados para modelos de generación de imágenes.
 *
 * - generateImagePrompt - Genera un prompt para un modelo de imagen.
 * - GenerateImagePromptInput - El tipo de entrada para la función.
 * - GenerateImagePromptOutput - El tipo de salida de la función.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImagePromptInputSchema = z.object({
  sectionType: z.string().describe("El tipo de sección de la página donde se usará la imagen (ej: Hero, Card, Banner)."),
  serviceName: z.string().describe("El nombre del servicio para el cual es la imagen (ej: Envíos Express, Plan Emprendedores)."),
  additionalDetails: z.string().optional().describe("Detalles adicionales o requerimientos específicos del usuario para la imagen."),
});
export type GenerateImagePromptInput = z.infer<typeof GenerateImagePromptInputSchema>;

const GenerateImagePromptOutputSchema = z.object({
  prompt: z.string().describe("El prompt detallado y optimizado para ser usado en un modelo de generación de imágenes como Imagen o Nano Banana."),
});
export type GenerateImagePromptOutput = z.infer<typeof GenerateImagePromptOutputSchema>;

export async function generateImagePrompt(input: GenerateImagePromptInput): Promise<GenerateImagePromptOutput> {
  return generateImagePromptFlow(input);
}

const promptTemplate = ai.definePrompt({
  name: 'generateImagePromptTemplate',
  input: { schema: GenerateImagePromptInputSchema },
  output: { schema: GenerateImagePromptOutputSchema },
  prompt: `
    Tu tarea es actuar como un experto en "prompt engineering" para modelos de generación de imágenes de Google (como Imagen 4 y Nano Banana).
    Debes crear un prompt detallado y efectivo en inglés, basado en la información proporcionada.

    **Contexto del Proyecto:**
    - Empresa: Envios DosRuedas, una empresa de mensajería y delivery en Mar del Plata, Argentina.
    - Paleta de colores principal: Azul primario (similar a #3B82F6) y Amarillo secundario (similar a #FBBF24). Estos colores deben ser prominentes y representar la marca.
    - Tipografía para títulos (si se solicita texto): "Orbitron", una fuente moderna y tecnológica.
    - Tipografía para texto secundario (si se solicita texto): "Roboto", una fuente sans-serif limpia y legible.
    - Tono general: Profesional, confiable, moderno y amigable.

    **Instrucciones para la generación del prompt:**
    1.  **Idioma:** El prompt final DEBE estar en inglés.
    2.  **Estructura:** Comienza con una descripción clara de la escena, seguida de detalles de estilo, iluminación y composición.
    3.  **Integración de Marca:** Incorpora la paleta de colores (azul y amarillo) de forma natural en la escena (uniformes, vehículos, paquetes, etc.).
    4.  **Concepto Central:** El prompt debe reflejar el concepto del servicio y el tipo de sección.
        -   **Servicio:** "{{serviceName}}". Adapta la atmósfera a este servicio (ej: 'Envíos Express' debe ser dinámico y rápido; 'Envíos Low Cost' debe ser planificado y económico; 'Moto Fija' debe ser profesional y colaborativo).
        -   **Sección:** "{{sectionType}}". Ajusta la composición (ej: un 'Hero' debe ser panorámico e impactante; una 'Card' debe ser más enfocada y simple; un 'Banner' debe ser alargado).
    5.  **Detalles Adicionales:** Incorpora los siguientes detalles del usuario: "{{additionalDetails}}".
    6.  **Inclusión de Texto (si se solicita):** Si el usuario pide agregar texto, especifica claramente el texto a incluir, su ubicación, y que debe usar las tipografías del proyecto ("Orbitron" para títulos, "Roboto" para texto secundario).
    7.  **Estilo y Calidad:** Añade palabras clave que mejoren la calidad de la imagen, como "cinematic lighting", "sharp focus", "dynamic composition", "hyper-realistic", "shot on DSLR", "8k".

    **Ejemplo de cómo pensarías:**
    Si el servicio es 'Envíos Express' y la sección es 'Hero', pensarías en una escena de acción. El repartidor en una moto moderna, desenfoque de movimiento, en una calle que recuerde a Mar del Plata. Colores azul y amarillo en su equipo. El prompt podría ser: "Dynamic action shot of a courier on a modern scooter, speeding through a bustling city street in Mar del Plata, Argentina. The rider wears a sleek blue helmet and a bright yellow delivery backpack. Motion blur effect on the background to convey speed and urgency. Cinematic lighting, sharp focus on the rider, sunny day, 8k, hyper-realistic photography."

    Ahora, genera el prompt para la siguiente solicitud:
    - Servicio: {{serviceName}}
    - Tipo de Sección: {{sectionType}}
    - Detalles Adicionales: {{additionalDetails}}
  `,
});

const generateImagePromptFlow = ai.defineFlow(
  {
    name: 'generateImagePromptFlow',
    inputSchema: GenerateImagePromptInputSchema,
    outputSchema: GenerateImagePromptOutputSchema,
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    return output!;
  }
);
