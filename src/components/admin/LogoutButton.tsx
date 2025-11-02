// src/components/admin/LogoutButton.tsx
'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';
import { logout } from '@/app/admin/login/actions';
import { useToast } from '@/hooks/use-toast';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      toast({
        title: 'Sesión Cerrada',
        description: 'Has cerrado sesión exitosamente.',
      });
    });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="destructive"
      className="font-semibold shadow-lg w-full"
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {isPending ? 'Cerrando sesión...' : 'Cerrar Sesión'}
    </Button>
  );
}