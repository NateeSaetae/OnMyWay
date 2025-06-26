import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ coordinates, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return coordinates ? <Marker position={[coordinates.lat, coordinates.lng]} /> : null;
};

export const Map = ({ coordinates, onLocationSelect, onPlaceNameChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef(null);

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const location = data[0];
        const coords = {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon)
        };
        
        onLocationSelect(coords);
        if (onPlaceNameChange) {
          onPlaceNameChange(location.display_name.split(',')[0]);
        }
        
        // Center map on found location
        if (mapRef.current) {
          mapRef.current.setView([coords.lat, coords.lng], 10);
        }
      }
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <div className="h-64 w-full relative rounded-lg overflow-hidden">
      <div className="absolute top-4 left-12 right-4 z-[1000]">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 pr-10 bg-white rounded-lg shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <button
            onClick={searchLocation}
            disabled={isSearching}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      
      <MapContainer
        ref={mapRef}
        center={coordinates ? [coordinates.lat, coordinates.lng] : [40.7128, -74.0060]}
        zoom={coordinates ? 10 : 2}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker coordinates={coordinates} onLocationSelect={onLocationSelect} />
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 right-4 z-[1000]">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600 text-center">
          Click on the map to pin your location or use the search above
        </div>
      </div>
    </div>
  );
};