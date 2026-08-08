import React, { useState } from 'react';
import { X, MapPin, Navigation, Search, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LocationModal = ({ isOpen, onClose }) => {
  const { selectedLocation, setSelectedLocation } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const popularLocations = [
    { name: "Calicut", area: "Mavoor Road, Kerala" },
    { name: "Calicut", area: "Beach Road & Paragon Area" },
    { name: "Kochi", area: "MG Road, Ernakulam" },
    { name: "Kochi", area: "Fort Kochi & Mattancherry" },
    { name: "Trivandrum", area: "Kawdiar & Kowdiar Palace Area" },
    { name: "Bangalore", area: "Indiranagar, 100ft Road" },
    { name: "Bangalore", area: "Koramangala, 5th Block" },
    { name: "Chennai", area: "T. Nagar, Chennai" }
  ];

  if (!isOpen) return null;

  const filteredLocations = popularLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Choose Delivery Location</h2>
            <p className="text-xs text-gray-500">Select location to see restaurants near you</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Current GPS button */}
          <button
            onClick={() => handleSelect({ name: "Calicut", area: "Near current location (GPS)" })}
            className="w-full flex items-center gap-3 p-3.5 border border-orange-200 bg-orange-50/50 hover:bg-orange-50 rounded-lg text-left transition-colors cursor-pointer group"
          >
            <div className="p-2 bg-orange-500 text-white rounded-full">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-orange-600 group-hover:underline">
                Use Current Location
              </div>
              <div className="text-xs text-gray-500">Using GPS / Geolocation</div>
            </div>
          </button>

          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for area, street name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          {/* Popular Cities list */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Popular Delivery Locations
            </div>
            <div className="space-y-1">
              {filteredLocations.map((loc, idx) => {
                const isSelected = selectedLocation.area === loc.area;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(loc)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors cursor-pointer ${
                      isSelected ? "bg-orange-50 text-orange-600 font-semibold" : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className={`w-4 h-4 ${isSelected ? "text-orange-500" : "text-gray-400"}`} />
                      <div>
                        <div className="text-sm font-medium">{loc.name}</div>
                        <div className="text-xs text-gray-500">{loc.area}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-orange-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
