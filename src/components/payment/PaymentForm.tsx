'use client';

import { useState } from 'react';
import Script from 'next/script';

interface PaymentFormProps {
  amount: number;
  email?: string;
  contact?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

interface PaymentMethods {
  [key: string]: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentForm({ amount, email, contact, onSuccess, onError }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>({});

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create order
      const orderResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          email,
          contact,
          method: selectedMethod,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Store available payment methods
      setPaymentMethods(orderData.payment_methods);

      // Initialize Razorpay payment
      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'MIDC Property',
        description: 'Property Service Payment',
        order_id: orderData.order_id,
        prefill: {
          email: orderData.prefill.email,
          contact: orderData.prefill.contact,
        },
        handler: async function (response: any) {
          try {
            // Verify payment
            const verificationResponse = await fetch('/api/payment', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verificationData = await verificationResponse.json();

            if (verificationData.success) {
              onSuccess?.(verificationData);
            } else {
              throw new Error(verificationData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            onError?.(error);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        theme: {
          color: '#2563eb', // blue-600
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      
      <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="text-lg font-semibold">₹{amount.toFixed(2)}</div>
        </div>

        {Object.entries(paymentMethods).length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="space-y-2">
              {Object.entries(paymentMethods).map(([key, description]) => (
                <label
                  key={key}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={key}
                    checked={selectedMethod === key}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-900">{description}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
}
