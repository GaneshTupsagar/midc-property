'use client';

import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Range } from 'react-range';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  location: string;
  propertyType: string;
  area: {
    min: number;
    max: number;
  };
  listingType: string;
  priceRange: {
    min: number;
    max: number;
  };
}

const PropertyFilters = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    propertyType: '',
    area: { min: 0, max: 10000 },
    listingType: '',
    priceRange: { min: 0, max: 10000000 }
  });

  const locations = [
    'Pune',
    'Mumbai',
    'Nashik',
    'Aurangabad',
    'Nagpur'
  ];

  const propertyTypes = [
    'Industrial Shed',
    'Factory',
    'Warehouse',
    'Open Land',
    'Office Space'
  ];

  const listingTypes = [
    'Lease',
    'Sale'
  ];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between items-center px-4 py-2 bg-gray-50 rounded-lg">
              <span className="font-medium">Advanced Filters</span>
              <ChevronDownIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-4 pt-4">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area Range (sq. ft.)
                </label>
                <div className="px-2 py-4">
                  <Range
                    step={100}
                    min={0}
                    max={10000}
                    values={[filters.area.min, filters.area.max]}
                    onChange={(values) =>
                      handleFilterChange('area', { min: values[0], max: values[1] })
                    }
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="h-1 w-full bg-gray-200 rounded-full"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        className="h-4 w-4 bg-blue-600 rounded-full"
                      />
                    )}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{filters.area.min} sq.ft</span>
                    <span>{filters.area.max} sq.ft</span>
                  </div>
                </div>
              </div>

              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Type
                </label>
                <div className="flex gap-4">
                  {listingTypes.map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="listingType"
                        value={type}
                        checked={filters.listingType === type}
                        onChange={(e) => handleFilterChange('listingType', e.target.value)}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (₹)
                </label>
                <div className="px-2 py-4">
                  <Range
                    step={100000}
                    min={0}
                    max={10000000}
                    values={[filters.priceRange.min, filters.priceRange.max]}
                    onChange={(values) =>
                      handleFilterChange('priceRange', {
                        min: values[0],
                        max: values[1],
                      })
                    }
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="h-1 w-full bg-gray-200 rounded-full"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        className="h-4 w-4 bg-blue-600 rounded-full"
                      />
                    )}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>₹{(filters.priceRange.min / 100000).toFixed(1)}L</span>
                    <span>₹{(filters.priceRange.max / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default PropertyFilters;
