import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 18.5204, // Pune coordinates
  lng: 73.8567
};

export default function PropertyMap() {
  const [map, setMap] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const onLoad = (map: any) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Sample markers - replace with actual property data */}
        <Marker
          position={{ lat: 18.5204, lng: 73.8567 }}
          title="Sample Property"
        />
      </GoogleMap>
    </LoadScript>
  );
}
