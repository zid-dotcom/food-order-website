import React from 'react';
import { Link } from 'react-router-dom';
import { RatingBadge } from '../common/RatingBadge';

export const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Top Image Container */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gray-100">
        <Link to={`/restaurants/${restaurant.id}`} className="block w-full h-full">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75" />
        </Link>

        {/* Offer Tag Overlay */}
        {restaurant.offer && (
          <div className="absolute bottom-3 left-3 z-10 font-semibold text-white text-xs sm:text-sm tracking-wide uppercase drop-shadow-sm">
            {restaurant.offer}
          </div>
        )}
      </div>

      {/* Card Content */}
      <Link to={`/restaurants/${restaurant.id}`} className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Veg Badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            {restaurant.isPureVeg && (
              <span className="shrink-0 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded uppercase">
                PURE VEG
              </span>
            )}
          </div>

          {/* Rating + Delivery Time */}
          <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-gray-600">
            <RatingBadge rating={restaurant.rating} size="sm" />
            <span className="text-gray-300">•</span>
            <span>{restaurant.deliveryTime}</span>
          </div>

          {/* Cuisines */}
          <div className="text-xs text-gray-500 font-normal truncate mt-1.5">
            {restaurant.cuisines.join(', ')}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-normal text-gray-500">
          <span>{restaurant.location}</span>
          <span className="text-gray-700 font-medium">₹{restaurant.priceForTwo} for two</span>
        </div>
      </Link>
    </div>
  );
};
