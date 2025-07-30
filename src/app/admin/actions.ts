// src/app/admin/actions.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Prisma, SocialPlatformEnum } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// A flexible schema for image URLs, allowing local paths or full URLs
const imageUrlSchema = z.string().refine(val => val === '' || val.startsWith('/') || z.string().url().safeParse(val).success, {
    message: "Debe ser una URL de imagen válida o una ruta local (ej. /redes/foto.png)."
});

const addPostSchema = z.object({
  platform: z.nativeEnum(SocialPlatformEnum),
  content: z.string().min(10, { message: 'El contenido debe tener al menos 10 caracteres.' }),
  postUrl: z.string().url({ message: "Por favor, introduce una URL de publicación válida." }),
  imageUrl: imageUrlSchema.optional().or(z.literal('')),
  imageHint: z.string().optional(),
  likes: z.coerce.number().int().min(0).optional(),
  comments: z.coerce.number().int().min(0).optional(),
  shares: z.coerce.number().int().min(0).optional(),
});

export interface SocialPostState {
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof addPostSchema>, string[]>>;
}

export async function addSocialPost(
  prevState: SocialPostState,
  formData: FormData
): Promise<SocialPostState> {
    const rawData = {
        platform: formData.get('platform'),
        content: formData.get('content'),
        postUrl: formData.get('postUrl'),
        imageUrl: formData.get('imageUrl'),
        imageHint: formData.get('imageHint'),
        likes: formData.get('likes'),
        comments: formData.get('comments'),
        shares: formData.get('shares'),
    };

  const validatedFields = addPostSchema.safeParse({
        ...rawData,
        // Treat empty strings from form as undefined for optional number fields
        likes: rawData.likes === '' || rawData.likes === null ? undefined : rawData.likes,
        comments: rawData.comments === '' || rawData.comments === null ? undefined : rawData.comments,
        shares: rawData.shares === '' || rawData.shares === null ? undefined : rawData.shares,
  });

  if (!validatedFields.success) {
    return {
      error: 'Por favor, corrige los errores en el formulario.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const platformUserUrls = {
    [SocialPlatformEnum.facebook]: "https://facebook.com/enviosdosruedas",
    [SocialPlatformEnum.instagram]: "https://instagram.com/enviosdosruedas",
    [SocialPlatformEnum.whatsapp]: null,
  };

  const userUrl = platformUserUrls[validatedFields.data.platform];

  try {
    await prisma.socialPost.create({
      data: {
        platform: validatedFields.data.platform,
        userName: 'Envios DosRuedas', // Hardcoded for now
        userAvatar: '/LogoEnviosDosRuedas.webp', // Hardcoded for now
        userUrl: userUrl,
        content: validatedFields.data.content,
        postUrl: validatedFields.data.postUrl,
        imageUrl: validatedFields.data.imageUrl || null,
        imageHint: validatedFields.data.imageHint || null,
        likes: validatedFields.data.likes,
        comments: validatedFields.data.comments,
        shares: validatedFields.data.shares,
        timestamp: new Date(),
      },
    });

    // Revalidate the path to show the new post
    revalidatePath('/nosotros/nuestras-redes');

    return {
      message: '¡Publicación agregada exitosamente!',
    };
  } catch (e) {
    console.error(e);
     if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 is the unique constraint violation code
      if (e.code === 'P2002') {
        return {
          error: 'Error: Ya existe una publicación con esta URL.',
          fieldErrors: { postUrl: ['Esta URL ya ha sido registrada.'] },
        };
      }
    }
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido al guardar.';
    return {
      error: `Hubo un error al guardar la publicación en la base de datos: ${errorMessage}`,
    };
  }
}
