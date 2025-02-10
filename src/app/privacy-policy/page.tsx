'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Name and contact information</li>
            <li>Property preferences and search history</li>
            <li>Account credentials</li>
            <li>Communication history with our team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Provide and improve our services</li>
            <li>Personalize your experience</li>
            <li>Process your transactions</li>
            <li>Communicate with you about our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Service providers who assist in our operations</li>
            <li>Property owners or agents when necessary</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className="mt-2">
            <p>Email: privacy@midcproperty.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
