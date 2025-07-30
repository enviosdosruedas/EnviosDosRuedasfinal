// @ts-nocheck
// TODO: Fix typescript errors
'use client';

import { useEffect, useActionState } from 'react'; // Changed import
import { useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// Label is imported via FormLabel
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
// Alert components are not used here, so imports can be removed if they were just for this file.

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido y debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }).max(1000, { message: 'El mensaje no debe exceder los 1000 caracteres.'}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const initialState = {
  message: undefined,
  error: undefined,
  fieldErrors: {},
  formError: undefined,
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Send className="mr-2 h-4 w-4 animate-pulse" />
          Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Enviar Mensaje
        </>
      )}
    </Button>
  );
}

export function ContactSection() {
  const [state, formAction] = useActionState(submitContactForm, initialState); // Changed to useActionState
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    // Pass the server state to react-hook-form to display errors
    errors: state?.fieldErrors ? state.fieldErrors as any : {},
  });

   useEffect(() => {
    if (state?.message) {
      toast({
        title: "Mensaje Enviado",
        description: state.message,
        className: "bg-green-100 border-green-400 text-green-700",
      });
      form.reset(); // Reset form on successful submission
    }
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error al Enviar",
        description: state.error,
      });
    }
    if (state?.formError) {
       toast({
        variant: "destructive",
        title: "Error en el Formulario",
        description: state.formError,
      });
    }
    // Update form errors if they come from server action
    if (state?.fieldErrors) {
      const fieldErrors = state.fieldErrors;
      (Object.keys(fieldErrors) as Array<keyof ContactFormValues>).forEach((key) => {
        form.setError(key, { type: 'server', message: fieldErrors[key]?.join(', ') });
      });
    }

  }, [state, toast, form]);


  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Contáctanos</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Estamos aquí para ayudarte. Envíanos tus preguntas o solicitudes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>Completa el formulario y te responderemos a la brevedad.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form action={formAction} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Escribe tu consulta aquí..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SubmitButton />
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Teléfono</h4>
                    <a href="tel:+525512345678" className="text-muted-foreground hover:text-primary transition-colors">+52 55 1234 5678</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Correo Electrónico</h4>
                    <a href="mailto:matiascejas@enviosdosruedas.com" className="text-muted-foreground hover:text-primary transition-colors">matiascejas@enviosdosruedas.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p className="text-muted-foreground">Av. Siempreviva 742, Col. Springfield, CDMX, México</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.580500834828!2d-99.16000000000001!3d19.430000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8d0e9f9e9f9%3A0x0!2sMonumento%20a%20la%20Revoluci%C3%B3n!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Envios DosRuedas 1806">
                </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
