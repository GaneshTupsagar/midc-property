'use client';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Property Investor',
    image: '/images/testimonial1.jpg',
    content: 'MIDC Property helped me find the perfect investment property. Their market analysis and guidance were invaluable.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Homeowner',
    image: '/images/testimonial2.jpg',
    content: 'The team made buying our first home a smooth and enjoyable experience. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Kumar',
    role: 'Business Owner',
    image: '/images/testimonial3.jpg',
    content: 'Found the perfect commercial space for my business through MIDC Property. Professional and efficient service.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
