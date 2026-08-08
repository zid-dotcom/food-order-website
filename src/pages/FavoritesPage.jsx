import React, { useState } from 'react';
import { Heart, Utensils, Store } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { restaurants } from '../data/restaurants';
import { getRestaurantFoods } from '../data/foods';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { FoodCard } from '../components/restaurant/FoodCard';
import { EmptyState } from '../components/common/EmptyState';

export const FavoritesPage = () => {
  const { favoriteRestaurants, favoriteFoods } = useFavorites();
  const [activeTab, setActiveTab] = useState('restaurants'); // restaurants, foods

  const favRestObjects = restaurants.filter(r => favoriteRestaurants.includes(r.id));

  // Gather saved foods
  const favFoodObjects = React.useMemo(() => {
    const list = [];
    restaurants.forEach(rest => {
      const foods = getRestaurantFoods(rest.id);
      foods.forEach(food => {
        if (favoriteFoods.includes(food.id)) {
          list.push({ food, restaurant: rest });
        }
      });
    });
    return list;
  }, [favoriteFoods]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span>Your Favorites</span>
            </h1>
            <p className="text-xs text-gray-500 font-normal">Quick access to restaurants and dishes you love</p>
          </div>

          <div className="flex bg-white p-1 rounded-xl border border-gray-200 text-xs font-medium text-gray-600">
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'restaurants' ? 'bg-orange-500 text-white font-semibold shadow-2xs' : 'hover:bg-gray-100'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Restaurants ({favRestObjects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('foods')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'foods' ? 'bg-orange-500 text-white font-semibold shadow-2xs' : 'hover:bg-gray-100'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Dishes ({favFoodObjects.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Saved Restaurants */}
        {activeTab === 'restaurants' && (
          <div>
            {favRestObjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {favRestObjects.map(rest => (
                  <RestaurantCard key={rest.id} restaurant={rest} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="favorites"
                title="You haven't saved any restaurants yet"
                description="Tap the heart icon on any restaurant card to save your top favorite places."
                actionText="Explore Restaurants"
                actionLink="/"
              />
            )}
          </div>
        )}

        {/* Tab 2: Saved Dishes */}
        {activeTab === 'foods' && (
          <div>
            {favFoodObjects.length > 0 ? (
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs divide-y divide-gray-100">
                {favFoodObjects.map(({ food, restaurant }, idx) => (
                  <div key={idx} className="pt-3">
                    <div className="text-[11px] font-normal text-gray-400 mb-1">
                      From {restaurant.name}
                    </div>
                    <FoodCard food={food} restaurant={restaurant} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="favorites"
                title="You haven't saved any dishes yet"
                description="Click the heart button next to any food item to save your top favorite meals."
                actionText="Browse Food Menu"
                actionLink="/search"
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
};
