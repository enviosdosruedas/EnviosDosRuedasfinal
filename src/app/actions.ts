// src/app/actions.ts
'use server';

import { z } from 'zod';
import { summarizeTestimonials as summarizeTestimonialsFlow } from '@/ai/flows/summarize-testimonials';

// AI Summary Action
const aiSummarySchema = z.object({
  testimonials: z.string().min(20, { message: 'El testimonio debe tener al menos 20 caracteres.' }).max(5000, { message: 'El testimonio no debe exceder los 5000 caracteres.' }),
});

export interface AISummaryState {
  summary?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof aiSummarySchema>, string[]>>;
  formError?: string;
  timestamp?: number; 
}

export async function generateTestimonialSummary(
  prevState: AISummaryState,
  formData: FormData
): Promise<AISummaryState> {
  const rawText = formData.get('testimonials');
  const validatedFields = aiSummarySchema.safeParse({
    testimonials: rawText,
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      formError: "Por favor corrige los errores en el formulario.",
      timestamp: Date.now(),
    };
  }

  try {
    const result = await summarizeTestimonialsFlow({ testimonials: validatedFields.data.testimonials });
    return { summary: result.summary, timestamp: Date.now() };
  } catch (e: unknown) {
    console.error(e);
    // Check if e is an Error instance and has a message property
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido.';
    return { error: `Error al generar el resumen: ${errorMessage}. Inténtalo de nuevo.`, timestamp: Date.now() };
  }
}

// Contact Form Action
const contactSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido y debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }).max(1000, { message: 'El mensaje no debe exceder los 1000 caracteres.'}),
});

export interface ContactFormState {
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string[]>>;
  formError?: string;
  timestamp?: number;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      formError: "Por favor corrige los errores en el formulario.",
      timestamp: Date.now(),
    };
  }

  // Simulate form submission
  console.log('Contact form submitted:', validatedFields.data);
  // In a real app, you would send an email or save to a database here.
  return { message: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', timestamp: Date.now() };
}
