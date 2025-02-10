'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from './PropertyCard';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';

interface Property {
  _id: string;
  title: string;
  description: string;
  location: {
    address: string;
    zone: string;
    city: string;
    state: string;
    lat?: number;
    lng?: number;
  };
  type: string;
  area: number;
  price: number;
  images: string[];
  listingType: string;
  status: string;
  specifications: {
    powerSupply: string;
    waterSupply: string;
    gasSupply: string;
    ceilingHeight: string;
    floorStrength: string;
    craneCapacity: string;
    loadingDocks: string;
    parkingSpaces: string;
    effluentTreatment: string;
    wasteManagement: string;
  };
  amenities: string[];
}

interface PropertyListProps {
  page?: number;
}

export default function PropertyList({ page = 1 }: PropertyListProps) {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Build the URL with all search parameters
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        
        const response = await fetch(`/api/properties?${params.toString()}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch properties');
        }
        
        if (!data.properties) {
          throw new Error('Invalid response format from server');
        }

        setProperties(data.properties);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err.message : 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, searchParams]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="animate-pulse bg-white rounded-lg shadow-md p-4">
              <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 mb-2">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <BuildingOffice2Icon className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => window.history.pushState(null, '', `?page=${num}`)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  num === page
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {num}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
