import React, { useState, useMemo } from 'react';
import { restaurants } from '../data/restaurants';
import { FilterBar } from '../components/discovery/FilterBar';
import { RestaurantGrid } from '../components/restaurant/RestaurantGrid';
import { Search } from 'lucide-react';

export const RestaurantsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    fastDelivery: false,
    rating4Plus: false,
    pureVeg: false,
    hasOffers: false
  });
  const [sortBy, setSortBy] = useState('relevance');

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some(c => c.toLowerCase().includes(q)) ||
        r.location.toLowerCase().includes(q)
      );
    }

    if (filters.fastDelivery) {
      result = result.filter(r => r.deliveryTimeMinutes <= 25);
    }
    if (filters.rating4Plus) {
      result = result.filter(r => r.rating >= 4.0);
    }
    if (filters.pureVeg) {
      result = result.filter(r => r.isPureVeg);
    }
    if (filters.hasOffers) {
      result = result.filter(r => Boolean(r.offer));
    }

    if (sortBy === 'deliveryTime') {
      result.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'costLowToHigh') {
      result.sort((a, b) => a.priceForTwo - b.priceForTwo);
    } else if (sortBy === 'costHighToLow') {
      result.sort((a, b) => b.priceForTwo - a.priceForTwo);
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Restaurants in Calicut
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Order online from top rated food spots near you
            </p>
          </div>

          {/* Quick inline search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurant or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filteredRestaurants.length}
      />

      {/* Grid */}
      <RestaurantGrid
        restaurants={filteredRestaurants}
        title={searchQuery ? `Search Results for "${searchQuery}"` : "All Restaurants"}
      />
    </div>
  );
};
