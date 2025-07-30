// src/components/admin/AddPostForm.tsx
"use client";

import { useActionState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SocialPlatformEnum } from '@prisma/client';

import { addSocialPost } from '@/app/admin/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PlusCircle } from 'lucide-react';
import type { SocialPostState } from '@/app/admin/actions';

// A flexible schema for image URLs, allowing local paths or full URLs
const imageUrlSchema = z.string().refine(val => val === '' || val.startsWith('/') || z.string().url().safeParse(val).success, {
    message: "Debe ser una URL de imagen válida o una ruta local (ej. /redes/foto.png)."
});

const addPostSchema = z.object({
  platform: z.nativeEnum(SocialPlatformEnum, { required_error: 'La plataforma es requerida.' }),
  content: z.string().min(10, { message: 'El contenido debe tener al menos 10 caracteres.' }),
  postUrl: z.string().url({ message: "Por favor, introduce una URL de publicación válida." }),
  imageUrl: imageUrlSchema.optional().or(z.literal('')),
  imageHint: z.string().optional(),
  likes: z.coerce.number().int().min(0).optional(),
  comments: z.coerce.number().int().min(0).optional(),
  shares: z.coerce.number().int().min(0).optional(),
});

type AddPostFormValues = z.infer<typeof addPostSchema>;

const initialState: SocialPostState = {
  message: undefined,
  error: undefined,
  fieldErrors: {},
};

function SubmitButton({ isPending }: { isPending: boolean }) {
    return (
        <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {isPending ? 'Agregando Publicación...' : 'Agregar Publicación'}
        </Button>
    )
}

export function AddPostForm() {
  const [state, formAction] = useActionState(addSocialPost, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<AddPostFormValues>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      platform: SocialPlatformEnum.instagram,
      content: '',
      postUrl: '',
      imageUrl: '',
      imageHint: '',
      likes: 0,
      comments: 0,
      shares: 0,
    },
  });

  const { setError, reset } = form;

  useEffect(() => {
    if (state?.message) {
      toast({
        title: 'Éxito',
        description: state.message,
        variant: 'default',
        className: 'bg-green-100 border-green-400 text-green-700',
      });
      reset();
    }
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
     if (state?.fieldErrors) {
        for (const [fieldName, errors] of Object.entries(state.fieldErrors)) {
          if (errors) {
            setError(fieldName as keyof AddPostFormValues, {
              type: 'server',
              message: errors.join(', '),
            });
          }
        }
      }
  }, [state, toast, setError, reset]);
  
  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
          formData.append(key, String(value));
      }
    });

    startTransition(() => {
        formAction(formData);
    });
  });

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Detalles de la Publicación</CardTitle>
        <CardDescription>Completa el formulario para agregar una nueva publicación al feed de redes sociales.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plataforma</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una plataforma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={SocialPlatformEnum.instagram}>Instagram</SelectItem>
                      <SelectItem value={SocialPlatformEnum.facebook}>Facebook</SelectItem>
                      <SelectItem value={SocialPlatformEnum.whatsapp}>WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido del Post</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Escribe el contenido de la publicación aquí..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Publicación</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/p/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruta o URL de la Imagen (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: /redes/mi-foto.png o https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Para usar una imagen de tu proyecto, ingresa la ruta desde la carpeta `public`.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="likes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Likes (Opcional)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : +e.target.value)} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentarios (Opcional)</FormLabel>
                    <FormControl>
                       <Input type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : +e.target.value)} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shares"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compartidos (Opcional)</FormLabel>
                    <FormControl>
                       <Input type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : +e.target.value)} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton isPending={isPending} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
