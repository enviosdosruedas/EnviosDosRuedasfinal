// src/components/admin/LoginForm.tsx
import { LoginClientForm } from './LoginClientForm';

export function LoginForm() {
  // This component now acts as a Server Component wrapper
  // The actual client-side logic is in LoginClientForm
  return <LoginClientForm />;
}
