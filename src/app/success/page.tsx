'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const getSuccessMessage = () => {
    switch (type) {
      case 'advertise':
        return {
          title: 'Thank You for Your Purchase!',
          message: 'Your property listing has been successfully submitted and will be reviewed shortly. You will receive a confirmation email with your invoice and listing details.',
          cta: {
            text: 'View Your Properties',
            link: '/dashboard/properties'
          }
        };
      default:
        return {
          title: 'Success!',
          message: 'Your request has been processed successfully.',
          cta: {
            text: 'Return Home',
            link: '/'
          }
        };
    }
  };

  const successData = getSuccessMessage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {successData.title}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {successData.message}
        </p>

        <div className="space-y-4">
          <Link
            href={successData.cta.link}
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {successData.cta.text}
          </Link>
          
          <Link
            href="/"
            className="block w-full text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
