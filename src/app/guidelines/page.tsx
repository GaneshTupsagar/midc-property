'use client';

import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  BuildingOfficeIcon, 
  ScaleIcon,
  CurrencyRupeeIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
  MapIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const guidelines = [
  {
    title: 'Guide to Investing',
    description: 'Comprehensive guide for investing in MIDC industrial areas.',
    icon: CurrencyRupeeIcon,
    sections: [
      'Investment opportunities in various sectors',
      'Ease of Doing Business initiatives',
      'Single Window Clearance System',
      'Investment promotion schemes',
      'Sector-specific investment guidelines'
    ]
  },
  {
    title: 'Land Bank',
    description: 'Available land parcels and industrial plots across Maharashtra.',
    icon: MapIcon,
    sections: [
      'Available industrial plots',
      'Sector-wise land allocation',
      'Industrial area profiles',
      'Infrastructure facilities',
      'Land rates and premiums'
    ]
  },
  {
    title: 'Industrial Policies',
    description: 'Maharashtra Industrial Policy and MIDC regulations.',
    icon: DocumentTextIcon,
    sections: [
      'Industrial Policy 2023',
      'Sectoral policies',
      'MSME policies',
      'Environmental policies',
      'Special Economic Zone policies'
    ]
  },
  {
    title: 'Incentives & Schemes',
    description: 'Government incentives and support schemes for industries.',
    icon: ChartBarIcon,
    sections: [
      'Package Scheme of Incentives',
      'Sector-specific incentives',
      'MSME support schemes',
      'Export promotion incentives',
      'Special incentives for backward areas'
    ]
  },
  {
    title: 'Land Allotment Process',
    description: 'Step-by-step guide to MIDC land allotment procedures.',
    icon: BuildingOfficeIcon,
    sections: [
      'Online application process',
      'Documentation requirements',
      'Eligibility criteria',
      'Scrutiny and approval process',
      'Post-allotment compliance'
    ]
  },
  {
    title: 'Compliance Requirements',
    description: 'Essential compliance and regulatory requirements for MIDC units.',
    icon: ShieldCheckIcon,
    sections: [
      'Environmental clearances',
      'Building plan approvals',
      'Safety regulations',
      'Labor law compliance',
      'Periodic inspections'
    ]
  }
];

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">MIDC Guidelines</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Official guidelines and regulations for industrial property investment, development, and operations in Maharashtra.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <guideline.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {guideline.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {guideline.description}
                    </p>
                    <ul className="space-y-2">
                      {guideline.sections.map((section) => (
                        <li key={section} className="flex items-center text-sm text-gray-600">
                          <DocumentTextIcon className="h-4 w-4 text-primary mr-2" />
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <button 
                    className="text-primary hover:text-primary-dark font-medium text-sm flex items-center space-x-1"
                  >
                    <span>View detailed guidelines</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Contact us for detailed information and assistance with MIDC properties and regulations.
          </p>
        </div>
      </div>
    </main>
  );
}
