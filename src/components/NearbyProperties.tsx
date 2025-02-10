'use client';

import { useState, useEffect } from 'react';
import { getCurrentLocation, calculateDistance, getCityFromCoordinates } from '@/utils/locationService';
import { MapPinIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  images: string[];
  area: number;
  type: string;
}

export default function NearbyProperties() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [nearbyProperties, setNearbyProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const coords = await getCurrentLocation();
        setUserLocation(coords);
        
        // Get city name from coordinates
        const cityName = await getCityFromCoordinates(coords.latitude, coords.longitude);
        setLocationName(cityName);
        
        // Fetch nearby properties
        fetchNearbyProperties(coords);
      } catch (err: any) {
        setError(err.message || 'Error getting location');
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  const fetchNearbyProperties = async (coords: { latitude: number; longitude: number }) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/properties/nearby?lat=${coords.latitude}&lng=${coords.longitude}`);
      const data = await response.json();
      
      if (response.ok) {
        // Calculate distance for each property
        const propertiesWithDistance = data.map((property: Property) => ({
          ...property,
          distance: calculateDistance(
            coords.latitude,
            coords.longitude,
            property.location.latitude,
            property.location.longitude
          )
        }));

        // Sort by distance
        const sortedProperties = propertiesWithDistance.sort((a: any, b: any) => a.distance - b.distance);
        setNearbyProperties(sortedProperties);
      } else {
        throw new Error(data.message || 'Error fetching properties');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching nearby properties');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {locationName && (
              <div className="flex items-center gap-2 mb-6">
                <MapPinIcon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Properties near {locationName}</h2>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyProperties.map((property) => (
                <Link href={`/properties/${property.id}`} key={property.id}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 w-full">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{property.location.address}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-primary font-semibold">₹{property.price.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{(property as any).distance} km away</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <ArrowsPointingOutIcon className="h-4 w-4" />
                          <span>{property.area} sq.ft</span>
                        </div>
                        <div>{property.type}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {nearbyProperties.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">No properties found in your area.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
