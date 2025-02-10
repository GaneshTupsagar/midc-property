'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BuildingOfficeIcon, MapPinIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface Property {
  _id: string;
  title: string;
  description: string;
  type: string;
  listingType: string;
  price: number;
  area: number;
  location: {
    address: string;
    zone: string;
    city: string;
    state: string;
  };
  images: string[];
  status: string;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Format price to Indian currency format with crores and lakhs
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      const crores = (price / 10000000).toFixed(2);
      return `₹${crores} Cr`;
    } else if (price >= 100000) {
      const lakhs = (price / 100000).toFixed(2);
      return `₹${lakhs} L`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  // Format area with commas and sq.ft
  const formatArea = (area: number) => {
    return `${area.toLocaleString('en-IN')} sq.ft`;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get listing type color
  const getListingTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sale':
        return 'bg-purple-100 text-purple-800';
      case 'rent':
        return 'bg-blue-100 text-blue-800';
      case 'lease':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/properties/${property._id}`}>
        <div className="relative h-48">
          {property.images && property.images.length > 0 ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <BuildingOfficeIcon className="h-16 w-16 text-gray-400" />
            </div>
          )}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.status)}`}>
              {property.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getListingTypeColor(property.listingType)}`}>
              For {property.listingType}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {property.title}
            </h3>
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <div className="text-sm">
              <span className="font-medium">{property.location.zone}</span>
              <span className="mx-1">•</span>
              <span>{property.location.city}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-sm text-gray-600">Price</div>
              <div className="font-semibold text-primary">
                {formatPrice(property.price)}
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-sm text-gray-600">Area</div>
              <div className="font-semibold text-primary">
                {formatArea(property.area)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{property.type}</span>
            <span className="inline-flex items-center text-primary text-sm font-medium hover:text-primary-dark">
              View Details
              <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
