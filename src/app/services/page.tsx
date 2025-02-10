import { Metadata } from 'next';
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon, 
  ScaleIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Services | MIDC Property',
  description: 'Comprehensive MIDC property services including property search, documentation, legal assistance, and more.',
};

const services = [
  {
    title: 'Property Search',
    description: 'Find the perfect MIDC property matching your requirements with our advanced search tools.',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'Documentation Support',
    description: 'Complete assistance with all MIDC property documentation and paperwork.',
    icon: DocumentTextIcon,
  },
  {
    title: 'Legal Assistance',
    description: 'Expert legal guidance for property transactions and MIDC compliance.',
    icon: ScaleIcon,
  },
  {
    title: 'Site Visits',
    description: 'Organized site visits with experienced property consultants.',
    icon: MapPinIcon,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
