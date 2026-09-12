import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Search, ChevronDown, UtensilsCrossed, ArrowRight, User, ShoppingBag, ArrowUpRight, Menu, X, Percent, HelpCircle, ShieldCheck, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { LocationModal } from '../common/LocationModal';

export const HeroHeader = () => {
  const navigate = useNavigate();
  const { user, selectedLocation } = useAuth();
  const { totalCount } = useCart();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <>
      <div className="relative bg-[#ff5200] text-white overflow-hidden pb-12 pt-4">
        
        {/* Top Navbar inside Hero */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between z-20 relative">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#ff5200] shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              FOOD<span className="text-orange-200">LY</span>
            </span>
          </Link>

          {/* Desktop Nav Options */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold">
            <Link to="/help" className="hover:text-orange-100 transition-colors">
              Foodly Corporate
            </Link>
            
            <Link to="/help" className="hover:text-orange-100 transition-colors">
              Partner with us
            </Link>

            {/* "Get the App ↗" button */}
            <Link
              to="/help"
              className="flex items-center gap-2 border-2 border-white hover:bg-white/10 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold text-white transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <span>Get the App</span>
              <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
            </Link>

            {/* Admin or Super Admin direct dashboard buttons */}
            {user.isLoggedIn && user.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 bg-black hover:bg-gray-900 border border-white/20 text-white px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer shadow-md"
              >
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            {user.isLoggedIn && user.role === 'super_admin' && (
              <Link
                to="/super-admin"
                className="flex items-center gap-1.5 bg-purple-900 hover:bg-purple-800 border border-purple-400/30 text-white px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer shadow-md"
              >
                <Crown className="w-4 h-4 text-purple-300" />
                <span>Super Admin</span>
              </Link>
            )}

            {user.isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-md"
              >
                <User className="w-4 h-4 text-orange-400" />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-black hover:bg-gray-900 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-md hover:scale-105"
              >
                Sign in
              </Link>
            )}

            {/* Cart shortcut */}
            <Link
              to="/cart"
              className="relative p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Header Actions (Cart + Menu Button) */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Expandable Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden max-w-7xl mx-auto px-4 py-4 z-30 relative bg-[#e04800] border-t border-b border-white/20 space-y-3 animate-slideDown shadow-xl">
            {/* "Get the App ↗" button in mobile menu */}
            <Link
              to="/help"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between border-2 border-white hover:bg-white/10 px-4 py-2.5 rounded-2xl text-sm font-extrabold text-white transition-all shadow-sm"
            >
              <span>Get the App</span>
              <ArrowUpRight className="w-5 h-5 text-white stroke-[2.5]" />
            </Link>

            <div className="space-y-1.5 pt-2 border-t border-white/10 text-sm font-bold">
              <Link
                to="/help"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                <span>Foodly Corporate</span>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/help"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                <span>Partner with us</span>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/offers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-amber-300" />
                  <span>Offers & Promo Codes</span>
                </div>
                <span className="text-[10px] bg-white text-orange-600 font-extrabold px-1.5 py-0.5 rounded uppercase">NEW</span>
              </Link>

              <Link
                to="/help"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </Link>

              {user.isLoggedIn && user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-4 bg-orange-700 rounded-xl text-white font-extrabold text-xs shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-200" />
                    <span>Admin Dashboard</span>
                  </div>
                  <span className="text-[10px] text-orange-200">Open &rarr;</span>
                </Link>
              )}

              {user.isLoggedIn && user.role === 'super_admin' && (
                <Link
                  to="/super-admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-4 bg-purple-900 rounded-xl text-white font-extrabold text-xs shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-purple-300" />
                    <span>Super Admin Console</span>
                  </div>
                  <span className="text-[10px] text-purple-300">Open &rarr;</span>
                </Link>
              )}

              {user.isLoggedIn ? (
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-4 bg-black rounded-xl text-white mt-2 font-extrabold text-xs"
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center py-2.5 px-4 bg-black rounded-xl text-white mt-2 font-extrabold text-xs"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Side Decorative Imagery */}
        <div className="hidden lg:block absolute left-0 top-12 w-64 xl:w-72 pointer-events-none opacity-90 select-none z-0">
          <img
            src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80"
            alt="Fresh Produce"
            className="w-full object-cover rounded-r-3xl shadow-2xl -rotate-12 translate-x-[-20%]"
          />
        </div>

        <div className="hidden lg:block absolute right-0 top-12 w-64 xl:w-72 pointer-events-none opacity-90 select-none z-0">
          <img
            src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=80"
            alt="Japanese Sushi & Food"
            className="w-full object-cover rounded-l-3xl shadow-2xl rotate-12 translate-x-[20%]"
          />
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto px-4 pt-6 sm:pt-8 pb-4 text-center z-10 relative space-y-5 sm:space-y-6">
          
          {/* Big Bold Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-sm">
            Order food. Shop groceries. <br className="hidden sm:inline" />
            <span className="underline decoration-orange-300 decoration-wavy underline-offset-8">Foodly it!</span>
          </h1>

          {/* Dual Input Search Container */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch bg-white rounded-2xl sm:rounded-full p-2 shadow-2xl text-gray-900 border-2 border-white/20 gap-2 sm:gap-0">
            
            {/* Left Box: Location Dropdown */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-2 px-4 py-3 sm:py-2.5 bg-gray-50 hover:bg-gray-100 sm:bg-transparent rounded-xl sm:rounded-l-full sm:border-r border-gray-200 text-left transition-colors cursor-pointer shrink-0 sm:w-64"
            >
              <MapPin className="w-5 h-5 text-[#ff5200] shrink-0" />
              <div className="flex-1 truncate">
                <div className="text-xs font-extrabold text-gray-900 flex items-center justify-between">
                  <span className="truncate">{selectedLocation.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1 shrink-0" />
                </div>
                <div className="text-[11px] text-gray-500 truncate">{selectedLocation.area}</div>
              </div>
            </button>

            {/* Right Box: Search Input */}
            <div className="flex-1 flex items-center px-4 py-2 sm:py-0">
              <input
                type="text"
                placeholder="Search for restaurant, item or more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button type="submit" className="p-2 text-gray-400 hover:text-[#ff5200] cursor-pointer">
                <Search className="w-5 h-5" />
              </button>
            </div>

          </form>

          {/* Two Large Feature Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 max-w-3xl mx-auto text-left">
            
            {/* Card 1: Food Delivery */}
            <div className="bg-white rounded-3xl p-6 text-gray-900 shadow-2xl border border-white/20 flex flex-col justify-between h-56 relative overflow-hidden group hover:shadow-orange-950/20 transition-all">
              <div className="z-10 space-y-1 max-w-[200px]">
                <h3 className="text-2xl font-black tracking-tight text-gray-900 leading-none uppercase">
                  FOOD DELIVERY
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  FROM RESTAURANTS
                </p>

                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-[#ff5200] font-black text-xs rounded-full tracking-wider uppercase">
                    UPTO 60% OFF
                  </span>
                </div>
              </div>

              {/* Dish Bowl Image */}
              <div className="absolute right-[-10px] bottom-[-10px] w-48 h-48 overflow-hidden pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80"
                  alt="Food Bowl"
                  className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white"
                />
              </div>

              <div className="z-10 pt-4">
                <Link
                  to="/restaurants"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ff5200] hover:bg-orange-600 text-white font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Instamart Grocery */}
            <div className="bg-white rounded-3xl p-6 text-gray-900 shadow-2xl border border-white/20 flex flex-col justify-between h-56 relative overflow-hidden group hover:shadow-orange-950/20 transition-all">
              <div className="z-10 space-y-1 max-w-[200px]">
                <h3 className="text-2xl font-black tracking-tight text-gray-900 leading-none uppercase">
                  INSTAMART
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  INSTANT GROCERY
                </p>

                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-[#ff5200] font-black text-xs rounded-full tracking-wider uppercase">
                    UPTO 60% OFF
                  </span>
                </div>
              </div>

              {/* Grocery Basket Image */}
              <div className="absolute right-[-10px] bottom-[-10px] w-48 h-48 overflow-hidden pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80"
                  alt="Grocery Basket"
                  className="w-full h-full object-cover rounded-3xl shadow-lg border-4 border-white"
                />
              </div>

              <div className="z-10 pt-4">
                <Link
                  to="/search?category=groceries"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ff5200] hover:bg-orange-600 text-white font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
};
