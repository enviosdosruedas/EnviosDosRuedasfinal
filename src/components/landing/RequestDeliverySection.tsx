"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  pickupAddress: z.string().min(10, { message: "La dirección de recogida es muy corta." }),
  deliveryAddress: z.string().min(10, { message: "La dirección de entrega es muy corta." }),
  specialInstructions: z.string().optional(),
});

export function RequestDeliverySection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "",
      deliveryAddress: "",
      specialInstructions: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Solicitud Enviada",
      description: "Hemos recibido tu solicitud de entrega. Nos pondremos en contacto pronto.",
    });
    form.reset();
  }

  return (
    <section id="solicitar" className="py-20 md:py-28">
      <div className="container">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tighter font-headline">Envía tu Solicitud de Entrega</CardTitle>
            <CardDescription>
              Completa el formulario y uno de nuestros agentes se pondrá en contacto contigo para coordinar el envío.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección de Recogida</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Calle Falsa 123, Springfield" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección de Entrega</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Av. Siempreviva 742, Springfield" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrucciones Especiales (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ej: Entregar en recepción, paquete frágil, etc."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                  Enviar Solicitud
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
