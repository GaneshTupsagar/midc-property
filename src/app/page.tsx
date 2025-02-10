'use client';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import SearchSection from '@/components/SearchSection';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import ContactCTA from '@/components/ContactCTA';
import UpcomingProjects from '@/components/UpcomingProjects';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, GiftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Home() {
  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    searchSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative">
        <Hero />
        
        {/* Top Mini Banner */}
        <div className="absolute bottom-0 w-full bg-yellow-400 text-blue-900 shadow-md">
          <div className="container mx-auto px-4 py-1.5">
            <div className="flex items-center justify-center gap-2">
              <span className="animate-bounce">🎉</span>
              <p className="text-center font-semibold text-sm whitespace-nowrap">
                Limited Time Launch Offer - Don't Miss Out!
              </p>
              <span className="animate-bounce">🎉</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Promotional Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/sparkles.png')] opacity-10 animate-pulse"></div>
        
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <SparklesIcon className="h-12 w-12 text-yellow-400" />
                <h1 className="text-5xl md:text-6xl font-bold">
                  1 Year FREE Access
                </h1>
                <SparklesIcon className="h-12 w-12 text-yellow-400" />
              </motion.div>
              <p className="text-2xl text-blue-100 mb-6">
                Post Unlimited Properties & Get Premium Advertising Features at No Cost!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GiftIcon className="h-8 w-8 text-yellow-400" />
                  Property Posting Features
                </h3>
                <ul className="space-y-3">
                  {[
                    'Unlimited Property Listings',
                    'Premium Visibility',
                    'Advanced Property Analytics',
                    'Virtual Tours Support',
                    'HD Photo Uploads',
                    'Detailed Property Descriptions'
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircleIcon className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <SparklesIcon className="h-8 w-8 text-yellow-400" />
                  Advertisement Benefits
                </h3>
                <ul className="space-y-3">
                  {[
                    'Featured Listings',
                    'Social Media Promotion',
                    'Email Marketing',
                    'Priority Support',
                    'Performance Analytics',
                    'Premium Badge on Listings'
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircleIcon className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Link
                  href="/auth/register"
                  className="inline-block bg-yellow-400 text-blue-900 text-xl font-bold px-12 py-4 rounded-full hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started Free →
                </Link>
                <p className="mt-3 text-blue-100">
                  * No credit card required. Limited time offer.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="container mx-auto px-4 py-8">
            <SearchSection />
          </div>
        </motion.div>
      </section>

      {/* Featured Properties with 3D Cards */}
      <section className="bg-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 py-8">
            <FeaturedProperties />
          </div>
        </motion.div>
      </section>

      {/* Upcoming Projects Slideshow */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <UpcomingProjects />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <Stats />
        </div>
      </section>

      {/* Services with Hover Effects */}
      <section className="bg-gray-50">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 py-8">
            <Services />
          </div>
        </motion.div>
      </section>

      {/* Testimonials with Carousel */}
      <section className="bg-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 py-8">
            <Testimonials />
          </div>
        </motion.div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="container mx-auto px-4 py-8">
            <ContactCTA />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
