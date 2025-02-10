import { Metadata } from 'next';
import AdPackages from '@/components/advertise/AdPackages';

export const metadata: Metadata = {
  title: 'Advertising Packages | MIDC Property',
  description: 'Choose from our range of advertising packages to promote your property to targeted investors and businesses.',
};

const adPackages = [
  {
    name: 'Basic Listing',
    price: '₹4,999',
    duration: '30 days',
    features: [
      'Standard Property Listing',
      'Basic Search Visibility',
      'Photo Gallery (up to 5 images)',
      'Contact Form Integration',
      'Basic Analytics'
    ],
    recommended: false
  },
  {
    name: 'Premium Featured',
    price: '₹9,999',
    duration: '30 days',
    features: [
      'Premium Property Listing',
      'Featured in Search Results',
      'Photo Gallery (up to 15 images)',
      'Virtual Tour Integration',
      'Priority Support',
      'Detailed Analytics',
      'Social Media Promotion',
      'Newsletter Feature'
    ],
    recommended: true
  },
  {
    name: 'Banner Advertising',
    price: '₹14,999',
    duration: '30 days',
    features: [
      'Premium Banner Placement',
      'Homepage Visibility',
      'Category Page Presence',
      'Custom Design Support',
      'Click Analytics',
      'Performance Reports',
      'Target Audience Insights',
      'A/B Testing Options'
    ],
    recommended: false
  }
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advertising Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect advertising package to showcase your property and reach our targeted audience of investors and businesses.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Advertise with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Targeted Reach</h3>
              <p className="text-gray-600">
                Connect with serious property investors and businesses actively looking for industrial and commercial properties.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Premium Visibility</h3>
              <p className="text-gray-600">
                Get featured placement across our platform with enhanced visibility in search results and category pages.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Comprehensive Analytics</h3>
              <p className="text-gray-600">
                Track your ad performance with detailed analytics and insights to optimize your marketing strategy.
              </p>
            </div>
          </div>
        </div>

        {/* Packages Component */}
        <AdPackages adPackages={adPackages} />

        {/* Custom Solutions */}
        <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-300 mb-6">
              We offer tailored advertising solutions to meet your specific needs. Contact our advertising team to discuss custom packages.
            </p>
            <div className="space-y-4">
              <p className="text-gray-300">
                Email: <a href="mailto:contact@midcproperty.in" className="text-blue-400 hover:text-blue-300">contact@midcproperty.in</a>
              </p>
              <p className="text-gray-300">
                Call: <a href="tel:+917977161299" className="text-blue-400 hover:text-blue-300">+91 7977161299</a>
              </p>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            * All prices are exclusive of applicable taxes. Terms and conditions apply.
            <br />
            Packages and pricing are subject to change without prior notice.
          </p>
        </div>
      </div>
    </div>
  );
}
