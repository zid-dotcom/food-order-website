import React from 'react';
import { Home, Briefcase, MapPin, Check } from 'lucide-react';

export const AddressCard = ({ address, isSelected, onSelect }) => {
  const Icon = address.type === 'Work' ? Briefcase : address.type === 'Home' ? Home : MapPin;

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
        isSelected
          ? 'border-orange-500 bg-orange-50/30 shadow-2xs'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/40'
      }`}
    >
      <div className={`p-2 rounded-xl ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-800">{address.type}</span>
            {address.tag && (
              <span className="text-[10px] bg-orange-50 text-orange-600 border border-orange-100 font-medium px-1.5 py-0.5 rounded uppercase">
                {address.tag}
              </span>
            )}
          </div>
          {isSelected && (
            <div className="w-4 h-4 bg-orange-500 text-white rounded-full flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
          )}
        </div>

        <p className="text-xs text-gray-600 mt-1 leading-relaxed font-normal">
          {address.address}, {address.pincode}
        </p>

        {address.landmark && (
          <p className="text-[11px] text-gray-400 mt-0.5 font-normal">
            Landmark: {address.landmark}
          </p>
        )}
      </div>
    </div>
  );
};
