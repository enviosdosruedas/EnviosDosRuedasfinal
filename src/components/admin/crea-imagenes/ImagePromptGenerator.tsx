// src/components/admin/crea-imagenes/ImagePromptGenerator.tsx
'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { generateImagePromptAction } from '@/app/admin/crea-imagenes/actions';
import type { GenerateImagePromptState } from '@/app/admin/crea-imagenes/actions';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, Sparkles, Copy, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const services = [
    'General',
    'Envios Express',
    'Envios LowCost',
    'Envios Flex',
    'Plan Emprendedores',
    'Moto Fija',
    'Preguntas Frecuentes (FAQ)',
    'Contacto',
    'Sobre Nosotros',
];

const sections = ['Hero', 'Card', 'Banner', 'General', 'Ilustración'];
const aspectRatios = ['16:9 (Panorámica)', '1:1 (Cuadrada)', '9:16 (Vertical)'];
const styles = ['Fotografía Realista', 'Ilustración Digital', 'Arte 3D', 'Estilo Cinematográfico', 'Minimalista'];

const promptGeneratorSchema = z.object({
  sectionType: z.string().min(1, 'El tipo de sección es requerido.'),
  service: z.string().min(1, 'El servicio es requerido.'),
  aspectRatio: z.string().min(1, 'La relación de aspecto es requerida.'),
  style: z.string().min(1, 'El estilo es requerido.'),
  background: z.string().optional(),
  details: z.string().optional(),
});

type PromptGeneratorFormValues = z.infer<typeof promptGeneratorSchema>;

const initialState: GenerateImagePromptState = {};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      {isPending ? 'Generando Prompt...' : 'Generar Prompt'}
    </Button>
  );
}

export function ImagePromptGenerator() {
  const [state, formAction] = useActionState(generateImagePromptAction, initialState);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<PromptGeneratorFormValues>({
    resolver: zodResolver(promptGeneratorSchema),
    defaultValues: {
      sectionType: '',
      service: '',
      aspectRatio: '16:9 (Panorámica)',
      style: 'Fotografía Realista',
      background: '',
      details: '',
    },
  });

  useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error al Generar',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || '');
    });
    startTransition(() => {
      formAction(formData);
    });
  });

  const handleCopy = () => {
    if (state.prompt) {
      navigator.clipboard.writeText(state.prompt);
      setCopied(true);
      toast({ title: 'Copiado', description: 'El prompt se ha copiado al portapapeles.' });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <Form {...form}>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="sectionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Sección / Elemento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una sección..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sections.map(section => (
                        <SelectItem key={section} value={section}>{section}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Página / Servicio Asociado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="aspectRatio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relación de Aspecto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {aspectRatios.map(ratio => <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estilo Visual</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {styles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="md:col-span-2">
                <FormField
                control={form.control}
                name="background"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Detalles del Fondo (Opcional)</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: 'fondo de playa difuminado', 'interior de un taller moderno'" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalles Adicionales de Contenido (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: 'mostrar un repartidor sonriendo', 'escena nocturna', 'cliente recibiendo el paquete feliz'"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Añade cualquier detalle específico sobre la acción o los sujetos en la imagen.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6">
            <SubmitButton isPending={isPending} />
            {state.prompt && (
              <Alert className="bg-blue-50 border-blue-200">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800 font-semibold">Prompt Generado</AlertTitle>
                <AlertDescription className="text-blue-700 whitespace-pre-wrap font-mono text-sm relative pr-10">
                  {state.prompt}
                   <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 h-8 w-8 text-blue-600 hover:bg-blue-100"
                      onClick={handleCopy}
                      type="button"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
