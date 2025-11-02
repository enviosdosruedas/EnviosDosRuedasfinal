// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('admin-auth-token');
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  
  if (isAdminRoute && !isLoginPage && !authToken) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && authToken) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }
  

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // Ensure the middleware runs for both /admin and /admin/*
  matcher: ['/admin/:path*'],
};
