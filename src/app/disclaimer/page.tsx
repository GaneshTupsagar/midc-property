'use client';

import { motion } from 'framer-motion';

export default function Disclaimer() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Disclaimer</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Information Accuracy</h2>
          <p>While we strive to provide accurate information:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>All property information is provided "as is"</li>
            <li>We cannot guarantee complete accuracy</li>
            <li>Users should verify information independently</li>
            <li>Prices and availability may change</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. No Professional Advice</h2>
          <p>Our platform:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Does not provide legal advice</li>
            <li>Does not provide financial advice</li>
            <li>Is not a substitute for professional services</li>
            <li>Should not be used for legal decisions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Third-Party Content</h2>
          <p>Regarding external content:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>We are not responsible for third-party content</li>
            <li>Links to external sites are for convenience only</li>
            <li>We do not endorse external content</li>
            <li>Users access external content at their own risk</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Property Transactions</h2>
          <p>Regarding property dealings:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>We are not party to any property transaction</li>
            <li>We do not guarantee property condition</li>
            <li>Users should conduct due diligence</li>
            <li>Professional inspection is recommended</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Limitation of Liability</h2>
          <p>We are not liable for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Direct or indirect damages</li>
            <li>Loss of business or profits</li>
            <li>Data loss or corruption</li>
            <li>Technical issues or service interruptions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">6. Changes to Platform</h2>
          <p>We reserve the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Modify or discontinue services</li>
            <li>Update features and functionality</li>
            <li>Change pricing and policies</li>
            <li>Remove content without notice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">7. Contact Us</h2>
          <p>For questions about this Disclaimer, contact us at:</p>
          <div className="mt-2">
            <p>Email: legal@midcproperty.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
