import React, { useState, useMemo } from 'react';
import { HeroHeader } from '../components/discovery/HeroHeader';
import { CategoryCarousel } from '../components/discovery/CategoryCarousel';
import { PromoBanner } from '../components/discovery/PromoBanner';
import { FilterBar } from '../components/discovery/FilterBar';
import { RestaurantGrid } from '../components/restaurant/RestaurantGrid';
import { restaurants } from '../data/restaurants';
import { ShieldCheck, Clock, Award } from 'lucide-react';

export const HomePage = () => {
  const [filters, setFilters] = useState({
    fastDelivery: false,
    rating4Plus: false,
    pureVeg: false,
    hasOffers: false
  });

  const [sortBy, setSortBy] = useState('relevance');

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

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
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header matching exact Swiggy layout */}
      <HeroHeader />

      {/* 1. Category Discovery */}
      <CategoryCarousel />

      {/* 2. Promotional Banners */}
      <PromoBanner />

      {/* 3. Filter Bar */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filteredRestaurants.length}
      />

      {/* 4. Restaurant Grid */}
      <RestaurantGrid
        restaurants={filteredRestaurants}
        title="Top restaurants near you"
      />

      {/* 5. Foodly Quality Banner */}
      <section className="py-12 bg-orange-50/50 border-t border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Why order on FOODLY?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Guaranteed freshness, hyper-local speed, and seamless ordering experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#ff5200] text-white rounded-xl shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900">Lightning Fast Delivery</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Average 25-minute delivery time powered by smart route optimization.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-emerald-600 text-white rounded-xl shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900">Hygiene & Safety First</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  100% verified kitchens adhering to high food safety standards.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-amber-500 text-white rounded-xl shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900">Best Price Guarantee</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Exclusive bank offers, flat discounts, and zero hidden platform charges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
