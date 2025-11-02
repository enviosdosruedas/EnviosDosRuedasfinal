// src/app/admin/login/actions.ts
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  username: z.string().min(1, { message: 'El nombre de usuario es requerido.' }),
  password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});

export interface LoginFormState {
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof loginSchema>, string[]>>;
  success?: boolean;
}

const ADMIN_USER = 'EnviosAdmin';
const ADMIN_PASS = 'Vendetta_3317_10';

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  // Simulate a successful login without checking credentials.
  // This is for development purposes.

  // Set a session cookie
  cookies().set('admin-auth-token', 'your-secret-session-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
  
  // The redirect will be caught by the try/catch in the client component
  // and handled by router.push()
  return { success: true };

}

export async function logout() {
  cookies().delete('admin-auth-token');
  redirect('/admin/login');
}
