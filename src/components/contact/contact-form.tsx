// src/components/contact/contact-form.tsx
"use client"

import type React from "react"
import { useActionState, useEffect } from 'react'; // Corrected: useActionState and useEffect from 'react'
import { useFormStatus } from 'react-dom'; // Corrected: useFormStatus from 'react-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, Loader2, User, MailIcon as Mail, Phone, MessageSquare, Briefcase } from "lucide-react" // Aliased MailIcon to Mail
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido y debe tener al menos 2 caracteres.' }),
  lastName: z.string().min(2, { message: 'El apellido es requerido y debe tener al menos 2 caracteres.' }).optional().or(z.literal('')),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  phone: z.string().optional().or(z.literal('')),
  service: z.string().optional(),
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
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-5 w-5" />
          Enviar Mensaje
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
    errors: state?.fieldErrors ? state.fieldErrors as any : {},
  });

   useEffect(() => {
    if (state?.timestamp && state.timestamp > (initialState.timestamp || 0)) { // Check if state is new
        if (state.message) {
          toast({
            title: "Mensaje Enviado",
            description: state.message,
            className: "bg-green-100 border-green-400 text-green-700",
          });
          form.reset(); // Reset form on successful submission
        }
        if (state.error) {
          toast({
            variant: "destructive",
            title: "Error al Enviar",
            description: state.error,
          });
        }
        if (state.formError) {
           toast({
            variant: "destructive",
            title: "Error en el Formulario",
            description: state.formError,
          });
        }
        if (state.fieldErrors) {
          const fieldErrors = state.fieldErrors;
          (Object.keys(fieldErrors) as Array<keyof ContactFormValues>).forEach((key) => {
            if (form.getFieldState(key)) { // Check if field exists in form
                 form.setError(key, { type: 'server', message: fieldErrors[key]?.join(', ') });
            }
          });
        }
    }
  }, [state, toast, form]);

  if (state?.message && state.timestamp > (initialState.timestamp || 0)) {
    return (
       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-2xl mx-auto shadow-lg border-green-300 bg-green-50">
            <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-700 mb-2">¡Mensaje Enviado!</h3>
            <p className="text-green-600">{state.message}</p>
            </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl md:text-3xl font-semibold text-center text-foreground">Envíanos un Mensaje</CardTitle>
        <CardDescription className="text-center text-sm sm:text-base text-muted-foreground">
          Resolveremos tus dudas a la brevedad.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 sm:pt-4">
        <Form {...form}>
            <form action={formAction} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><User className="w-4 h-4 mr-2 text-muted-foreground"/>Nombre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} className="h-11 text-base"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><User className="w-4 h-4 mr-2 text-muted-foreground"/>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu apellido" {...field} className="h-11 text-base"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Mail className="w-4 h-4 mr-2 text-muted-foreground"/>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} className="h-11 text-base"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Phone className="w-4 h-4 mr-2 text-muted-foreground"/>Teléfono (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Ej: 223-000-0000" {...field} className="h-11 text-base"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Briefcase className="w-4 h-4 mr-2 text-muted-foreground"/>Servicio de Interés (Opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 text-base">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="envios-express">Envíos Express</SelectItem>
                      <SelectItem value="envios-lowcost">Envíos LowCost</SelectItem>
                      <SelectItem value="moto-fija">Moto Fija</SelectItem>
                      <SelectItem value="plan-emprendedores">Plan Emprendedores</SelectItem>
                      <SelectItem value="envios-flex">Envíos Flex MercadoLibre</SelectItem>
                      <SelectItem value="otro">Otro / Consulta General</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><MessageSquare className="w-4 h-4 mr-2 text-muted-foreground"/>Mensaje *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cuéntanos sobre tu consulta o necesidad de envío..."
                      rows={5}
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
                <SubmitButton />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
