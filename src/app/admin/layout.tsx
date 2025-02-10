'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if user is not authenticated or is not an admin
    if (status === 'unauthenticated' || (session?.user && session.user.role !== 'admin')) {
      router.push('/auth/signin');
      return;
    }
  }, [session, status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render if user is authenticated and is an admin
  if (session?.user?.role === 'admin') {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            <a
              href="/admin"
              className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/admin/properties"
              className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
            >
              Properties
            </a>
            <a
              href="/admin/users"
              className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
            >
              Users
            </a>
            <a
              href="/admin/enquiries"
              className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
            >
              Enquiries
            </a>
            <a
              href="/admin/settings"
              className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white transition-colors"
            >
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Return null if not admin
  return null;
}
