
'use client';

import React, { useState } from 'react';
import type { Client } from '@prisma/client'; 
import { ClientSearchForm } from './ClientSearchForm';
import { ClientRegistrationForm } from './ClientRegistrationForm';
import { ShipmentCreationForm } from './ShipmentCreationForm';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, UserPlus, UserSearch, PackagePlus } from 'lucide-react';

export type OrderWizardStep = 'search' | 'register' | 'create';

interface StepConfig {
  title: string;
  description: string;
  icon: React.ElementType;
}

const stepConfigs: Record<OrderWizardStep, StepConfig> = {
  search: {
    title: 'Buscar Cliente',
    description: 'Ingresa el número de teléfono para buscar un cliente existente.',
    icon: UserSearch,
  },
  register: {
    title: 'Registrar Nuevo Cliente',
    description: 'El cliente no fue encontrado. Completa los datos para registrarlo.',
    icon: UserPlus,
  },
  create: {
    title: 'Crear Envío',
    description: 'Ingresa los detalles del envío para el cliente seleccionado.',
    icon: PackagePlus,
  },
};

export function GenerarEnvioForm() {
  const [currentStep, setCurrentStep] = useState<OrderWizardStep>('search');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchedPhone, setSearchedPhone] = useState<string | null>(null); 
  const [isProcessingStep, setIsProcessingStep] = useState(false);

  const { toast } = useToast();

  const handleClientFound = (client: Client) => {
    setSelectedClient(client);
    setCurrentStep('create');
    // Toast moved to child component for more specific feedback
  };

  const handleClientNotFound = (phone: string) => {
    setSearchedPhone(phone);
    setSelectedClient(null);
    setCurrentStep('register');
    // Toast moved to child component
  };

  const handleClientRegistered = (client: Client) => {
    setSelectedClient(client);
    setCurrentStep('create');
    // Toast moved to child component
  };

  const handleCancelRegistration = () => {
    setSearchedPhone(null);
    setCurrentStep('search');
  };

  const handleOrderCreated = (orderId: number) => {
    toast({
      title: 'Envío Creado Exitosamente',
      description: `El envío con ID ${orderId} ha sido creado.`,
      className: 'bg-green-100 border-green-400 text-green-700',
      duration: 5000,
    });
    setCurrentStep('search');
    setSelectedClient(null);
    setSearchedPhone(null);
  };
  
  const handleGoBackFromCreate = () => {
    if (isProcessingStep) return;
    setCurrentStep('search'); 
    setSelectedClient(null);
    setSearchedPhone(null);
  };

  const CurrentStepIcon = stepConfigs[currentStep].icon;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl my-8">
      <CardHeader className="bg-muted/30 p-6">
        <div className="flex items-center gap-3 mb-2">
          <CurrentStepIcon className="h-7 w-7 text-primary" />
          <div>
            <CardTitle className="text-2xl font-bold text-primary">
              {stepConfigs[currentStep].title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {stepConfigs[currentStep].description}
            </CardDescription>
          </div>
        </div>
         <div className="flex items-center space-x-1 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap py-1">
          <span className={`font-medium p-1 rounded-sm ${currentStep === 'search' ? 'text-primary bg-primary/10' : ''}`}>1. Búsqueda</span>
          <span>&rarr;</span>
          <span className={`font-medium p-1 rounded-sm ${currentStep === 'register' ? 'text-primary bg-primary/10' : ''}`}>2. Registro (si aplica)</span>
          <span>&rarr;</span>
          <span className={`font-medium p-1 rounded-sm ${currentStep === 'create' ? 'text-primary bg-primary/10' : ''}`}>3. Creación Envío</span>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-6 md:p-8">
        {isProcessingStep && (
          <div className="flex flex-col items-center justify-center space-y-2 py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Procesando...</p>
          </div>
        )}

        {!isProcessingStep && currentStep === 'search' && (
          <ClientSearchForm
            onClientFound={handleClientFound}
            onClientNotFound={handleClientNotFound}
            setIsParentProcessing={setIsProcessingStep}
          />
        )}

        {!isProcessingStep && currentStep === 'register' && searchedPhone && (
          <ClientRegistrationForm
            initialPhone={searchedPhone}
            onClientRegistered={handleClientRegistered}
            onCancel={handleCancelRegistration}
            setIsParentProcessing={setIsProcessingStep}
          />
        )}

        {!isProcessingStep && currentStep === 'create' && (
          <ShipmentCreationForm
            initialClientData={selectedClient}
            onOrderCreated={handleOrderCreated}
            onBack={handleGoBackFromCreate} 
            setIsParentProcessing={setIsProcessingStep}
          />
        )}
      </CardContent>
    </Card>
  );
}
