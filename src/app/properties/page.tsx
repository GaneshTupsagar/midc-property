import { Metadata } from 'next';
import PropertyList from '@/components/properties/PropertyList';
import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyMap from '@/components/properties/PropertyMap';
import NearbyProperties from '@/components/NearbyProperties';

export const metadata: Metadata = {
  title: 'Properties | MIDC Property',
  description: 'Browse our extensive collection of MIDC industrial properties, including sheds, factories, warehouses, and more.',
};

export default function PropertiesPage() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">MIDC Properties</h1>
        
        {/* Nearby Properties Section */}
        <div className="mb-12">
          <NearbyProperties />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Section */}
          <div className="lg:col-span-1">
            <PropertyFilters />
          </div>
          
          {/* Properties List and Map */}
          <div className="lg:col-span-2">
            <div className="mb-8 h-[400px] rounded-lg overflow-hidden">
              <PropertyMap />
            </div>
            <PropertyList />
          </div>
        </div>
      </div>
    </main>
  );
}
