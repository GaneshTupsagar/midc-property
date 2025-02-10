'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { CONTACT_INFO } from '@/utils/constants';

export default function ContactCTA() {
  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in MIDC properties";
    window.open(`https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative max-w-5xl mx-auto text-center">
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 bg-blue-400 rounded-full opacity-10 blur-3xl" />
          <div className="w-56 h-56 bg-purple-400 rounded-full opacity-10 blur-3xl -ml-20" />
        </div>

        {/* Content */}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Find Your Perfect
            <span className="block mt-2">Industrial Property?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Connect with our experts today and let us help you find the ideal MIDC property for your business
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50"
            >
              <ChatBubbleLeftIcon className="h-6 w-6" />
              WhatsApp Now
            </button>
            
            <Link href={`tel:${CONTACT_INFO.CONTACT_NUMBER}`}>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50">
                <PhoneIcon className="h-6 w-6" />
                Call Us
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
