import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartBar = () => {
  const { totalCount, grandTotal, currentRestaurant } = useCart();
  const location = useLocation();

  // Hide on cart, checkout, login, signup pages
  const hiddenPages = ['/cart', '/checkout', '/login', '/signup'];
  if (hiddenPages.includes(location.pathname) || totalCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-30 px-4 pointer-events-none max-w-4xl mx-auto">
      <div className="pointer-events-auto bg-emerald-800 text-white rounded-xl p-3 sm:p-3.5 shadow-xl shadow-emerald-950/20 flex items-center justify-between animate-slideUp">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs text-emerald-100 font-normal">
              {totalCount} {totalCount === 1 ? 'item' : 'items'} added
              {currentRestaurant?.name && ` from ${currentRestaurant.name}`}
            </div>
            <div className="text-base font-semibold text-white leading-none mt-0.5">
              ₹{grandTotal} <span className="text-xs font-normal text-emerald-200">plus taxes</span>
            </div>
          </div>
        </div>

        <Link
          to="/cart"
          className="flex items-center gap-1.5 bg-white text-emerald-800 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors shadow-2xs text-xs cursor-pointer"
        >
          <span>VIEW CART</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
