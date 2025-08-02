"use client";

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle, Loader2, User, Mail, Phone, MessageSquare, Briefcase, MapPin, Clock } from "lucide-react";
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { ContactMap } from "@/components/contact/contact-map";

// Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});
type ContactFormValues = z.infer<typeof contactFormSchema>;

// Server Action Initial State
const initialState = {
  message: undefined,
  error: undefined,
  fieldErrors: {},
};

// Submit Button Component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full text-lg py-6">
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
      {pending ? "Enviando..." : "Enviar Mensaje"}
    </Button>
  );
}

export function ContactPageClient() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', service: '', message: '' },
    errors: state?.fieldErrors ? state.fieldErrors as any : {},
  });

  useEffect(() => {
    if (state?.message) {
      toast({ title: "¡Mensaje Enviado!", description: state.message });
      form.reset();
    }
    if (state?.error) {
      toast({ variant: "destructive", title: "Error", description: state.error });
    }
  }, [state, toast, form]);

  const contactInfo = [
    { icon: Phone, text: "223-660-2699", href: "tel:2236602699" },
    { icon: Mail, text: "matiascejas@enviosdosruedas.com", href: "mailto:matiascejas@enviosdosruedas.com" },
    { icon: MapPin, text: "Mar del Plata, Buenos Aires", href: "#" },
  ];

  const businessHours = [
    { day: "Lunes a Viernes", hours: "9:00 - 18:00" },
    { day: "Sábados", hours: "10:00 - 15:00" },
  ];

  if (state?.message) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary mb-2">¡Mensaje Enviado!</h2>
          <p className="text-lg text-muted-foreground">{state.message}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white font-heading mb-4">Hablemos.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos acá para ayudarte con tus envíos. Elegí tu forma de contacto preferida o dejanos un mensaje.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Info */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Contact Details */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-primary dark:text-white mb-6">Información de Contacto</h3>
              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <a key={index} href={item.href} className="flex items-center gap-4 group text-lg">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">{item.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-primary dark:text-white mb-6 flex items-center gap-3">
                <Clock className="w-7 h-7" />
                Horarios de Atención
              </h3>
              <div className="space-y-3">
                {businessHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-lg border-b border-gray-100 dark:border-slate-700 pb-2 last:border-none">
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-medium text-primary dark:text-white">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <Form {...form}>
              <form action={formAction} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo *</FormLabel>
                    <FormControl><Input placeholder="Tu nombre y apellido" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl><Input type="email" placeholder="tu@email.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="service" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servicio de Interés</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Seleccioná un servicio" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="envios-express">Envíos Express</SelectItem>
                        <SelectItem value="envios-lowcost">Envíos Low Cost</SelectItem>
                        <SelectItem value="otro">Otro / Consulta General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje *</FormLabel>
                    <FormControl><Textarea placeholder="Escribí tu consulta acá..." rows={5} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <SubmitButton />
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
