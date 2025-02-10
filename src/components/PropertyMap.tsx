'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface Property {
  id: string;
  title: string;
  location: {
    lat: number;
    lng: number;
  };
  type: string;
  price: number;
  nearbyFacilities: {
    type: string;
    name: string;
    distance: string;
    location: {
      lat: number;
      lng: number;
    };
  }[];
}

const PropertyMap = ({ properties }: { properties: Property[] }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showNearbyFacilities, setShowNearbyFacilities] = useState(false);

  const mapCenter = {
    lat: 19.0760,  // Maharashtra center approximately
    lng: 72.8777
  };

  const mapStyles = {
    height: '600px',
    width: '100%'
  };

  const facilityIcons = {
    highway: '/icons/highway.png',
    railway: '/icons/railway.png',
    industry: '/icons/industry.png'
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="relative">
        <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md p-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showNearbyFacilities}
              onChange={(e) => setShowNearbyFacilities(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-sm font-medium">Show Nearby Facilities</span>
          </label>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={8}
          center={mapCenter}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          }}
        >
          {/* Property Markers */}
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={property.location}
              onClick={() => setSelectedProperty(property)}
              icon={{
                url: '/icons/property-marker.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          ))}

          {/* Nearby Facilities Markers */}
          {showNearbyFacilities && selectedProperty?.nearbyFacilities.map((facility, index) => (
            <Marker
              key={`${selectedProperty.id}-facility-${index}`}
              position={facility.location}
              icon={{
                url: facilityIcons[facility.type as keyof typeof facilityIcons] || '/icons/default.png',
                scaledSize: new google.maps.Size(30, 30)
              }}
            />
          ))}

          {/* Info Window for Selected Property */}
          {selectedProperty && (
            <InfoWindow
              position={selectedProperty.location}
              onCloseClick={() => setSelectedProperty(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-lg">{selectedProperty.title}</h3>
                <p className="text-gray-600">{selectedProperty.type}</p>
                <p className="text-blue-600 font-medium">₹{selectedProperty.price.toLocaleString()}</p>
                
                {showNearbyFacilities && (
                  <div className="mt-2">
                    <h4 className="font-medium text-sm">Nearby Facilities:</h4>
                    <ul className="text-sm">
                      {selectedProperty.nearbyFacilities.map((facility, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <img
                            src={facilityIcons[facility.type as keyof typeof facilityIcons]}
                            alt={facility.type}
                            className="w-4 h-4"
                          />
                          <span>{facility.name} ({facility.distance})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default PropertyMap;
