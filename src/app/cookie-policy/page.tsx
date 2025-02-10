'use client';

import { motion } from 'framer-motion';

export default function CookiePolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Cookie Policy</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. What Are Cookies?</h2>
          <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Remembering your preferences</li>
            <li>Understanding how you use our site</li>
            <li>Improving site functionality</li>
            <li>Personalizing content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">Essential Cookies</h3>
              <p>Required for basic site functionality and security.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Functional Cookies</h3>
              <p>Help remember your preferences and customize your experience.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Analytics Cookies</h3>
              <p>Help us understand how visitors interact with our website.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Marketing Cookies</h3>
              <p>Used to deliver relevant advertisements and track their effectiveness.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Cookie Management</h2>
          <p>You can manage cookies by:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Adjusting your browser settings</li>
            <li>Using our cookie preference center</li>
            <li>Opting out of specific cookie types</li>
            <li>Clearing cookies periodically</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Third-Party Cookies</h2>
          <p>We may use cookies from:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Analytics providers (e.g., Google Analytics)</li>
            <li>Advertising partners</li>
            <li>Social media platforms</li>
            <li>Content delivery networks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Cookie Duration</h2>
          <p>Cookies can be:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Session cookies (temporary)</li>
            <li>Persistent cookies (remain for a set time)</li>
            <li>Third-party cookies (set by other domains)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">6. Updates to This Policy</h2>
          <p>We may update this Cookie Policy periodically. Please check back regularly for any changes.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">7. Contact Us</h2>
          <p>For questions about our Cookie Policy, contact us at:</p>
          <div className="mt-2">
            <p>Email: privacy@midcproperty.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
