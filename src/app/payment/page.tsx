'use client';

import { useState } from 'react';
import PaymentForm from '@/components/payment/PaymentForm';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePaymentSuccess = (response: any) => {
    setPaymentStatus('success');
    setMessage('Payment successful! Thank you for your payment.');
    // Redirect to success page after 2 seconds
    setTimeout(() => {
      router.push('/payment/success');
    }, 2000);
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus('error');
    setMessage(error.message || 'Payment failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
          <p className="mt-2 text-gray-600">
            Secure payment powered by Razorpay
          </p>
        </div>

        {paymentStatus !== 'idle' && (
          <div
            className={`mb-6 p-4 rounded-md ${
              paymentStatus === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        <PaymentForm
          amount={1000}
          email="user@example.com"
          contact="1234567890"
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By proceeding with the payment, you agree to our terms and conditions.</p>
          <p className="mt-2">
            Need help?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-500">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
