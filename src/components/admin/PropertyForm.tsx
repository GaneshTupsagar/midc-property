'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface PropertyFormProps {
  property?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const PropertyForm = ({ property, onSubmit, onClose }: PropertyFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Industrial Shed',
    price: '',
    area: {
      value: '',
      unit: 'sq.ft'
    },
    plotSize: {
      value: '',
      unit: 'sq.ft'
    },
    listingType: 'Sale',
    status: 'Active',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: ''
    },
    specifications: {
      floorHeight: {
        value: '',
        unit: 'ft'
      },
      power: {
        value: '',
        unit: 'KVA'
      },
      facing: '',
      floorNumber: '',
      parking: {
        cars: 0,
        trucks: 0,
        containerMovement: false
      },
      loadingPlatform: {
        available: false,
        count: 0,
        height: {
          value: '',
          unit: 'ft'
        }
      }
    },
    nearbyFacilities: [] as any[],
    images: [] as File[],
    ...property
  });

  const [mapCenter, setMapCenter] = useState({
    lat: property?.location?.lat || 19.0760,
    lng: property?.location?.lng || 72.8777
  });

  const propertyTypes = [
    'Industrial Shed',
    'Factory',
    'Warehouse',
    'Open Land',
    'Office Space',
    'Industrial Plot'
  ];

  const areaUnits = ['sq.ft', 'sq.m', 'hectare', 'acre', 'guntha'];
  const powerUnits = ['HP', 'KW', 'KVA'];
  const lengthUnits = ['ft', 'm'];
  const facingOptions = [
    'East', 'West', 'North', 'South',
    'North-East', 'North-West', 'South-East', 'South-West'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSelect = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          lat,
          lng
        }
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData for image upload
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData.images.forEach((image: File) => {
          submitData.append('images', image);
        });
      } else if (key === 'location' || key === 'nearbyFacilities' || key === 'specifications') {
        submitData.append(key, JSON.stringify(formData[key]));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    onSubmit(submitData);
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6">
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Area</label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="number"
                        name="area.value"
                        value={formData.area.value}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <select
                        name="area.unit"
                        value={formData.area.unit}
                        onChange={handleInputChange}
                        className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {areaUnits.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plot Size</label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="number"
                        name="plotSize.value"
                        value={formData.plotSize.value}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <select
                        name="plotSize.unit"
                        value={formData.plotSize.unit}
                        onChange={handleInputChange}
                        className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {areaUnits.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Listing Type</label>
                    <select
                      name="listingType"
                      value={formData.listingType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Sale">Sale</option>
                      <option value="Lease">Lease</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Sold">Sold</option>
                      <option value="Leased">Leased</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Map and Images */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="h-[300px] w-full">
                    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                      <GoogleMap
                        mapContainerStyle={{ height: '100%', width: '100%' }}
                        center={mapCenter}
                        zoom={13}
                        onClick={handleLocationSelect}
                      >
                        {formData.location && (
                          <Marker
                            position={{
                              lat: formData.location.lat,
                              lng: formData.location.lng
                            }}
                          />
                        )}
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              {/* Specifications Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900">Property Specifications</h3>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {/* Floor Height */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Floor Height</label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="number"
                        name="specifications.floorHeight.value"
                        value={formData.specifications.floorHeight.value}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <select
                        name="specifications.floorHeight.unit"
                        value={formData.specifications.floorHeight.unit}
                        onChange={handleInputChange}
                        className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        {lengthUnits.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Power */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Power Supply</label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="number"
                        name="specifications.power.value"
                        value={formData.specifications.power.value}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <select
                        name="specifications.power.unit"
                        value={formData.specifications.power.unit}
                        onChange={handleInputChange}
                        className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        {powerUnits.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Facing */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Facing Direction</label>
                    <select
                      name="specifications.facing"
                      value={formData.specifications.facing}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select Facing</option>
                      {facingOptions.map(facing => (
                        <option key={facing} value={facing}>{facing}</option>
                      ))}
                    </select>
                  </div>

                  {/* Floor Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Floor Number</label>
                    <input
                      type="number"
                      name="specifications.floorNumber"
                      value={formData.specifications.floorNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Parking */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Parking</label>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">Car Parking Spots</label>
                        <input
                          type="number"
                          name="specifications.parking.cars"
                          value={formData.specifications.parking.cars}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Truck Parking Spots</label>
                        <input
                          type="number"
                          name="specifications.parking.trucks"
                          value={formData.specifications.parking.trucks}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="specifications.parking.containerMovement"
                          checked={formData.specifications.parking.containerMovement}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: e.target.name,
                              value: e.target.checked
                            }
                          } as any)}
                          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Container Movement Available</span>
                      </label>
                    </div>
                  </div>

                  {/* Loading Platform */}
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Loading Platform</label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="specifications.loadingPlatform.available"
                          checked={formData.specifications.loadingPlatform.available}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: e.target.name,
                              value: e.target.checked
                            }
                          } as any)}
                          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Loading Platform Available</span>
                      </label>
                    </div>
                    {formData.specifications.loadingPlatform.available && (
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600">Number of Platforms</label>
                          <input
                            type="number"
                            name="specifications.loadingPlatform.count"
                            value={formData.specifications.loadingPlatform.count}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">Platform Height</label>
                          <div className="mt-1 flex gap-2">
                            <input
                              type="number"
                              name="specifications.loadingPlatform.height.value"
                              value={formData.specifications.loadingPlatform.height.value}
                              onChange={handleInputChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <select
                              name="specifications.loadingPlatform.height.unit"
                              value={formData.specifications.loadingPlatform.height.unit}
                              onChange={handleInputChange}
                              className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              {lengthUnits.map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {property ? 'Update Property' : 'Add Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default PropertyForm;
