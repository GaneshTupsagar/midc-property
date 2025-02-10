import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-3">
        <PhoneIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-gray-900">Phone</h3>
          <p className="mt-1 text-sm text-gray-600">
            <a href="tel:+917977161299" className="hover:text-blue-600">
              +91 79771 61299
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <EnvelopeIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-gray-900">Email</h3>
          <p className="mt-1 text-sm text-gray-600">
            <a href="mailto:contact@midcproperty.com" className="hover:text-blue-600">
              contact@midcproperty.com
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <MapPinIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-gray-900">Office Address</h3>
          <p className="mt-1 text-sm text-gray-600">
            123 MIDC Road,<br />
            Industrial Area, Phase 1,<br />
            Pune, Maharashtra 411044
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Office Hours</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}
