import React from 'react';

export const VegIndicator = ({ isVeg, className = "" }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {isVeg ? (
        <div className="w-4 h-4 border-2 border-emerald-600 rounded-sm flex items-center justify-center p-[2px]" title="Pure Veg">
          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
        </div>
      ) : (
        <div className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center p-[2px]" title="Non-Veg">
          <div className="w-0 h-0 border-x-[4px] border-x-transparent border-b-[7px] border-b-red-600"></div>
        </div>
      )}
    </div>
  );
};
