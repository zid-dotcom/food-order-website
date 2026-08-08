import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Search, ShoppingBag, User, ChevronDown, UtensilsCrossed, Menu, X, ArrowUpRight, Percent, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { LocationModal } from './LocationModal';

  

export const MobileHeader = () => {
  const { selectedLocation, user } = useAuth();
  const { totalCount } = useCart();
  const location = useLocation();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
      
     
  if (location.pathname === '/') {
    return null;
  }
     
  return (
    <>
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 shadow-xs">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 cursor-pointer">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              FOOD<span className="text-orange-500">LY</span>
            </span>
          </Link>
  
          {/* Location pill */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 truncate max-w-[130px]"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="truncate">{selectedLocation.name}</span>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/search" className="p-1.5 text-gray-600 hover:text-orange-500">
              <Search className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="relative p-1.5 text-gray-600 hover:text-orange-500">
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>
       
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-700 hover:text-orange-500 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

    

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-3 animate-slideDown bg-white">
            {/* "Get the App ↗" button */}
            <Link
              to="/help"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between border-2 border-orange-500 bg-orange-50 hover:bg-orange-100 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-orange-600 transition-all shadow-xs"
            >
              <span>Get the App</span>
              <ArrowUpRight className="w-4 h-4 text-orange-600 stroke-[2.5]" />
            </Link>

            <div className="space-y-1.5 text-xs font-semibold text-gray-800">
              <Link
                to="/search"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-gray-50 text-gray-700"
              >
                <Search className="w-4 h-4 text-gray-500" />
                <span>Search Restaurants & Food</span>
              </Link>

              <Link
                to="/offers"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 text-gray-700"
              >
                <div className="flex items-center gap-2.5">
                  <Percent className="w-4 h-4 text-amber-500" />
                  <span>Offers & Coupons</span>
                </div>
                <span className="text-[10px] bg-orange-500 text-white font-extrabold px-1.5 py-0.5 rounded uppercase">NEW</span>
              </Link>

              <Link
                to="/help"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-gray-50 text-gray-700"
              >
                <HelpCircle className="w-4 h-4 text-gray-500" />
                <span>Help & Customer Support</span>
              </Link>
 
              <Link
                to="/help"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 text-gray-700"
              >
                <span>Foodly Corporate</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>

              <Link
                to="/help"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 text-gray-700"
              >
                <span>Partner with us</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>

              {user.isLoggedIn ? (
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 bg-gray-900 rounded-xl text-white mt-2 font-bold text-xs"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-400" />
                    <span>{user.name}</span>
                  </div>
                  <span className="text-[10px] text-orange-300">Profile &rarr;</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center py-2.5 px-3 bg-orange-500 text-white rounded-xl mt-2 font-bold text-xs"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
};
