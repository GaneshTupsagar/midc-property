'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 animate-gradient" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white w-full max-w-4xl"
        >
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Your Gateway to Premium
            <span className="block mt-2 text-blue-400">MIDC Properties</span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300 px-4 sm:px-8"
          >
            Discover exclusive industrial properties in Maharashtra's most sought-after MIDC locations
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-6 sm:mt-8 px-4"
          >
            <Link href="/properties" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                Explore Properties
              </motion.button>
            </Link>
            <Link href="/list-property" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-white/50"
              >
                List Your Property
              </motion.button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-base sm:text-lg backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-3xl mx-auto px-4"
          >
            {[
              { number: '500+', label: 'Properties' },
              { number: '50+', label: 'MIDC Locations' },
              { number: '1000+', label: 'Happy Clients' },
              { number: '15+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-2 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDownIcon className="w-6 h-6 text-white animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}
