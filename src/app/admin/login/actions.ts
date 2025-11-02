// src/app/admin/login/actions.ts
'use server';

import type { z } from 'zod';
import { cookies } from 'next/headers';

const loginSchema = {
  username: "",
  password: "",
};


export interface LoginFormState {
  error?: string;
  fieldErrors?: Partial<Record<keyof typeof loginSchema, string[]>>;
  success?: boolean;
}

const ADMIN_USER = 'EnviosAdmin';
const ADMIN_PASS = 'Vendetta_3317_10';

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return {
          error: "Nombre de usuario o contraseña incorrectos."
      }
  }


  (await
    cookies()).set('admin-auth-token', 'your-secret-session-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
  
  return { success: true };

}

export async function logout() {
  (await cookies()).delete('admin-auth-token');
}
