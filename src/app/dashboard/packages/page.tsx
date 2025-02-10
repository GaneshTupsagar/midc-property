'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PackagesSection from '@/components/PackagesSection';
import { User } from '@/types/user';

export default function DashboardPackages() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      // Fetch user data including role and package info
      fetch(`/api/users/profile?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error('Error fetching user data:', err));
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Package</h1>
          {user?.role === 'BUYER' ? (
            <p className="mt-4 text-lg text-red-600">
              Only Agents and Property Owners can purchase listing packages. 
              Please update your role to list properties.
            </p>
          ) : (
            <p className="mt-4 text-lg text-gray-600">
              Select a package that best suits your needs to start listing properties
            </p>
          )}
        </div>
        
        {user?.role !== 'BUYER' && <PackagesSection />}
        
        {user?.packageType && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900">Current Package</h2>
            <p className="mt-2 text-blue-800">
              You are currently on the {user.packageType} package
              {user.packageExpiry && (
                <span className="ml-2">
                  (Expires: {new Date(user.packageExpiry).toLocaleDateString()})
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
