'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  CurrencyRupeeIcon,
  PhotoIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function ListPropertyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    listingType: '',
    price: '',
    area: '',
    location: {
      address: '',
      zone: '',
      city: '',
      state: 'Maharashtra'
    },
    specifications: {
      powerSupply: '',
      waterSupply: '',
      gasSupply: '',
      ceilingHeight: '',
      floorStrength: '',
      craneCapacity: '',
      loadingDocks: '',
      parkingSpaces: '',
      effluentTreatment: '',
      wasteManagement: ''
    },
    amenities: []
  });

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <BuildingOfficeIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to List Your Property</h2>
          <p className="text-gray-600 mb-6">
            Please sign in or create an account to list your industrial property.
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="w-full bg-primary text-white rounded-lg px-6 py-3 hover:bg-primary-dark transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/user/properties');
      } else {
        throw new Error('Failed to create property listing');
      }
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <main className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Property</h1>
            <p className="text-lg text-gray-600">
              Reach thousands of potential buyers and tenants looking for industrial properties.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${stepNumber < 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > stepNumber ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="e.g., Modern Industrial Unit in Pune MIDC"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      required
                    >
                      <option value="">Select Property Type</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Listing Type
                    </label>
                    <select
                      value={formData.listingType}
                      onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      required
                    >
                      <option value="">Select Listing Type</option>
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                      <option value="Lease">For Lease</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="Enter price in INR"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sq.ft)
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="Enter area in square feet"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={formData.location.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, address: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Street address"
                        required
                      />
                      <input
                        type="text"
                        value={formData.location.zone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, zone: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="MIDC Zone"
                        required
                      />
                      <input
                        type="text"
                        value={formData.location.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, city: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      rows={4}
                      placeholder="Detailed description of your property"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Specifications
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(formData.specifications).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm text-gray-600 mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                specifications: {
                                  ...formData.specifications,
                                  [key]: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="ml-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Submit Listing
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
