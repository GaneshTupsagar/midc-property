'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/types/user';
import {
  HomeIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/users/profile?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error('Error fetching user data:', err));
    }
  }, [session]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    ...(user?.role !== 'BUYER' ? [
      { name: 'My Properties', href: '/dashboard/properties', icon: BuildingOfficeIcon },
      { name: 'Packages', href: '/dashboard/packages', icon: CurrencyRupeeIcon },
    ] : []),
    { name: 'My Inquiries', href: '/dashboard/inquiries', icon: ClipboardDocumentListIcon },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="flex flex-col h-screen">
            <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
              <h2 className="text-xl font-bold text-white">Dashboard</h2>
            </div>
            <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            {user && (
              <div className="flex items-center px-4 py-3 border-t">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <main className="py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
