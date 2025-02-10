'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  requirement: string;
  visitDate: string;
  message: string;
  propertyTitle: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function InquiriesPage() {
  const { data: session, status } = useSession();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }
      const data = await response.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch inquiries');
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchInquiries();
    }
  }, [status]);

  // Check authentication
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    redirect('/api/auth/signin');
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update inquiry status');
      }

      await fetchInquiries();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update inquiry status');
    }
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inquiries Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requirement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() => handleWhatsApp(inquiry.phone)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.917 1.049 5.591 2.787 7.682L1.3 23.7l4.118-1.487C7.556 23.346 9.71 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zM8.126 7.886c.224-.624.224-1.674-.168-2.022-.392-.348-1.12-.348-1.568 0-.448.348-.896 1.398-.896 2.022 0 .624.448 1.674.896 2.022.448.348 1.176.348 1.568 0 .392-.348.392-1.398.168-2.022zm3.92 0c.224-.624.224-1.674-.168-2.022-.392-.348-1.12-.348-1.568 0-.448.348-.896 1.398-.896 2.022 0 .624.448 1.674.896 2.022.448.348 1.176.348 1.568 0 .392-.348.392-1.398.168-2.022zm3.92 0c.224-.624.224-1.674-.168-2.022-.392-.348-1.12-.348-1.568 0-.448.348-.896 1.398-.896 2.022 0 .624.448 1.674.896 2.022.448.348 1.176.348 1.568 0 .392-.348.392-1.398.168-2.022z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleCall(inquiry.phone)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PhoneIcon className="h-5 w-5" />
                        </button>
                        {inquiry.email && (
                          <button
                            onClick={() => handleEmail(inquiry.email)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <EnvelopeIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{inquiry.requirement}</div>
                    {inquiry.visitDate && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(inquiry.visitDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {inquiry.propertyTitle || 'General Inquiry'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateInquiryStatus(inquiry._id, e.target.value)}
                      className="text-sm rounded-full px-3 py-1 border"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="scheduled">Visit Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateInquiryStatus(inquiry._id, 'completed')}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => updateInquiryStatus(inquiry._id, 'cancelled')}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
