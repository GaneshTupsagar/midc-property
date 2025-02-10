'use client';

import { useState } from 'react';
import { Range } from 'react-range';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([0, 100000000]); // 0 to 10 Cr
  const [areaRange, setAreaRange] = useState([0, 100000]); // 0 to 100,000 sq.ft
  const [expandedSections, setExpandedSections] = useState<string[]>(['type', 'location', 'price', 'area']);

  // Format price to Indian currency format with crores and lakhs
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Format area with commas
  const formatArea = (area: number) => {
    return `${area.toLocaleString('en-IN')} sq.ft`;
  };
  
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
    'Land': ['Industrial Plot', 'Commercial Plot']
  };

  const midicZones = {
    'Pune Region': [
      // Pune North
      'Chakan MIDC Phase I',
      'Chakan MIDC Phase II',
      'Chakan MIDC Phase III',
      'Chakan-Talegaon MIDC',
      'Talegaon MIDC Phase I',
      'Talegaon MIDC Phase II',
      'Talegaon MIDC Phase III',
      'Bhosari MIDC',
      'Pimpri-Chinchwad MIDC',
      'Sanaswadi MIDC',
      'Ranjangaon MIDC',
      'Koregaon Bhima MIDC',
      // Pune East
      'Wagholi Industrial Area',
      'Shikrapur Industrial Area',
      'Sanaswadi-Shikrapur MIDC',
      // Pune South
      'Kurkumbh MIDC',
      'Baramati MIDC',
      'Jejuri MIDC',
      'Shirwal MIDC',
      'Indapur MIDC',
      'Daund MIDC',
      'Yawat MIDC',
      'Kedgaon Industrial Area',
      // Pune West
      'Hinjewadi Phase I',
      'Hinjewadi Phase II',
      'Hinjewadi Phase III',
      'Mann MIDC',
      'Supa MIDC'
    ],
    'Mumbai & MMR Region': [
      // Mumbai City
      'Andheri MIDC',
      'Marol MIDC',
      'Chakala MIDC',
      'Chandivali MIDC',
      'Kanjurmarg Industrial Estate',
      'Ghatkopar Industrial Estate',
      // Navi Mumbai
      'Rabale MIDC',
      'Mahape MIDC',
      'TTC MIDC Navi Mumbai',
      'Turbhe MIDC',
      'Pawane MIDC',
      'Khairne MIDC',
      'Kopar Khairane MIDC',
      // Thane
      'Thane-Belapur MIDC',
      'Wagle Industrial Estate',
      'Kolshet Industrial Area',
      'Balkum Industrial Area',
      // Extended MMR
      'Taloja MIDC Phase I',
      'Taloja MIDC Phase II',
      'Patalganga MIDC',
      'Dombivli MIDC Phase I',
      'Dombivli MIDC Phase II',
      'Ambernath MIDC',
      'Badlapur MIDC',
      'Kalyan MIDC',
      'Bhiwandi Industrial Area',
      'Murbad MIDC',
      'Asangaon MIDC',
      'Shahapur Industrial Area'
    ],
    'Raigad Region': [
      // Panvel-Uran Belt
      'Panvel MIDC',
      'JNPT SEZ',
      'Uran Industrial Area',
      'Taloja MIDC',
      'Bhogaon MIDC',
      // Pen-Khopoli Belt
      'Pen MIDC',
      'Khopoli MIDC',
      'Khalapur Industrial Area',
      'Pali-Khopoli MIDC',
      // Roha-Mahad Belt
      'Roha MIDC',
      'Mahad MIDC',
      'Lote Parshuram MIDC',
      'Mangaon Industrial Area',
      'Pachad MIDC',
      'Dhatav MIDC'
    ],
    'Nashik Region': [
      // Nashik City
      'Ambad MIDC',
      'Satpur MIDC',
      'Gonde MIDC',
      'Ozar MIDC',
      'Sinnar MIDC Phase I',
      'Sinnar MIDC Phase II',
      'Sinnar MIDC Phase III',
      'Dindori MIDC',
      'Vinchur MIDC',
      // Extended Nashik
      'Malegaon MIDC',
      'Dhule MIDC',
      'Jalgaon MIDC',
      'Ahmednagar MIDC',
      'Nandgaon MIDC',
      'Igatpuri MIDC',
      'Manmad Industrial Area',
      'Yeola Industrial Area'
    ],
    'Aurangabad Region': [
      // Aurangabad City
      'Waluj MIDC',
      'Shendra MIDC',
      'Chikalthana MIDC',
      'Railway Station MIDC',
      'Bidkin Industrial Area',
      'Paithan MIDC',
      // Extended Region
      'Jalna MIDC',
      'Latur MIDC',
      'Nanded MIDC',
      'Osmanabad MIDC',
      'Beed MIDC',
      'Parbhani MIDC',
      'Hingoli MIDC',
      'Kannad MIDC',
      'Vaijapur MIDC'
    ],
    'Nagpur Region': [
      // Nagpur City
      'Butibori MIDC',
      'Hingna MIDC',
      'MIHAN SEZ',
      'Kalmeshwar MIDC',
      'Nagpur Industrial Area',
      'Hingna Road MIDC',
      // Vidarbha Region
      'Wardha MIDC',
      'Amravati MIDC',
      'Akola MIDC',
      'Chandrapur MIDC',
      'Yavatmal MIDC',
      'Gadchiroli MIDC',
      'Gondia MIDC',
      'Bhandara MIDC',
      'Umred MIDC'
    ],
    'Kolhapur Region': [
      // Kolhapur City
      'Shiroli MIDC',
      'Kagal MIDC',
      'Gokul Shirgaon MIDC',
      'Ichalkaranji MIDC',
      'Hatkanangale MIDC',
      // Sangli-Satara
      'Sangli MIDC',
      'Miraj MIDC',
      'Kupwad MIDC',
      'Satara MIDC',
      'Karad MIDC',
      // Extended Region
      'Jaysingpur Industrial Area',
      'Kodoli Industrial Area',
      'Palus MIDC',
      'Vita MIDC'
    ]
  };

  const propertySubTypes = [
    'Ready to Move',
    'Under Construction',
    'Shell and Core',
    'Built to Suit',
    'Plug and Play'
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
      
      {/* Property Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('type')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-2"
        >
          <span>Property Type</span>
          <ChevronDownIcon 
            className={`h-5 w-5 transform transition-transform ${
              expandedSections.includes('type') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('type') && (
          <div className="space-y-4">
            {Object.entries(propertyTypes).map(([category, types]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">{category}</h4>
                <div className="ml-4 space-y-2">
                  {types.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Property Sub-Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('subType')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-2"
        >
          <span>Property Status</span>
          <ChevronDownIcon 
            className={`h-5 w-5 transform transition-transform ${
              expandedSections.includes('subType') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('subType') && (
          <div className="space-y-2 ml-4">
            {propertySubTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Location */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('location')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-2"
        >
          <span>MIDC Zone</span>
          <ChevronDownIcon 
            className={`h-5 w-5 transform transition-transform ${
              expandedSections.includes('location') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('location') && (
          <div className="space-y-4">
            {Object.entries(midicZones).map(([region, zones]) => (
              <div key={region} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">{region}</h4>
                <div className="ml-4 space-y-2">
                  {zones.map((zone) => (
                    <label key={zone} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">{zone}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-2"
        >
          <span>Price Range</span>
          <ChevronDownIcon 
            className={`h-5 w-5 transform transition-transform ${
              expandedSections.includes('price') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('price') && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
            <Range
              step={1000000} // 10 Lakhs
              min={0}
              max={100000000} // 10 Cr
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 w-full bg-gray-200 rounded-full"
                >
                  <div
                    className="h-1 bg-primary rounded-full"
                    style={{
                      width: `${((priceRange[1] - priceRange[0]) / 100000000) * 100}%`,
                      left: `${(priceRange[0] / 100000000) * 100}%`,
                      position: 'absolute'
                    }}
                  />
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-4 w-4 bg-primary rounded-full shadow focus:outline-none"
                />
              )}
            />
          </div>
        )}
      </div>

      {/* Area Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('area')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-2"
        >
          <span>Area Range</span>
          <ChevronDownIcon 
            className={`h-5 w-5 transform transition-transform ${
              expandedSections.includes('area') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('area') && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatArea(areaRange[0])}</span>
              <span>{formatArea(areaRange[1])}</span>
            </div>
            <Range
              step={1000} // 1,000 sq.ft
              min={0}
              max={100000} // 100,000 sq.ft
              values={areaRange}
              onChange={(values) => setAreaRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 w-full bg-gray-200 rounded-full"
                >
                  <div
                    className="h-1 bg-primary rounded-full"
                    style={{
                      width: `${((areaRange[1] - areaRange[0]) / 100000) * 100}%`,
                      left: `${(areaRange[0] / 100000) * 100}%`,
                      position: 'absolute'
                    }}
                  />
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-4 w-4 bg-primary rounded-full shadow focus:outline-none"
                />
              )}
            />
          </div>
        )}
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary-dark transition-colors">
        Apply Filters
      </button>
    </div>
  );
}
