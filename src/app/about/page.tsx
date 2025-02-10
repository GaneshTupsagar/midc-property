import { Metadata } from 'next';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'About Us | MIDC Property',
  description: 'Learn about our mission to simplify MIDC property transactions and our expert team.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We are dedicated to simplifying the process of finding and acquiring MIDC properties. 
              Our platform brings transparency and efficiency to industrial property transactions, 
              helping businesses find their ideal space in Maharashtra's industrial zones.
            </p>
            
            <div className="relative h-[300px] rounded-lg overflow-hidden mb-8 bg-gray-100 flex items-center justify-center">
              <UserGroupIcon className="h-32 w-32 text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Expert knowledge of MIDC regulations and procedures</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Comprehensive database of industrial properties</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>End-to-end support for property transactions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Dedicated team of industrial property experts</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Experience</h2>
            <p className="text-gray-600 mb-6">
              With years of experience in the MIDC property sector, we have successfully 
              helped numerous businesses find their ideal industrial spaces. Our deep 
              understanding of Maharashtra's industrial landscape and MIDC regulations 
              makes us the perfect partner for your property needs.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
