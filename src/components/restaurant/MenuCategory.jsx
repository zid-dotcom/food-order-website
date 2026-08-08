import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FoodCard } from './FoodCard';

export const MenuCategory = ({ title, foods, restaurant, isVegOnly = false }) => {
  const [isOpen, setIsOpen] = useState(true);

  const filteredFoods = isVegOnly ? foods.filter(f => f.isVeg) : foods;

  if (filteredFoods.length === 0) return null;

  return (
    <div className="border-b-8 border-gray-100 last:border-b-0 py-3 bg-white">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left transition-colors cursor-pointer group"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
          {title} ({filteredFoods.length})
        </h3>
        <div className="p-1 rounded-full text-gray-400 group-hover:text-orange-600">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-1 divide-y divide-gray-100">
          {filteredFoods.map(food => (
            <FoodCard key={food.id} food={food} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};
