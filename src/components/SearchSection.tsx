'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  BoltIcon,
  BeakerIcon,
  ArrowPathIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  BookmarkIcon,
  HashtagIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchCriteria {
  listingType: string;
  propertyType: string;
  propertySubType: string;
  zone: string;
  priceRange: string;
  areaRange: string;
  keyword: string;
  specifications: {
    powerSupply: string;
    waterSupply: string;
    ceilingHeight: string;
    loadingDocks: string;
    parkingSpaces: string;
    [key: string]: string;
  };
  amenities: string[];
}

export default function SearchSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    listingType: 'all',
    propertyType: 'all',
    propertySubType: 'all',
    zone: '',
    priceRange: 'any',
    areaRange: 'any',
    keyword: '',
    specifications: {
      powerSupply: '',
      waterSupply: '',
      ceilingHeight: '',
      loadingDocks: '',
      parkingSpaces: '',
      floorStrength: '',
      craneCapacity: '',
      gasSupply: '',
      effluentTreatment: '',
      wasteManagement: ''
    },
    amenities: []
  });

  const propertyTypes = {
    'Industrial': [
      'Industrial Shed',
      'Factory',
      'Warehouse',
      'Industrial Gala',
      'Manufacturing Unit',
      'Assembly Unit'
    ],
    'Commercial': [
      'Office Space',
      'Commercial Shop',
      'Commercial Showroom',
      'IT Park Space'
    ],
    'Specialized': [
      'Cold Storage',
      'Data Center Space',
      'Research Center',
      'Laboratory Space',
      'Distribution Center',
      'Logistics Park'
    ],
    'Processing Units': [
      'Food Processing Unit',
      'Chemical Plant',
      'Pharmaceutical Unit'
    ],
    'Land': ['Industrial Land', 'Commercial Land']
  };

  const industrialZones = {
    'Mumbai Region': [
      'Andheri MIDC',
      'Thane-Belapur MIDC',
      'Taloja MIDC',
      'Patalganga MIDC'
    ],
    'Raigad Region': [
      'Patalganga Industrial Area',
      'Khopoli MIDC',
      'Roha MIDC',
      'Mahad MIDC',
      'Pen MIDC',
      'Lote Parshuram MIDC',
      'Mangaon Industrial Area',
      'Panvel Industrial Area',
      'Taloja Phase 2 MIDC'
    ],
    'Pune Region': [
      'Chakan MIDC',
      'Ranjangaon MIDC',
      'Talegaon MIDC',
      'Bhosari MIDC',
      'Pimpri-Chinchwad MIDC'
    ],
    'Aurangabad Region': [
      'Waluj MIDC',
      'Shendra MIDC',
      'Chikalthana MIDC'
    ],
    'Nashik Region': [
      'Ambad MIDC',
      'Satpur MIDC',
      'Sinnar MIDC'
    ],
    'Nagpur Region': [
      'Butibori MIDC',
      'Hingna MIDC',
      'Nagpur MIDC'
    ]
  };

  const additionalZones = {
    'Kolhapur Region': [
      'Shiroli MIDC',
      'Gokul Shirgaon MIDC',
      'Kagal MIDC'
    ],
    'Solapur Region': [
      'Chincholi MIDC',
      'Akkalkot MIDC',
      'Barshi MIDC'
    ],
    'Amravati Region': [
      'Amravati MIDC',
      'Achalpur MIDC',
      'Nandgaon Peth MIDC'
    ]
  };

  const listingTypes = [
    { label: 'All Listings', value: 'all' },
    { label: 'For Sale', value: 'sale' },
    { label: 'For Rent', value: 'rent' },
    { label: 'For Lease', value: 'lease' }
  ];

  const priceRanges = [
    { label: 'Any Price', value: 'any' },
    { label: 'Under ₹50L', value: '0-5000000' },
    { label: '₹50L - ₹1Cr', value: '5000000-10000000' },
    { label: '₹1Cr - ₹2Cr', value: '10000000-20000000' },
    { label: '₹2Cr - ₹5Cr', value: '20000000-50000000' },
    { label: 'Above ₹5Cr', value: '50000000-999999999' }
  ];

  const areaRanges = [
    { label: 'Any Size', value: 'any' },
    { label: 'Under 1,000 sq.ft', value: '0-1000' },
    { label: '1,000 - 2,500 sq.ft', value: '1000-2500' },
    { label: '2,500 - 5,000 sq.ft', value: '2500-5000' },
    { label: '5,000 - 10,000 sq.ft', value: '5000-10000' },
    { label: 'Above 10,000 sq.ft', value: '10000-999999' }
  ];

  const specifications = {
    'Basic Utilities': {
      powerSupply: {
        label: 'Power Supply',
        options: ['Any', 'Up to 100 KVA', '100-500 KVA', '500-1000 KVA', 'Above 1000 KVA']
      },
      waterSupply: {
        label: 'Water Supply',
        options: ['Any', 'Municipal', 'Borewell', 'Both']
      },
      gasSupply: {
        label: 'Gas Supply',
        options: ['Any', 'PNG Connection', 'LPG Storage', 'None']
      }
    },
    'Infrastructure': {
      ceilingHeight: {
        label: 'Ceiling Height',
        options: ['Any', 'Up to 15ft', '15-25ft', '25-35ft', 'Above 35ft']
      },
      floorStrength: {
        label: 'Floor Strength',
        options: ['Any', 'Up to 3T/m²', '3-5T/m²', '5-10T/m²', 'Above 10T/m²']
      },
      craneCapacity: {
        label: 'Crane Capacity',
        options: ['Any', 'Up to 5T', '5-10T', '10-20T', 'Above 20T']
      }
    },
    'Logistics': {
      loadingDocks: {
        label: 'Loading Docks',
        options: ['Any', '1-2', '3-5', '6-10', 'Above 10']
      },
      parkingSpaces: {
        label: 'Parking Spaces',
        options: ['Any', 'Up to 10', '10-25', '25-50', 'Above 50']
      }
    },
    'Environmental': {
      effluentTreatment: {
        label: 'Effluent Treatment',
        options: ['Any', 'ETP Available', 'STP Available', 'Both', 'None']
      },
      wasteManagement: {
        label: 'Waste Management',
        options: ['Any', 'Basic', 'Advanced', 'None']
      }
    }
  };

  const amenities = [
    'Security System',
    'Fire Safety System',
    'Power Backup',
    'Worker Accommodation',
    'Canteen Facility',
    'Conference Room',
    'Rain Water Harvesting',
    'Solar Power System',
    'Chemical Storage',
    'Quality Testing Lab',
    'Administrative Block',
    'Warehouse Management System'
  ];

  const handleSearchChange = (field: string, value: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificationChange = (field: string, value: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value
      }
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSaveSearch = async () => {
    if (!session) {
      // Show sign-in prompt
      return;
    }

    try {
      const response = await fetch('/api/saved-searches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: searchName,
          criteria: searchCriteria
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save search');
      }

      // Show success message
      setSearchName('');
    } catch (error) {
      // Show error message
      console.error('Error saving search:', error);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // Add basic criteria
    if (searchCriteria.listingType !== 'all') params.append('listingType', searchCriteria.listingType);
    if (searchCriteria.propertyType !== 'all') params.append('type', searchCriteria.propertyType);
    if (searchCriteria.propertySubType !== 'all') params.append('subType', searchCriteria.propertySubType);
    if (searchCriteria.zone) params.append('zone', searchCriteria.zone);
    if (searchCriteria.priceRange !== 'any') params.append('price', searchCriteria.priceRange);
    if (searchCriteria.areaRange !== 'any') params.append('area', searchCriteria.areaRange);
    if (searchCriteria.keyword) params.append('keyword', searchCriteria.keyword);

    // Add specifications
    Object.entries(searchCriteria.specifications).forEach(([key, value]) => {
      if (value && value !== 'Any') {
        params.append(`spec_${key}`, value);
      }
    });

    // Add amenities
    if (searchCriteria.amenities.length > 0) {
      params.append('amenities', searchCriteria.amenities.join(','));
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Find Your Perfect Industrial Property
            </h2>
            <p className="text-gray-300 text-lg">
              Search through Maharashtra's largest collection of MIDC properties
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-6">
            {/* Keyword Search */}
            <div className="mb-6">
              <div className="relative">
                <HashtagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchCriteria.keyword}
                  onChange={(e) => handleSearchChange('keyword', e.target.value)}
                  placeholder="Search by keyword (e.g., location, features, specifications)"
                  className="pl-10 pr-4 py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Basic Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Type
                </label>
                <div className="relative">
                  <CurrencyRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={searchCriteria.listingType}
                    onChange={(e) => handleSearchChange('listingType', e.target.value)}
                    className="pl-10 pr-4 py-2.5 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  >
                    {listingTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <div className="relative">
                  <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={searchCriteria.propertyType}
                    onChange={(e) => handleSearchChange('propertyType', e.target.value)}
                    className="pl-10 pr-4 py-2.5 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="all">All Types</option>
                    {Object.entries(propertyTypes).map(([category, types]) => (
                      <optgroup key={category} label={category}>
                        {types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location/Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location/Zone
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={searchCriteria.zone}
                    onChange={(e) => handleSearchChange('zone', e.target.value)}
                    className="pl-10 pr-4 py-2.5 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="">All Zones</option>
                    {Object.entries(industrialZones).map(([region, zones]) => (
                      <optgroup key={region} label={region}>
                        {zones.map(zone => (
                          <option key={zone} value={zone}>{zone}</option>
                        ))}
                      </optgroup>
                    ))}
                    {Object.entries(additionalZones).map(([region, zones]) => (
                      <optgroup key={region} label={region}>
                        {zones.map(zone => (
                          <option key={zone} value={zone}>{zone}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="relative">
                  <CurrencyRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={searchCriteria.priceRange}
                    onChange={(e) => handleSearchChange('priceRange', e.target.value)}
                    className="pl-10 pr-4 py-2.5 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  >
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Advanced Search Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
              </button>
            </div>

            {/* Advanced Search Options */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 mb-6"
                >
                  {/* Property Status and Area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Status
                      </label>
                      <select
                        value={searchCriteria.propertySubType}
                        onChange={(e) => handleSearchChange('propertySubType', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                      >
                        <option value="all">All Statuses</option>
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="Shell and Core">Shell and Core</option>
                        <option value="Built to Suit">Built to Suit</option>
                        <option value="Plug and Play">Plug and Play</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area Range
                      </label>
                      <select
                        value={searchCriteria.areaRange}
                        onChange={(e) => handleSearchChange('areaRange', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                      >
                        {areaRanges.map(range => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Specifications Toggle */}
                  <div>
                    <button
                      onClick={() => setShowSpecifications(!showSpecifications)}
                      className="flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
                    >
                      <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
                      <span>{showSpecifications ? 'Hide' : 'Show'} Specifications</span>
                    </button>
                  </div>

                  {/* Specifications */}
                  <AnimatePresence>
                    {showSpecifications && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                      >
                        {Object.entries(specifications).map(([category, fields]) => (
                          <div key={category}>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">{category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(fields).map(([field, { label, options }]) => (
                                <div key={field}>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {label}
                                  </label>
                                  <select
                                    value={searchCriteria.specifications[field]}
                                    onChange={(e) => handleSpecificationChange(field, e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                                  >
                                    {options.map(option => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {amenities.map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={searchCriteria.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Save Search */}
                  {session && (
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Name your search"
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                      />
                      <button
                        onClick={handleSaveSearch}
                        className="flex items-center px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
                      >
                        <BookmarkIcon className="h-5 w-5 mr-2" />
                        Save Search
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center space-x-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>Search Properties</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
