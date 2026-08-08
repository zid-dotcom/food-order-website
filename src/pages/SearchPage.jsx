import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, TrendingUp, History } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { getRestaurantFoods } from '../data/foods';
import { categories } from '../data/categories';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { FoodCard } from '../components/restaurant/FoodCard';
import { EmptyState } from '../components/common/EmptyState';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery || initialCategory);
  const [recentSearches, setRecentSearches] = useState(['Biryani', 'Shawarma', 'Al Faham', 'Dosa', 'Parotta']);

  const popularSearches = [
    'Biryani', 'Chicken Shawarma', 'Pizza', 'Burger', 'Al Faham', 'Parotta', 'Dosa', 'Chinese Noodles', 'Thali Meals', 'Cold Coffee'
  ];

  useEffect(() => {
    if (initialCategory) {
      setQuery(initialCategory);
    }
  }, [initialCategory]);

  const handleSearchSelect = (term) => {
    setQuery(term);
    setSearchParams({ q: term });
    if (!recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSearchParams({});
  };

  // Filter matching restaurants & dishes
  const matchingRestaurants = restaurants.filter(r =>
    query.trim() && (
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisines.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
      r.location.toLowerCase().includes(query.toLowerCase())
    )
  );

  // Gather matching dishes across all restaurants
  const matchingDishes = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const allFoods = [];

    restaurants.forEach(rest => {
      const foods = getRestaurantFoods(rest.id);
      foods.forEach(food => {
        if (
          food.name.toLowerCase().includes(q) ||
          food.category.toLowerCase().includes(q) ||
          food.description.toLowerCase().includes(q)
        ) {
          allFoods.push({ food, restaurant: rest });
        }
      });
    });

    return allFoods;
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* Search Input Box */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-200 shadow-2xs sticky top-0 sm:top-20 z-30">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-orange-500" />
            <input
              type="text"
              placeholder="Search for restaurants, dishes or cuisines..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchParams({ q: e.target.value });
              }}
              className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all shadow-inner"
              autoFocus
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* If NO Query: Show Popular & Recent Searches + Categories */}
        {!hasQuery && (
          <div className="space-y-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  <History className="w-3.5 h-3.5 text-gray-400" />
                  <span>Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchSelect(term)}
                      className="px-3.5 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                <span>Popular Cuisines & Dishes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearchSelect(term)}
                    className="px-3 py-1.5 bg-orange-50/60 hover:bg-orange-500 hover:text-white border border-orange-100 rounded-xl text-xs font-medium text-orange-700 transition-all cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Explore Categories</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {categories.slice(0, 10).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSearchSelect(cat.name)}
                    className="p-3 bg-gray-50 hover:bg-orange-50 rounded-2xl border border-gray-100 text-center flex flex-col items-center gap-2 group transition-all cursor-pointer"
                  >
                    <img src={cat.image} alt={cat.name} className="w-11 h-11 rounded-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="text-xs font-medium text-gray-700 group-hover:text-orange-600">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* If Has Query: Show Matching Results */}
        {hasQuery && (
          <div className="space-y-6">
            
            {/* Matching Restaurants */}
            {matchingRestaurants.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
                <h3 className="text-base font-semibold text-gray-800">
                  Matching Restaurants ({matchingRestaurants.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchingRestaurants.map(rest => (
                    <RestaurantCard key={rest.id} restaurant={rest} />
                  ))}
                </div>
              </div>
            )}

            {/* Matching Dishes */}
            {matchingDishes.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
                <h3 className="text-base font-semibold text-gray-800">
                  Matching Dishes ({matchingDishes.length})
                </h3>
                <div className="divide-y divide-gray-100">
                  {matchingDishes.map(({ food, restaurant }, idx) => (
                    <div key={idx} className="pt-3">
                      <div className="text-[11px] font-normal text-gray-400 mb-1">
                        By <Link to={`/restaurants/${restaurant.id}`} className="text-orange-600 hover:underline font-medium">{restaurant.name}</Link>
                      </div>
                      <FoodCard food={food} restaurant={restaurant} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state if nothing matches */}
            {matchingRestaurants.length === 0 && matchingDishes.length === 0 && (
              <EmptyState
                icon="search"
                title={`No results for "${query}"`}
                description="We couldn't find any restaurants or dishes matching your search."
                actionText="Explore All Restaurants"
                actionLink="/restaurants"
              />
            )}

          </div>
        )}

      </div>
    </div>
  );
};
