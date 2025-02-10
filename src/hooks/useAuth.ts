'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(requireAuth = false) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If authentication is required and user is not authenticated
    if (requireAuth && status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [requireAuth, status, router]);

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  return {
    session,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    user: session?.user
  };
}
