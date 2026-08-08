import React from 'react';
import { SlidersHorizontal, Zap, Star, Percent } from 'lucide-react';
import { FilterChip } from './FilterChip';

export const FilterBar = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  totalResults
}) => {
  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="py-3 bg-white sticky top-0 md:top-20 z-30 border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Chips Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold mr-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </div>

          <FilterChip
            label="Fast Delivery"
            icon={Zap}
            active={filters.fastDelivery}
            onClick={() => toggleFilter('fastDelivery')}
            onClear={() => setFilters(prev => ({ ...prev, fastDelivery: false }))}
          />

          <FilterChip
            label="Rating 4.0+"
            icon={Star}
            active={filters.rating4Plus}
            onClick={() => toggleFilter('rating4Plus')}
            onClear={() => setFilters(prev => ({ ...prev, rating4Plus: false }))}
          />

          <FilterChip
            label="Pure Veg"
            active={filters.pureVeg}
            onClick={() => toggleFilter('pureVeg')}
            onClear={() => setFilters(prev => ({ ...prev, pureVeg: false }))}
          />

          <FilterChip
            label="Offers"
            icon={Percent}
            active={filters.hasOffers}
            onClick={() => toggleFilter('hasOffers')}
            onClear={() => setFilters(prev => ({ ...prev, hasOffers: false }))}
          />
        </div>

        {/* Right: Sort Dropdown & Count */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 text-xs font-medium text-gray-600">
          {totalResults !== undefined && (
            <span className="text-gray-500 font-medium">{totalResults} Places</span>
          )}

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 py-1 px-2.5 rounded-lg text-xs font-medium focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="deliveryTime">Delivery Time</option>
              <option value="rating">Rating: High to Low</option>
              <option value="costLowToHigh">Cost: Low to High</option>
              <option value="costHighToLow">Cost: High to Low</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
