import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Search, Percent } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { getRestaurantFoods, menuCategories } from '../data/foods';
import { RatingBadge } from '../components/common/RatingBadge';
import { MenuCategory } from '../components/restaurant/MenuCategory';
import { EmptyState } from '../components/common/EmptyState';

export const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const restaurant = restaurants.find(r => r.id === id) || restaurants[0];
  const foods = getRestaurantFoods(restaurant.id);

  // Group foods by category
  const groupedFoods = menuCategories.map(cat => {
    let catFoods = foods.filter(f => f.category === cat || (cat === "Recommended" && f.isRecommended));
    if (searchQuery.trim()) {
      catFoods = catFoods.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return { title: cat, foods: catFoods };
  }).filter(group => group.foods.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Back breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-2.5">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-2 text-xs text-gray-500 font-normal">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <Link to="/restaurants" className="hover:text-orange-500">Restaurants</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{restaurant.name}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        
        {/* Restaurant Info Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
                {restaurant.name}
              </h1>

              <p className="text-xs text-gray-500 font-normal mt-1">
                {restaurant.cuisines.join(', ')}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 font-normal flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{restaurant.location}</span>
                <span>•</span>
                <span>{restaurant.distance}</span>
              </p>
            </div>

            {/* Rating badge card */}
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex sm:flex-col items-center justify-center text-center gap-2 shrink-0">
              <RatingBadge rating={restaurant.rating} size="lg" />
              <div className="text-[11px] text-gray-500 font-medium">
                {restaurant.ratingCount} Ratings
              </div>
            </div>
          </div>

          {/* Key Attributes Bar */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-5 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-300">|</span>
              <span>₹{restaurant.priceForTwo} for two</span>
            </div>
          </div>

          {/* Offers banner if any */}
          {restaurant.offer && (
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-2xl flex items-center gap-3">
              <Percent className="w-4 h-4 shrink-0" />
              <div>
                <div className="text-xs font-semibold uppercase">{restaurant.offer}</div>
                <div className="text-[11px] text-white/90 font-normal">Use promo code at checkout for maximum savings</div>
              </div>
            </div>
          )}
        </div>

        {/* Menu Search & Veg Toggle Bar */}
        <div className="sticky top-0 sm:top-20 z-20 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Veg Only Toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isVegOnly}
              onChange={(e) => setIsVegOnly(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
            />
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full inline-block" />
              PURE VEG ONLY
            </span>
          </label>

          {/* Search inside menu */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-normal focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
            />
          </div>

        </div>

        {/* Menu Categories List */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-2xs space-y-2">
          {groupedFoods.length > 0 ? (
            groupedFoods.map(group => (
              <MenuCategory
                key={group.title}
                title={group.title}
                foods={group.foods}
                restaurant={restaurant}
                isVegOnly={isVegOnly}
              />
            ))
          ) : (
            <EmptyState
              icon="search"
              title="No dishes found"
              description="Try searching for a different dish or clear your veg filter."
              actionText="Clear Filters"
              actionLink={`/restaurants/${restaurant.id}`}
            />
          )}
        </div>

      </div>
    </div>
  );
};
