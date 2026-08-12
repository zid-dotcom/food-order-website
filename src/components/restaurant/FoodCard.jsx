import React from 'react';
import { Star } from 'lucide-react';
import { VegIndicator } from '../common/VegIndicator';
import { QuantitySelector } from '../common/QuantitySelector';
import { useCart } from '../../context/CartContext';

 
export const FoodCard = ({ food, restaurant }) => {
  const { getItemQty, addToCart, updateQty } = useCart();
  const qty = getItemQty(food.id);

  
  const handleAdd = () => {
    addToCart(food, restaurant);
  };
  
     
  return (
    <div className="py-4 border-b border-gray-100 flex items-start justify-between gap-4 last:border-0 hover:bg-gray-50/40 p-2 sm:p-3 rounded-2xl transition-colors">
  
      {/* Left: Info */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <VegIndicator isVeg={food.isVeg} />
          {food.isRecommended && (
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              ⭐ Bestseller
            </span>
          )}
        </div>

        <h4 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug">
          {food.name}
        </h4>

        <div className="text-xs sm:text-sm font-medium text-gray-700">
          ₹{food.price}
        </div>
   
        {food.rating && (
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-700">
            <Star className="w-3.5 h-3.5 fill-current text-emerald-600" />
            <span>{food.rating}</span>
            {food.ratingCount && (
              <span className="text-gray-400 font-normal">({food.ratingCount})</span>
            )}
          </div>
        )}
   
        < p className="text-xs text-gray-500 font-normal line-clamp-2 leading-relaxed pt-0.5 max-w-lg">
          {food.description}
        </p>
      </div>
   
      {/* Right: Image + ADD Button */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="relative w-28 h-28 sm:w-36 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-2xs">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
       
        {/* ADD Button overlay */}
        <div className="-mt-5 z-10">
          <QuantitySelector
            qty={qty}
            onAdd={handleAdd}
            onIncrease={() => updateQty(food.id, 1)}
            onDecrease={() => updateQty(food.id, -1)}
          />
        </div>
      </div>

    </div>
  );
};
