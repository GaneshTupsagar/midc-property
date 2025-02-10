'use client';

import Link from 'next/link';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const contactInfo = {
  primary: {
    name: "Mr. Ganesh Tupsagar",
    phone: "+917977161299",
    whatsapp: "917977161299"
  },
  secondary: {
    name: "Mr. Abhijeet",
    phone: "+91937151174",
    whatsapp: "91937151174"
  }
};

const socialLinks = {
  facebook: "https://facebook.com/midcproperty",
  twitter: "https://twitter.com/midcproperty",
  linkedin: "https://linkedin.com/company/midcproperty",
  instagram: "https://instagram.com/midcproperty"
};

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">MIDC Property</h3>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect industrial property in Maharashtra.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                <p>TTC Industrial Area, Navi Mumbai, Maharashtra</p>
              </div>
              <a href="mailto:contact@midcproperty.in" 
                className="flex items-center text-gray-400 hover:text-white transition-colors">
                <FaEnvelope className="mr-2" />
                contact@midcproperty.in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-400 hover:text-white transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog & News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Primary Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <p className="font-medium text-blue-400">{contactInfo.primary.name}</p>
                <a
                  href={`tel:${contactInfo.primary.phone}`}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <FaPhone className="mr-2" />
                  {contactInfo.primary.phone}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.primary.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
            
            {/* Secondary Contact */}
            <div>
              <div className="space-y-3">
                <p className="font-medium text-blue-400">{contactInfo.secondary.name}</p>
                <a
                  href={`tel:${contactInfo.secondary.phone}`}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <FaPhone className="mr-2" />
                  {contactInfo.secondary.phone}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.secondary.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Advertise with Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Advertise with Us</h3>
            <div className="space-y-4">
              <p className="text-gray-400">
                Promote your property or service to our targeted audience of investors and businesses.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-300">Advertising Options:</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Featured Property Listings</li>
                  <li>• Banner Advertisements</li>
                  <li>• Newsletter Promotions</li>
                  <li>• Sponsored Content</li>
                </ul>
              </div>

              <div className="pt-2">
                <Link 
                  href="/advertise"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  View Ad Packages
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Social Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-800 pt-8 mt-8">
          {/* Newsletter Subscription */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h3 className="text-lg font-semibold mb-4">Disclaimer</h3>
          <div className="text-gray-400 text-sm space-y-4">
            <p>
              The information contained on this website is for general information purposes only. While we endeavor to keep 
              the information up to date and correct, MIDC Property makes no representations or warranties of any kind, 
              express or implied, about the completeness, accuracy, reliability, suitability or availability with respect 
              to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>
            <p>
              All property information, specifications, and prices are subject to change without notice. Images, floor plans, 
              and other visual representations are for illustrative purposes only and may differ from actual properties. 
              All measurements are approximate and should be independently verified.
            </p>
            <p>
              G.T.Enterprises and its representatives are not associated with MIDC (Maharashtra Industrial Development Corporation) 
              or any government body. We operate as an independent property consultancy service.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MIDC Property. All rights reserved.<br />
              <span className="text-gray-500">Developed by G.T.Enterprises - Ganesh Tupsagar</span>
            </div>
            <div className="flex space-x-4 text-sm text-gray-400 md:justify-end">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
