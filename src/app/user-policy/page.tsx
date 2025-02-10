'use client';

import { motion } from 'framer-motion';

export default function UserPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">User Policy</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Account Creation and Management</h2>
          <p>Users must:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Be at least 18 years old</li>
            <li>Provide accurate information</li>
            <li>Maintain account security</li>
            <li>Not share account credentials</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. User Conduct</h2>
          <p>Users are expected to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Behave professionally and respectfully</li>
            <li>Not engage in fraudulent activities</li>
            <li>Not harass other users</li>
            <li>Respect intellectual property rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Content Guidelines</h2>
          <p>When posting content, users must:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Provide accurate property information</li>
            <li>Use appropriate language</li>
            <li>Not post discriminatory content</li>
            <li>Respect copyright laws</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Communication Rules</h2>
          <p>Users should:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Respond to inquiries promptly</li>
            <li>Maintain professional communication</li>
            <li>Not send spam or unsolicited messages</li>
            <li>Report inappropriate behavior</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Property Listings</h2>
          <p>Property listers must:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Have legal right to list properties</li>
            <li>Provide accurate descriptions</li>
            <li>Update listing status promptly</li>
            <li>Include clear terms and conditions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">6. Violations and Enforcement</h2>
          <p>We may take action against accounts that:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Violate these policies</li>
            <li>Engage in fraudulent activities</li>
            <li>Harass other users</li>
            <li>Misuse our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">7. Contact Us</h2>
          <p>For questions about our User Policy or to report violations, contact us at:</p>
          <div className="mt-2">
            <p>Email: support@midcproperty.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
