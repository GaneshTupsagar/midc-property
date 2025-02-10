'use client';

import { useEffect, useState } from 'react';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import OptimizedImage from '@/components/common/OptimizedImage';

interface Property {
  _id: string;
  title: string;
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  type: string;
  area: number;
  price: number;
  images: string[];
  listingType: 'Sale' | 'Lease';
  status: 'Active' | 'Pending' | 'Sold' | 'Leased';
  features: string[];
  nearbyFacilities: Array<{
    type: string;
    name: string;
    distance: string;
  }>;
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property details');
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
            <div className="h-96 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
            Property not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{property.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-96">
                {property.images?.[0] ? (
                  <OptimizedImage
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-100 flex items-center justify-center h-full">
                    <BuildingOffice2Icon className="h-32 w-32 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Property Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {/* Property Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
                <ul className="grid grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nearby Facilities */}
            {property.nearbyFacilities && property.nearbyFacilities.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nearby Facilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.nearbyFacilities.map((facility, index) => (
                    <div key={index} className="flex items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{facility.name}</h3>
                        <p className="text-sm text-gray-500">{facility.type}</p>
                        <p className="text-sm text-gray-500">{facility.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-blue-600 mb-2">
                  ₹{property.price.toLocaleString('en-IN')}
                </h2>
                <div className="flex items-center text-gray-600">
                  <span>{property.area} sq.ft</span>
                  <span className="mx-2">•</span>
                  <span>{property.type}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">{property.location.address}</p>
              </div>

              <div className="space-y-3">
                <span className={`inline-block w-full text-center px-4 py-2 rounded ${
                  property.listingType === 'Sale' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  For {property.listingType}
                </span>
                <span className={`inline-block w-full text-center px-4 py-2 rounded ${
                  property.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : property.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {property.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
