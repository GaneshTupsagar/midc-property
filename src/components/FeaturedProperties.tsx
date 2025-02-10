'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HeartIcon, MapPinIcon, HomeIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const properties = [
  {
    id: 1,
    title: 'Luxury Villa in Pune',
    location: 'Koregaon Park, Pune',
    price: '2.5 Cr',
    bedrooms: 4,
    bathrooms: 3,
    area: '3500 sqft',
    image: '/images/property1.jpg',
  },
  {
    id: 2,
    title: 'Modern Apartment',
    location: 'Hinjewadi, Pune',
    price: '85 L',
    bedrooms: 3,
    bathrooms: 2,
    area: '1800 sqft',
    image: '/images/property2.jpg',
  },
  {
    id: 3,
    title: 'Commercial Space',
    location: 'MIDC, Pune',
    price: '1.8 Cr',
    bedrooms: 0,
    bathrooms: 2,
    area: '2500 sqft',
    image: '/images/property3.jpg',
  },
];

export default function FeaturedProperties() {
  const router = useRouter();
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <HeartIcon className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center mb-4">
                    <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <HomeIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">{property.area}</span>
                    </div>
                    <div className="flex items-center">
                      <CurrencyRupeeIcon className="h-5 w-5 text-primary mr-1" />
                      <span className="text-primary font-semibold">{property.price}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">
                      {property.bedrooms > 0 && `${property.bedrooms} Beds • `}
                      {property.bathrooms} Baths
                    </div>
                    <motion.button
                      onClick={() => router.push(`/properties/${property.id}`)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.button
              onClick={() => router.push('/properties')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-3"
            >
              View All Properties
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
