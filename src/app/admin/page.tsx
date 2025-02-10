'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FiUsers, FiHome, FiMessageSquare, FiActivity, FiAlertCircle, FiDollarSign } from 'react-icons/fi';

interface DashboardStats {
  totalUsers: number;
  totalProperties: number;
  totalEnquiries: number;
  activeListings: number;
  pendingApprovals: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProperties: 0,
    totalEnquiries: 0,
    activeListings: 0,
    pendingApprovals: 0,
    totalRevenue: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardStats();
    fetchRecentActivities();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const response = await fetch('/api/admin/activities');
      const data = await response.json();
      if (response.ok) {
        setRecentActivities(data);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  // Check authentication
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  if (status === 'unauthenticated') {
    redirect('/api/auth/signin');
  }

  const handleSeedDatabase = async () => {
    try {
      const response = await fetch('/api/seed');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed database');
      }
      
      setMessage('Database seeded successfully!');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to seed database');
      setMessage('');
    }
  };

  return (
    <main className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => {}} // Add export functionality
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Export Data
            </button>
            <button
              onClick={handleSeedDatabase}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Seed Sample Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <FiHome className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500">Properties Listed</p>
              <p className="text-2xl font-bold">{stats.totalProperties}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <FiMessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500">Total Enquiries</p>
              <p className="text-2xl font-bold">{stats.totalEnquiries}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <FiActivity className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500">Active Listings</p>
              <p className="text-2xl font-bold">{stats.activeListings}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <FiAlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-500">Pending Approvals</p>
              <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full mr-4">
              <FiDollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center p-4 border-b last:border-b-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-gray-800">{activity.description}</p>
                  <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-800 mb-2">Properties</h3>
              <div className="space-y-2">
                <a href="/admin/properties/add" className="block text-blue-600 hover:text-blue-800">
                  Add New Property →
                </a>
                <a href="/admin/properties" className="block text-blue-600 hover:text-blue-800">
                  Manage Properties →
                </a>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-800 mb-2">Users</h3>
              <div className="space-y-2">
                <a href="/admin/users/add" className="block text-blue-600 hover:text-blue-800">
                  Add New User →
                </a>
                <a href="/admin/users" className="block text-blue-600 hover:text-blue-800">
                  Manage Users →
                </a>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-800 mb-2">Enquiries</h3>
              <div className="space-y-2">
                <a href="/admin/enquiries" className="block text-blue-600 hover:text-blue-800">
                  View All Enquiries →
                </a>
                <a href="/admin/enquiries/pending" className="block text-blue-600 hover:text-blue-800">
                  Pending Enquiries →
                </a>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
