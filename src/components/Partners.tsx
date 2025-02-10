'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { id: 1, name: 'MIDC', logo: '/images/partners/midc.png' },
  { id: 2, name: 'Maharashtra Government', logo: '/images/partners/maharashtra-gov.png' },
  { id: 3, name: 'Bank of Maharashtra', logo: '/images/partners/bank-of-maharashtra.png' },
  { id: 4, name: 'SIDBI', logo: '/images/partners/sidbi.png' },
  { id: 5, name: 'MSME', logo: '/images/partners/msme.png' },
  { id: 6, name: 'Make in India', logo: '/images/partners/make-in-india.png' },
];

export default function Partners() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We collaborate with leading organizations to provide you with the best industrial property solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-24 bg-white rounded-lg shadow-md p-4 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
