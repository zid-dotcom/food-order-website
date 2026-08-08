import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Percent, HelpCircle, User, ShoppingBag, MapPin, ChevronDown, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { LocationModal } from './LocationModal';

export const Navbar = () => {
  const { user, selectedLocation } = useAuth();
  const { totalCount } = useCart();
  const location = useLocation();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  if (location.pathname === '/') {
    return null;
  }

  return (
    <>
      <header className="hidden md:block sticky top-0 z-40 bg-white border-b border-gray-100 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Left: Brand + Location */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-800 group-hover:text-orange-500 transition-colors leading-none">
                  FOOD<span className="text-orange-500">LY</span>
                </span>
                <span className="text-[9px] font-medium tracking-widest text-gray-400 uppercase leading-none mt-1">
                  Food Delivery
                </span>
              </div>
            </Link>

            {/* Location Selector */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-left transition-colors cursor-pointer group border border-transparent hover:border-gray-200"
            >
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-gray-800 flex items-center gap-1 group-hover:text-orange-500 transition-colors">
                  {selectedLocation.name}
                  <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </span>
                <span className="text-[11px] text-gray-500 font-normal truncate max-w-[150px]">
                  {selectedLocation.area}
                </span>
              </div>
            </button>
          </div>

          {/* Right: Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-gray-700">
            <Link
              to="/search"
              className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${
                isActive('/search') ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>

            <Link
              to="/offers"
              className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${
                isActive('/offers') ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              <div className="relative">
                <Percent className="w-4 h-4 text-amber-500" />
                <span className="absolute -top-1 -right-1.5 text-[8px] bg-orange-500 text-white font-medium px-1 rounded-full uppercase">NEW</span>
              </div>
              <span>Offers</span>
            </Link>

            <Link
              to="/help"
              className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${
                isActive('/help') ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </Link>

            {user.isLoggedIn ? (
              <Link
                to="/profile"
                className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${
                  isActive('/profile') ? 'text-orange-500 font-semibold' : ''
                }`}
              >
                <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-xs">
                  {user.name.charAt(0)}
                </div>
                <span>{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${
                  isActive('/login') ? 'text-orange-500 font-semibold' : ''
                }`}
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}

            <Link
              to="/cart"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                totalCount > 0
                  ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-2xs font-semibold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {totalCount > 0 && (
                <span className="bg-white text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full ml-0.5">
                  {totalCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
};
