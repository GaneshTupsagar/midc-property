'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

interface AdvertiseFormProps {
  selectedPackage: {
    name: string;
    price: string;
    duration: string;
  };
  onClose: () => void;
}

export default function AdvertiseForm({ selectedPackage, onClose }: AdvertiseFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Property Details
    listingType: 'sell', // sell, rent, promote
    propertyType: '',
    propertyTitle: '',
    propertyDescription: '',
    location: '',
    area: '',
    price: '',
    amenities: [] as string[],
    
    // Images
    images: [] as File[],
    
    // Payment Details
    paymentMethod: 'online',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...Array.from(e.target.files || [])],
      }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const generateInvoice = () => {
    // Generate invoice details
    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      package: selectedPackage,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
      },
      amount: selectedPackage.price,
      tax: parseFloat(selectedPackage.price.replace(/[^0-9.-]+/g, '')) * 0.18, // 18% GST
    };
    return invoiceData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate invoice
      const invoice = generateInvoice();
      const amount = parseFloat(selectedPackage.price.replace(/[^0-9.-]+/g, '')) * 1.18; // Including GST

      // Create Razorpay order
      const orderResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: invoice.invoiceNumber,
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        throw new Error('Failed to create payment order');
      }

      // Initialize Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'MIDC Property',
        description: `${selectedPackage.name} Package`,
        order_id: orderData.order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          package_name: selectedPackage.name,
          invoice_number: invoice.invoiceNumber,
        },
        theme: {
          color: '#2563eb',
        },
        handler: async function(response: any) {
          // Verify payment
          const verifyResponse = await fetch('/api/payment', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (!verifyData.success) {
            throw new Error('Payment verification failed');
          }

          // Send email notification
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: formData.email,
              subject: 'Thank you for your purchase!',
              template: 'purchase-confirmation',
              data: {
                name: formData.name,
                package: selectedPackage.name,
                invoice: invoice.invoiceNumber,
              },
            }),
          });

          // Create property listing
          await fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              package: selectedPackage.name,
              status: 'active',
              paymentDetails: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount: orderData.amount,
                currency: orderData.currency,
              },
            }),
          });

          // Show success message and redirect
          router.push('/success?type=advertise');
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Advertise Your Property</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <span>Selected Package: <strong>{selectedPackage.name}</strong></span>
            <span>Price: <strong>{selectedPackage.price}</strong></span>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {['Property Details', 'Contact Info', 'Payment'].map((stepName, index) => (
              <div
                key={stepName}
                className={`flex-1 text-center ${
                  step > index + 1 ? 'text-green-600' : step === index + 1 ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div className="relative">
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${
                    step > index + 1 ? 'border-green-600 bg-green-100' :
                    step === index + 1 ? 'border-blue-600 bg-blue-100' :
                    'border-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="mt-2">{stepName}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Listing Type
                </label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="sell">Sell a Property</option>
                  <option value="rent">Rent a Property</option>
                  <option value="promote">Promote your Property</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="industrial">Industrial Property</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="office">Office Space</option>
                  <option value="land">Industrial Land</option>
                  <option value="commercial">Commercial Property</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Title
                </label>
                <input
                  type="text"
                  name="propertyTitle"
                  value={formData.propertyTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="propertyDescription"
                  value={formData.propertyDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Invoice Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span>{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{selectedPackage.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Amount:</span>
                    <span>{selectedPackage.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>
                      ₹{(parseFloat(selectedPackage.price.replace(/[^0-9.-]+/g, '')) * 0.18).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-2 font-semibold flex justify-between">
                    <span>Total Amount:</span>
                    <span>
                      ₹{(parseFloat(selectedPackage.price.replace(/[^0-9.-]+/g, '')) * 1.18).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="online">Online Payment</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto flex items-center"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Complete Payment'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
