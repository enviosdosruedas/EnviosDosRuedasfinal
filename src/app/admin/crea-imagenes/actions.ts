// src/app/admin/crea-imagenes/actions.ts
'use server';

import { z } from 'zod';
import { generateImagePrompt } from '@/ai/flows/generate-image-prompt';
import type { GenerateImagePromptInput } from '@/ai/flows/generate-image-prompt';

const generateImagePromptSchema = z.object({
  sectionType: z.string().min(1, 'El tipo de sección es requerido.'),
  service: z.string().min(1, 'El servicio es requerido.'),
  details: z.string().optional(),
});

export interface GenerateImagePromptState {
  prompt?: string;
  error?: string;
}

export async function generateImagePromptAction(
  prevState: GenerateImagePromptState,
  formData: FormData
): Promise<GenerateImagePromptState> {
  const validatedFields = generateImagePromptSchema.safeParse({
    sectionType: formData.get('sectionType'),
    service: formData.get('service'),
    details: formData.get('details'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Por favor, completa todos los campos requeridos.',
    };
  }

  try {
    const input: GenerateImagePromptInput = {
      sectionType: validatedFields.data.sectionType,
      serviceName: validatedFields.data.service,
      additionalDetails: validatedFields.data.details || '',
    };
    
    const result = await generateImagePrompt(input);
    
    return { prompt: result.prompt };
  } catch (e: unknown) {
    console.error("Error generating image prompt:", e);
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido.';
    return {
      error: `Hubo un error al generar el prompt: ${errorMessage}`,
    };
  }
}
