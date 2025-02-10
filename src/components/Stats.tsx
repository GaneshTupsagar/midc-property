'use client';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  CurrencyRupeeIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const stats = [
  {
    id: 1,
    name: 'Total Properties',
    value: '500+',
    icon: BuildingOfficeIcon,
    description: 'Industrial properties across Maharashtra',
  },
  {
    id: 2,
    name: 'Happy Clients',
    value: '1000+',
    icon: UserGroupIcon,
    description: 'Satisfied customers and growing',
  },
  {
    id: 3,
    name: 'Property Value',
    value: '₹100Cr+',
    icon: CurrencyRupeeIcon,
    description: 'Total property value handled',
  },
  {
    id: 4,
    name: 'Growth Rate',
    value: '25%',
    icon: ChartBarIcon,
    description: 'Year over year growth',
  },
];

export default function Stats() {
  return (
    <div className="relative overflow-hidden py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-6 text-center">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-300" />
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">{stat.name}</h3>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
