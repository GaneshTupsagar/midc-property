'use client';

import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Terms of Service</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Acceptance of Terms</h2>
          <p>By accessing and using MIDC Property's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Service Description</h2>
          <p>MIDC Property provides an online platform for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Browsing and searching property listings</li>
            <li>Connecting with property owners and agents</li>
            <li>Accessing property-related information and resources</li>
            <li>Managing property listings and inquiries</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. User Obligations</h2>
          <p>Users of our service agree to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Provide accurate and truthful information</li>
            <li>Maintain the confidentiality of their account</li>
            <li>Not misuse or abuse our services</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Property Listings</h2>
          <p>All property listings must:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Contain accurate and current information</li>
            <li>Include only legitimate properties</li>
            <li>Comply with all real estate laws and regulations</li>
            <li>Not infringe on any third-party rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Limitation of Liability</h2>
          <p>MIDC Property is not responsible for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Accuracy of property listings</li>
            <li>User-generated content</li>
            <li>Transactions between users</li>
            <li>Third-party services or websites</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">6. Modifications</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">7. Contact Information</h2>
          <p>For questions about these Terms of Service, contact us at:</p>
          <div className="mt-2">
            <p>Email: legal@midcproperty.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
