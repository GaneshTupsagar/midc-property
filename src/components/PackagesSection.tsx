'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';

const packages = [
  {
    name: 'Basic',
    originalPrice: '999',
    price: '0',
    features: [
      'List Unlimited Properties',
      '1 Year FREE Access',
      'Basic Property Analytics',
      'Email Support',
      'Standard Listing Position'
    ],
    recommended: false,
    link: '/payment?package=basic'
  },
  {
    name: 'Premium',
    originalPrice: '2999',
    price: '0',
    features: [
      'List Unlimited Properties',
      '1 Year FREE Access',
      'Advanced Property Analytics',
      'Priority Support',
      'Featured Listing Position',
      'Social Media Promotion',
      'Professional Photography Tips'
    ],
    recommended: true,
    link: '/payment?package=premium'
  },
  {
    name: 'Professional',
    originalPrice: '4999',
    price: '0',
    features: [
      'List Unlimited Properties',
      '1 Year FREE Access',
      'Premium Analytics Dashboard',
      '24/7 Priority Support',
      'Top Listing Position',
      'Social Media Marketing',
      'Virtual Tour Support',
      'Professional Photography Service'
    ],
    recommended: false,
    link: '/payment?package=professional'
  }
];

export default function PackagesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <SparklesIcon className="h-8 w-8 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Special Launch Offer
            </h2>
            <SparklesIcon className="h-8 w-8 text-yellow-400" />
          </div>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            1 Year FREE Access to All Packages!
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            For a limited time, get complete access to all our premium features without any cost. 
            Start listing your properties today!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl shadow-xl p-8 ${
                pkg.recommended
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white transform scale-105'
                  : 'bg-white'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className={`text-2xl font-bold ${pkg.recommended ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-sm line-through ${pkg.recommended ? 'text-blue-200' : 'text-gray-400'}`}>
                      ₹{pkg.originalPrice}
                    </span>
                    <span className={`text-4xl font-bold ${pkg.recommended ? 'text-white' : 'text-gray-900'}`}>
                      FREE
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${pkg.recommended ? 'text-blue-100' : 'text-gray-500'}`}>
                    for 1 year
                  </p>
                </div>
                <ul className="mt-8 space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <CheckCircleIcon className={`h-5 w-5 ${pkg.recommended ? 'text-white' : 'text-green-500'}`} />
                      <span className={pkg.recommended ? 'text-white' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={pkg.link}
                  className={`mt-8 block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-200 ${
                    pkg.recommended
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Get Started Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            * Limited time offer. After the free period, standard pricing will apply unless cancelled.
          </p>
        </div>
      </div>
    </section>
  );
}
