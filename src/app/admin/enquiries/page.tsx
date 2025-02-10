'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiMail, FiPhone, FiMessageSquare, FiCheck, FiX, FiFilter } from 'react-icons/fi';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  property: {
    title: string;
    location: {
      address: string;
    };
  };
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export default function EnquiriesManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEnquiries();
    }
  }, [status]);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/enquiries');
      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }
      const data = await response.json();
      setEnquiries(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateEnquiryStatus = async (enquiryId: string, newStatus: 'pending' | 'responded' | 'closed') => {
    try {
      const response = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update enquiry status');
      }

      setEnquiries(enquiries.map(enquiry => 
        enquiry._id === enquiryId ? { ...enquiry, status: newStatus } : enquiry
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update enquiry status');
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesStatus = selectedStatus === 'all' || enquiry.status === selectedStatus;
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.property.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Enquiries Management</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search enquiries..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiFilter className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filteredEnquiries.map((enquiry) => (
          <div key={enquiry._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{enquiry.name}</h3>
                    <p className="text-gray-500">{enquiry.property.title}</p>
                    <p className="text-sm text-gray-400">{enquiry.property.location.address}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    enquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    enquiry.status === 'responded' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FiMail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${enquiry.email}`} className="hover:text-primary">
                      {enquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="w-4 h-4 mr-2" />
                    <a href={`tel:${enquiry.phone}`} className="hover:text-primary">
                      {enquiry.phone}
                    </a>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <FiMessageSquare className="w-4 h-4 mr-2 mt-1" />
                    <p className="whitespace-pre-wrap">{enquiry.message}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end space-x-2 md:space-x-0 md:space-y-2">
                <button
                  onClick={() => updateEnquiryStatus(enquiry._id, 'responded')}
                  className={`flex items-center px-4 py-2 rounded ${
                    enquiry.status === 'responded'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  disabled={enquiry.status === 'responded'}
                >
                  <FiCheck className="w-4 h-4 mr-2" />
                  Mark Responded
                </button>
                <button
                  onClick={() => updateEnquiryStatus(enquiry._id, 'closed')}
                  className={`flex items-center px-4 py-2 rounded ${
                    enquiry.status === 'closed'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                  disabled={enquiry.status === 'closed'}
                >
                  <FiX className="w-4 h-4 mr-2" />
                  Close Enquiry
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              Received: {new Date(enquiry.createdAt).toLocaleString()}
            </div>
          </div>
        ))}

        {filteredEnquiries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No enquiries found matching your criteria.
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
