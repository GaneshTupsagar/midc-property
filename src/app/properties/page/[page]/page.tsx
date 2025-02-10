import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PropertyList from '@/components/properties/PropertyList';
import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyMap from '@/components/properties/PropertyMap';

export const metadata: Metadata = {
  title: 'Properties | MIDC Property',
  description: 'Browse our extensive collection of MIDC industrial properties, including sheds, factories, warehouses, and more.',
};

interface Props {
  params: {
    page: string;
  };
}

export default function PropertiesPage({ params }: Props) {
  const page = parseInt(params.page);
  
  // Validate page number
  if (isNaN(page) || page < 1) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">MIDC Properties</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Section */}
          <div className="lg:col-span-1">
            <PropertyFilters />
          </div>

          {/* Properties List Section */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <PropertyList page={page} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
