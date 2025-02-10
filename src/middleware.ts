import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // If the user is authenticated, allow the request
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

// Protect these routes - require authentication
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/properties/create',
    '/properties/edit/:path*',
    '/api/properties/create',
    '/api/properties/edit/:path*',
    '/admin/:path*',
    '/api/admin/:path*'
  ],
};
