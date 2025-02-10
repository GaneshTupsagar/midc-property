'use client';

import { useState, useEffect } from 'react';

interface MetaTag {
  id: number;
  page: string;
  title: string;
  description: string;
}

export default function SEOMetaManager() {
  const [metaTags, setMetaTags] = useState<MetaTag[]>([
    {
      id: 1,
      page: '/',
      title: 'MIDC Property - Find Industrial Properties, Plots & Warehouses',
      description: 'Find the best industrial properties, plots, and warehouses in MIDC areas. Browse through our extensive collection of industrial real estate listings.'
    },
    {
      id: 2,
      page: '/properties',
      title: 'Industrial Properties for Sale & Rent | MIDC Property',
      description: 'Explore industrial properties for sale and rent in MIDC areas. Filter by location, type, and price to find the perfect industrial space for your business.'
    }
  ]);

  const [selectedMeta, setSelectedMeta] = useState<MetaTag | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (meta: MetaTag) => {
    setSelectedMeta(meta);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedMeta) {
      setMetaTags(metaTags.map(meta => 
        meta.id === selectedMeta.id ? selectedMeta : meta
      ));
      setIsEditing(false);
      setSelectedMeta(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedMeta(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Meta Tags Manager</h2>
      
      {isEditing && selectedMeta ? (
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Page</label>
            <input
              type="text"
              value={selectedMeta.page}
              onChange={(e) => setSelectedMeta({...selectedMeta, page: e.target.value})}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={selectedMeta.title}
              onChange={(e) => setSelectedMeta({...selectedMeta, title: e.target.value})}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={selectedMeta.description}
              onChange={(e) => setSelectedMeta({...selectedMeta, description: e.target.value})}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {metaTags.map((meta) => (
            <div key={meta.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-900">{meta.page}</h3>
                <button
                  onClick={() => handleEdit(meta)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Title:</span> {meta.title}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Description:</span> {meta.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
