'use client';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import AdvertiseForm from './AdvertiseForm';

interface Package {
  name: string;
  price: string;
  duration: string;
  features: string[];
  recommended: boolean;
}

interface AdPackagesProps {
  adPackages: Package[];
}

export default function AdPackages({ adPackages }: AdPackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {adPackages.map((pkg) => (
          <div
            key={pkg.name}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 ${
              pkg.recommended ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {pkg.recommended && (
              <div className="bg-blue-500 text-white text-center py-2">
                <span className="text-sm font-semibold">RECOMMENDED</span>
              </div>
            )}
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{pkg.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                <span className="text-gray-600">/{pkg.duration}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePackageSelect(pkg)}
                className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
                  pkg.recommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Select Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <AdvertiseForm
          selectedPackage={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </>
  );
}
