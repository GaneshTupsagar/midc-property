'use client';

import { motion } from 'framer-motion';

export default function DataPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Data Policy</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Data Collection</h2>
          <p>We collect and process the following types of data:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Personal identification information</li>
            <li>Property search and browsing history</li>
            <li>Communication records</li>
            <li>Technical data (device info, IP address, etc.)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Data Storage</h2>
          <p>Your data is stored:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>On secure servers within India</li>
            <li>With industry-standard encryption</li>
            <li>For only as long as necessary</li>
            <li>In compliance with data protection laws</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Data Processing</h2>
          <p>We process your data to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Provide personalized property recommendations</li>
            <li>Improve our services</li>
            <li>Ensure platform security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Data Protection</h2>
          <p>We protect your data through:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
            <li>Data encryption in transit and at rest</li>
            <li>Employee training and compliance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Data Sharing</h2>
          <p>We may share your data with:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Service providers and partners</li>
            <li>Legal authorities when required</li>
            <li>Property owners (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">6. Your Data Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Access your data</li>
            <li>Request data correction</li>
            <li>Request data deletion</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">7. Contact Us</h2>
          <p>For questions about our Data Policy, contact our Data Protection Officer at:</p>
          <div className="mt-2">
            <p>Email: dpo@midcproperty.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
