'use client';

import { useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [requirementData, setRequirementData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'industrial',
    location: '',
    areaRequired: '',
    budget: '',
    timeline: 'immediate',
    requirements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleRequirementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle requirement submission
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about industrial properties? Our team is here to help you.
            </p>
          </div>

          {/* Primary Contact */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{contactInfo.primary.name}</h3>
            <div className="space-y-4">
              <a
                href={`tel:${contactInfo.primary.phone}`}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <FaPhone className="mr-3" />
                {contactInfo.primary.phone}
              </a>
              <a
                href={`https://wa.me/${contactInfo.primary.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-green-600"
              >
                <FaWhatsapp className="mr-3" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Secondary Contact */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{contactInfo.secondary.name}</h3>
            <div className="space-y-4">
              <a
                href={`tel:${contactInfo.secondary.phone}`}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <FaPhone className="mr-3" />
                {contactInfo.secondary.phone}
              </a>
              <a
                href={`https://wa.me/${contactInfo.secondary.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-green-600"
              >
                <FaWhatsapp className="mr-3" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Office Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Office Location</h3>
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="mt-1 text-gray-600" />
              <p className="text-gray-600">
                MIDC Property<br />
                TTC Industrial Area<br />
                Navi Mumbai, Maharashtra<br />
                India
              </p>
            </div>
          </div>
        </div>

        {/* Post Your Requirement Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Post Your Requirement</h2>
          <form onSubmit={handleRequirementSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="req-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="req-name"
                  name="name"
                  value={requirementData.name}
                  onChange={(e) => setRequirementData({ ...requirementData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="req-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="req-email"
                  name="email"
                  value={requirementData.email}
                  onChange={(e) => setRequirementData({ ...requirementData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="req-phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="req-phone"
                name="phone"
                value={requirementData.phone}
                onChange={(e) => setRequirementData({ ...requirementData, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="req-property-type" className="block text-sm font-medium text-gray-700">
                Property Type
              </label>
              <select
                id="req-property-type"
                name="propertyType"
                value={requirementData.propertyType}
                onChange={(e) => setRequirementData({ ...requirementData, propertyType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="industrial">Industrial Property</option>
                <option value="warehouse">Warehouse</option>
                <option value="office">Office Space</option>
                <option value="land">Industrial Land</option>
                <option value="commercial">Commercial Property</option>
              </select>
            </div>

            <div>
              <label htmlFor="req-location" className="block text-sm font-medium text-gray-700">
                Preferred Location
              </label>
              <input
                type="text"
                id="req-location"
                name="location"
                value={requirementData.location}
                onChange={(e) => setRequirementData({ ...requirementData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., TTC Industrial Area, Navi Mumbai"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="req-area" className="block text-sm font-medium text-gray-700">
                  Area Required (sq ft)
                </label>
                <input
                  type="text"
                  id="req-area"
                  name="areaRequired"
                  value={requirementData.areaRequired}
                  onChange={(e) => setRequirementData({ ...requirementData, areaRequired: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 5000"
                  required
                />
              </div>

              <div>
                <label htmlFor="req-budget" className="block text-sm font-medium text-gray-700">
                  Budget (₹)
                </label>
                <input
                  type="text"
                  id="req-budget"
                  name="budget"
                  value={requirementData.budget}
                  onChange={(e) => setRequirementData({ ...requirementData, budget: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 50,00,000"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="req-timeline" className="block text-sm font-medium text-gray-700">
                Timeline
              </label>
              <select
                id="req-timeline"
                name="timeline"
                value={requirementData.timeline}
                onChange={(e) => setRequirementData({ ...requirementData, timeline: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="immediate">Immediate</option>
                <option value="1-3months">1-3 Months</option>
                <option value="3-6months">3-6 Months</option>
                <option value="6-12months">6-12 Months</option>
                <option value="future">Future Reference</option>
              </select>
            </div>

            <div>
              <label htmlFor="req-requirements" className="block text-sm font-medium text-gray-700">
                Additional Requirements
              </label>
              <textarea
                id="req-requirements"
                name="requirements"
                rows={4}
                value={requirementData.requirements}
                onChange={(e) => setRequirementData({ ...requirementData, requirements: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Please specify any additional requirements or preferences..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Requirement
            </button>
          </form>
        </div>
      </div>

      {/* General Contact Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
