'use client';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  ChartBarIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline/index.js';
import { FC } from 'react';
import React from 'react';

interface ServiceItem {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    icon: HomeIcon,
    title: 'Property Management',
    description: 'Comprehensive property management services for landlords and property owners.',
  },
  {
    icon: BuildingOfficeIcon,
    title: 'Real Estate Investment',
    description: 'Expert guidance on real estate investments and portfolio management.',
  },
  {
    icon: ChartBarIcon,
    title: 'Market Analysis',
    description: 'Detailed market analysis and property valuation services.',
  },
  {
    icon: UserGroupIcon,
    title: 'Consulting Services',
    description: 'Professional consulting services for all your real estate needs.',
  },
];

const Services: FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: services.findIndex(s => s.title === service.title) * 0.1 }}
                className="card text-center hover:bg-gray-50"
              >
                <div className="flex justify-center mb-4">
                  <service.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button className="btn-primary px-8 py-3">
              Learn More About Our Services
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
