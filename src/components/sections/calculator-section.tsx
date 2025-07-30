'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, DollarSign } from 'lucide-react';

export function CalculatorSection() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateCost = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setEstimatedCost(null);

    const numWeight = parseFloat(weight);
    const numLength = parseFloat(length);
    const numWidth = parseFloat(width);
    const numHeight = parseFloat(height);

    if (isNaN(numWeight) || numWeight <= 0 ||
        (length && (isNaN(numLength) || numLength <= 0)) ||
        (width && (isNaN(numWidth) || numWidth <= 0)) ||
        (height && (isNaN(numHeight) || numHeight <= 0))) {
      setError('Por favor, introduce valores válidos para peso y dimensiones (si aplican). El peso debe ser mayor a 0.');
      return;
    }
    if (!origin.trim() || !destination.trim()) {
      setError('Por favor, introduce origen y destino.');
      return;
    }


    // Simple calculation logic (example)
    // Base rate: $50
    // Weight factor: $10 per kg
    // Size factor: $0.01 per cm³ (if dimensions provided)
    let cost = 50;
    cost += numWeight * 10;

    if (numLength && numWidth && numHeight) {
      const volume = numLength * numWidth * numHeight;
      cost += volume * 0.01;
    }
    
    // Simulate distance factor based on string length (very naive)
    const distanceFactor = (origin.length + destination.length) * 0.5;
    cost += distanceFactor;


    setEstimatedCost(parseFloat(cost.toFixed(2)));
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Calculadora de Costos de Envío</h2>
          <p className="text-lg text-muted-foreground mt-2">Obtén una estimación instantánea para tu envío.</p>
        </div>
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calculator className="h-6 w-6 text-primary"/> Ingresa los Detalles del Envío</CardTitle>
            <CardDescription>Completa los campos para estimar el costo.</CardDescription>
          </CardHeader>
          <form onSubmit={calculateCost}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="origin">Origen</Label>
                  <Input id="origin" placeholder="Ciudad, Código Postal" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="destination">Destino</Label>
                  <Input id="destination" placeholder="Ciudad, Código Postal" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                </div>
              </div>
              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input id="weight" type="number" placeholder="Ej: 2.5" value={weight} onChange={(e) => setWeight(e.target.value)} required step="0.1" min="0.1" />
              </div>
              <p className="text-sm text-muted-foreground">Dimensiones del paquete (opcional, en cm):</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="length">Largo</Label>
                  <Input id="length" type="number" placeholder="Ej: 30" value={length} onChange={(e) => setLength(e.target.value)} step="0.1" min="0" />
                </div>
                <div>
                  <Label htmlFor="width">Ancho</Label>
                  <Input id="width" type="number" placeholder="Ej: 20" value={width} onChange={(e) => setWidth(e.target.value)} step="0.1" min="0" />
                </div>
                <div>
                  <Label htmlFor="height">Alto</Label>
                  <Input id="height" type="number" placeholder="Ej: 10" value={height} onChange={(e) => setHeight(e.target.value)} step="0.1" min="0"/>
                </div>
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4">
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Calcular Estimado</Button>
              {estimatedCost !== null && (
                <div className="text-center p-4 bg-primary/10 rounded-md">
                  <p className="text-lg font-semibold text-primary">Costo Estimado:</p>
                  <p className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
                    <DollarSign className="h-7 w-7"/>{estimatedCost.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                  </p>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
}
