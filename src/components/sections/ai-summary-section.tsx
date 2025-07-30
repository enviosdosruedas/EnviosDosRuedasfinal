// @ts-nocheck
// TODO: Fix typescript errors
'use client';

import { useEffect, useActionState } from 'react'; // Changed import
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Brain } from 'lucide-react';
import { generateTestimonialSummary } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  summary: undefined,
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
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          Generando...
        </>
      ) : (
        <>
          <Brain className="mr-2 h-4 w-4" />
          Generar Resumen
        </>
      )}
    </Button>
  );
}

export function AiSummarySection() {
  const [state, formAction] = useActionState(generateTestimonialSummary, initialState); // Changed to useActionState
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error en el Resumen",
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
  }, [state, toast]);

  return (
    <section id="ai-summary" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Resumen Inteligente de Testimonios</h2>
          <p className="text-lg text-muted-foreground mt-2">
            ¿Tienes un testimonio largo? Nuestra IA lo resume para ti destacando lo esencial.
          </p>
        </div>
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="h-6 w-6 text-primary"/> Analiza Testimonios con IA</CardTitle>
            <CardDescription>
              Pega un testimonio extenso en el campo de abajo y obtén un resumen conciso.
            </CardDescription>
          </CardHeader>
          <form action={formAction}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="testimonials-input">Testimonio del Cliente</Label>
                <Textarea
                  id="testimonials-input"
                  name="testimonials"
                  placeholder="Escribe o pega aquí el testimonio completo del cliente..."
                  rows={6}
                  className="mt-1"
                  aria-describedby="testimonials-error"
                />
                {state?.fieldErrors?.testimonials && (
                  <p id="testimonials-error" className="text-sm text-destructive mt-1">
                    {state.fieldErrors.testimonials.join(', ')}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4">
              <SubmitButton />
              {state?.summary && (
                <Alert variant="default" className="mt-4 bg-green-50 border-green-300">
                   <Sparkles className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-700 font-semibold">Resumen Generado por IA:</AlertTitle>
                  <AlertDescription className="text-green-600">
                    {state.summary}
                  </AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
}
