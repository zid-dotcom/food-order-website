import React from 'react';
import { X } from 'lucide-react';

export const FilterChip = ({ label, active = false, onClick, onClear, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
        active
          ? 'bg-orange-500 text-white border-orange-500 shadow-2xs'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {Icon && <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-gray-400'}`} />}
      <span>{label}</span>
      {active && onClear && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="p-0.5 hover:bg-orange-600 rounded-full"
        >
          <X className="w-3 h-3 text-white" />
        </span>
      )}
    </button>
  );
};
