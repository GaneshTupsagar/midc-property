'use client';

import { motion } from 'framer-motion';

export default function Accessibility() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Accessibility Statement</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Our Commitment</h2>
          <p>MIDC Property is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Accessibility Features</h2>
          <p>Our website includes these accessibility features:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>ARIA landmarks and labels</li>
            <li>Proper heading hierarchy</li>
            <li>Alt text for images</li>
            <li>Keyboard navigation support</li>
            <li>Color contrast compliance</li>
            <li>Resizable text support</li>
            <li>Screen reader compatibility</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Standards</h2>
          <p>We aim to conform to these accessibility standards:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
            <li>WAI-ARIA 1.1 specifications</li>
            <li>Section 508 of the Rehabilitation Act</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Assistive Technologies</h2>
          <p>Our website supports various assistive technologies:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Screen readers</li>
            <li>Voice recognition software</li>
            <li>Screen magnification software</li>
            <li>Alternative input devices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Known Issues</h2>
          <p>We are working to resolve these known accessibility issues:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Some older PDF documents may not be fully accessible</li>
            <li>Some third-party content may not meet accessibility standards</li>
            <li>Legacy content may require updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">6. Feedback and Support</h2>
          <p>We welcome your feedback on our website's accessibility. If you:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Encounter any accessibility barriers</li>
            <li>Need assistance with any part of our website</li>
            <li>Have suggestions for improvement</li>
            <li>Want to report an accessibility issue</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">7. Contact Us</h2>
          <p>For accessibility-related assistance or feedback, please contact us at:</p>
          <div className="mt-2">
            <p>Email: accessibility@midcproperty.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>We aim to respond to accessibility feedback within 2 business days.</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
