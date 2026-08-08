import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Search, ShoppingBag, Heart, AlertTriangle } from 'lucide-react';

export const EmptyState = ({
  icon = "food",
  title = "No items found",
  description = "Try searching for something else or explore restaurants.",
  actionText = "Explore Restaurants",
  actionLink = "/"
}) => {
  const icons = {
    food: Utensils,
    search: Search,
    cart: ShoppingBag,
    favorites: Heart,
    error: AlertTriangle
  };

  const IconComponent = icons[icon] || Utensils;

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 my-8 bg-white rounded-2xl border border-gray-100 max-w-md mx-auto">
      <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
        <IconComponent className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-md shadow-orange-500/20 text-sm cursor-pointer"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};
