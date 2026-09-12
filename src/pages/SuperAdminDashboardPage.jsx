import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Crown, UtensilsCrossed, TrendingUp, DollarSign, Store, ShoppingBag,
  Users, Shield, CheckCircle2, AlertTriangle, Search, Plus, Filter,
  ArrowUpRight, LogOut, Sliders, Settings, Award, ChevronRight, X,
  Check, RefreshCw, BarChart3, Globe, Sparkles, Building2, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { restaurants as initialRestaurants } from '../data/restaurants';
import { Toast } from '../components/common/Toast';

export const SuperAdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();
  const { orders } = useOrders();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'restaurants' | 'orders' | 'users' | 'finance' | 'settings'
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  // Restaurants management state
  const [restaurantsList, setRestaurantsList] = useState(() => {
    const saved = localStorage.getItem('foodly_superadmin_restaurants');
    return saved ? JSON.parse(saved) : initialRestaurants.map(r => ({
      ...r,
      commissionRate: 18,
      status: 'Active',
      totalRevenue: Math.floor(Math.random() * 800000) + 200000,
      totalOrdersCount: Math.floor(Math.random() * 1200) + 300
    }));
  });

  // New Restaurant Onboard Modal
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [newRestData, setNewRestData] = useState({
    name: '',
    location: 'Calicut, Kerala',
    cuisines: 'Biryani, Kerala',
    priceForTwo: 350,
    deliveryTimeMinutes: 25,
    commissionRate: 18,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    isPureVeg: false,
    featured: false
  });

  // User Management State
  const [usersList, setUsersList] = useState(() => {
    return [
      { id: 'usr-1', name: 'Arjun Nair', email: 'arjun.nair@example.com', phone: '+91 98950 12345', role: 'user', joined: '2026-01-15', status: 'Active', ordersCount: 14 },
      { id: 'usr-2', name: 'Foodly Admin (Thalassery)', email: 'admin.thalassery@foodly.com', phone: '+91 98470 55443', role: 'admin', joined: '2026-02-01', status: 'Active', ordersCount: 420 },
      { id: 'usr-3', name: 'Arabian Grill Manager', email: 'admin.arabiangrill@foodly.com', phone: '+91 98471 22334', role: 'admin', joined: '2026-02-10', status: 'Active', ordersCount: 310 },
      { id: 'usr-4', name: 'Kavya Pillai', email: 'kavya.pillai@example.com', phone: '+91 94470 99887', role: 'user', joined: '2026-03-05', status: 'Active', ordersCount: 8 },
      { id: 'usr-5', name: 'Super Admin (Headquarters)', email: 'hq.superadmin@foodly.com', phone: '+91 98950 00001', role: 'super_admin', joined: '2025-11-20', status: 'Active', ordersCount: 0 }
    ];
  });

  // Global System Settings
  const [systemSettings, setSystemSettings] = useState({
    platformFee: 6,
    baseDeliveryFee: 30,
    taxRatePct: 5,
    systemHaltMode: false,
    broadcastMessage: 'Enjoy monsoon cravings with FAST free delivery on orders above ₹299!'
  });

  // Search queries
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  const showToast = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
  };

  // Toggle Restaurant Feature Status
  const handleToggleFeatured = (restId) => {
    setRestaurantsList(prev => {
      const updated = prev.map(r => r.id === restId ? { ...r, featured: !r.featured } : r);
      localStorage.setItem('foodly_superadmin_restaurants', JSON.stringify(updated));
      return updated;
    });
    showToast('Restaurant featured status toggled.');
  };

  // Toggle Restaurant Promoted Status
  const handleTogglePromoted = (restId) => {
    setRestaurantsList(prev => {
      const updated = prev.map(r => r.id === restId ? { ...r, isPromoted: !r.isPromoted } : r);
      localStorage.setItem('foodly_superadmin_restaurants', JSON.stringify(updated));
      return updated;
    });
    showToast('Restaurant promoted badge toggled.');
  };

  // Toggle Restaurant Active/Suspended Status
  const handleToggleActive = (restId) => {
    setRestaurantsList(prev => {
      const updated = prev.map(r => {
        if (r.id === restId) {
          const nextStatus = r.status === 'Active' ? 'Suspended' : 'Active';
          showToast(`Restaurant marked as ${nextStatus}`, nextStatus === 'Active' ? 'success' : 'error');
          return { ...r, status: nextStatus };
        }
        return r;
      });
      localStorage.setItem('foodly_superadmin_restaurants', JSON.stringify(updated));
      return updated;
    });
  };

  // Adjust Commission Rate
  const handleUpdateCommission = (restId, newRate) => {
    setRestaurantsList(prev => {
      const updated = prev.map(r => r.id === restId ? { ...r, commissionRate: parseInt(newRate) || 18 } : r);
      localStorage.setItem('foodly_superadmin_restaurants', JSON.stringify(updated));
      return updated;
    });
    showToast(`Updated commission rate for restaurant.`);
  };

  // Onboard New Restaurant
  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    if (!newRestData.name.trim()) return;

    const newRest = {
      id: `rest-${Date.now()}`,
      name: newRestData.name,
      location: newRestData.location,
      cuisines: newRestData.cuisines.split(',').map(c => c.trim()),
      priceForTwo: parseInt(newRestData.priceForTwo) || 350,
      deliveryTimeMinutes: parseInt(newRestData.deliveryTimeMinutes) || 25,
      deliveryTime: `${newRestData.deliveryTimeMinutes || 25} mins`,
      rating: 4.8,
      ratingCount: 'New',
      commissionRate: parseInt(newRestData.commissionRate) || 18,
      image: newRestData.image,
      isPureVeg: Boolean(newRestData.isPureVeg),
      featured: Boolean(newRestData.featured),
      isPromoted: false,
      status: 'Active',
      totalRevenue: 0,
      totalOrdersCount: 0
    };

    setRestaurantsList(prev => {
      const updated = [newRest, ...prev];
      localStorage.setItem('foodly_superadmin_restaurants', JSON.stringify(updated));
      return updated;
    });

    setIsOnboardModalOpen(false);
    showToast(`Successfully onboarded "${newRest.name}" to FOODLY!`);
  };

  // Change User Role
  const handleChangeUserRole = (userId, newRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    showToast(`User role updated to ${newRole.toUpperCase()}`);
  };

  // Filtered lists
  const filteredRestaurants = useMemo(() => {
    return restaurantsList.filter(r =>
      r.name.toLowerCase().includes(restaurantSearch.toLowerCase()) ||
      r.location.toLowerCase().includes(restaurantSearch.toLowerCase())
    );
  }, [restaurantsList, restaurantSearch]);

  const filteredUsers = useMemo(() => {
    return usersList.filter(u =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [usersList, userSearch]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o =>
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.restaurantName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.status.toLowerCase().includes(orderSearch.toLowerCase())
    );
  }, [orders, orderSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/60 via-white to-orange-50/30 text-gray-900 flex flex-col antialiased">
      {toastMsg && <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />}

      {/* Super Admin Executive Header - Vibrant Foodly Orange */}
      <header className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand & Badge */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-white text-orange-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Crown className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">
                  FOOD<span className="text-orange-200">LY</span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-orange-100 leading-none mt-0.5">
                  HQ • SUPER ADMIN
                </span>
              </div>
            </Link>

            <span className="text-white/40 hidden sm:inline">|</span>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/15 border border-white/25 rounded-full text-xs text-white font-bold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Platform Core Live (v2.4)</span>
            </div>
          </div>

          {/* Header Action Nav */}
          <div className="flex items-center gap-3">
            {/* View storefront */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-white hover:bg-orange-50 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
            >
              <span>Storefront</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-orange-600 stroke-[2.5]" />
            </Link>

            {/* Quick Demo Switcher */}
            <div className="hidden lg:flex items-center gap-1.5 bg-white/15 border border-white/25 px-2.5 py-1 rounded-xl text-[11px] text-white">
              <span className="text-orange-100">Role:</span>
              <button
                onClick={() => {
                  switchRole('admin');
                  navigate('/admin');
                }}
                className="text-yellow-200 hover:text-white font-bold underline cursor-pointer"
                title="Switch to Store Admin Dashboard"
              >
                Store Admin
              </button>
              <span className="text-white/40">•</span>
              <button
                onClick={() => {
                  switchRole('user');
                  navigate('/');
                }}
                className="text-white hover:text-yellow-200 font-bold underline cursor-pointer"
                title="Switch to Customer view"
              >
                User
              </button>
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/25">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white text-orange-600 font-black flex items-center justify-center text-xs shadow-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden xl:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-white">{user.name}</span>
                  <span className="text-[10px] text-orange-100 font-semibold">Platform Owner</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Executive Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Super Admin KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Platform GMV</span>
              <div className="p-2 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100">
                <DollarSign className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-2xl font-black text-gray-900 tracking-tight">₹18,45,200</div>
            <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Net Commission (18%)</span>
              <div className="p-2 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-2xl font-black text-orange-600 tracking-tight">₹3,32,136</div>
            <div className="text-[11px] font-semibold text-gray-500 mt-1">
              Platform revenue earned
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
              <div className="p-2 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-2xl font-black text-gray-900 tracking-tight">5,420</div>
            <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +22% YoY
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Restaurants</span>
              <div className="p-2 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Store className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="text-2xl font-black text-gray-900 tracking-tight">
              {restaurantsList.filter(r => r.status === 'Active').length} <span className="text-xs text-gray-400 font-medium">/ {restaurantsList.length}</span>
            </div>
            <div className="text-[11px] font-semibold text-gray-500 mt-1">
              Across 3 active city hubs
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-white p-1.5 rounded-2xl border border-orange-100 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Executive Overview' },
            { id: 'restaurants', label: 'Restaurants Governance', count: restaurantsList.length },
            { id: 'orders', label: 'Global Orders Stream', count: orders.length },
            { id: 'users', label: 'Users & Admins', count: usersList.length },
            { id: 'finance', label: 'Financial Settlements' },
            { id: 'settings', label: 'System Configurations' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/60'
                }`}
              >
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-white text-orange-600' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GMV Breakdown */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-gray-900">Monthly Platform GMV Growth</h3>
                  <p className="text-xs text-gray-500">Gross transaction value processed across all Foodly outlets</p>
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                  Target Achieved: 112%
                </div>
              </div>

              <div className="h-52 flex items-end justify-between gap-3 pt-8 pb-2 border-b border-orange-50">
                {[
                  { month: 'Mar', val: 40, gmv: '₹7.2L' },
                  { month: 'Apr', val: 55, gmv: '₹9.8L' },
                  { month: 'May', val: 68, gmv: '₹12.1L' },
                  { month: 'Jun', val: 75, gmv: '₹13.4L' },
                  { month: 'Jul', val: 82, gmv: '₹14.9L' },
                  { month: 'Aug', val: 92, gmv: '₹16.8L' },
                  { month: 'Sep (Now)', val: 100, gmv: '₹18.4L' }
                ].map((col, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <div
                      style={{ height: `${col.val}%` }}
                      className="w-full max-w-[36px] bg-gradient-to-t from-orange-500 to-amber-400 group-hover:from-orange-600 group-hover:to-amber-500 rounded-t-lg transition-all relative"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none transition-opacity">
                        {col.gmv}
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500">{col.month}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 bg-orange-50/50 rounded-2xl border border-orange-100/60">
                  <div className="text-[10px] font-bold uppercase text-gray-400">Avg Order Value (AOV)</div>
                  <div className="text-base font-black text-gray-900 mt-0.5">₹412</div>
                </div>
                <div className="p-3 bg-orange-50/50 rounded-2xl border border-orange-100/60">
                  <div className="text-[10px] font-bold uppercase text-gray-400">Fleet Satisfaction</div>
                  <div className="text-base font-black text-emerald-600 mt-0.5">96.8%</div>
                </div>
                <div className="p-3 bg-orange-50/50 rounded-2xl border border-orange-100/60">
                  <div className="text-[10px] font-bold uppercase text-gray-400">Dispute Rate</div>
                  <div className="text-base font-black text-orange-600 mt-0.5">0.12%</div>
                </div>
              </div>
            </div>

            {/* Hub distribution & Cuisine share */}
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-gray-900">Order Volume by Hub</h3>
              <div className="space-y-3">
                {[
                  { city: 'Calicut (HQ Market)', pct: 54, orders: '2,926 orders', color: 'bg-orange-500' },
                  { city: 'Kochi (Ernakulam)', pct: 28, orders: '1,518 orders', color: 'bg-amber-500' },
                  { city: 'Kannur (North Hub)', pct: 18, orders: '976 orders', color: 'bg-orange-400' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-800">{item.city}</span>
                      <span className="text-orange-600 font-mono">{item.orders}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div style={{ width: `${item.pct}%` }} className={`${item.color} h-full rounded-full`} />
                    </div>
                    <div className="text-[10px] text-gray-400 text-right">{item.pct}% total platform volume</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-orange-50 space-y-2">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">Top Category Demand</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl text-xs font-bold">
                    Biryani (38%)
                  </span>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold">
                    Arabian / Shawarma (26%)
                  </span>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold">
                    South Indian (18%)
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold">
                    Burgers & Fast Food (12%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESTAURANTS GOVERNANCE */}
        {activeTab === 'restaurants' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-orange-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search restaurant by name or location..."
                  value={restaurantSearch}
                  onChange={(e) => setRestaurantSearch(e.target.value)}
                  className="w-full bg-orange-50/40 border border-orange-100 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              <button
                onClick={() => setIsOnboardModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Onboard New Restaurant</span>
              </button>
            </div>

            {/* Restaurants Table */}
            <div className="bg-white rounded-3xl border border-orange-100 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-orange-50/80 text-orange-950 uppercase tracking-wider font-extrabold border-b border-orange-100">
                    <tr>
                      <th className="py-3.5 px-4">Restaurant</th>
                      <th className="py-3.5 px-4">Rating</th>
                      <th className="py-3.5 px-4">Commission</th>
                      <th className="py-3.5 px-4">Est. Revenue</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Badges</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100/60 text-gray-800 font-medium">
                    {filteredRestaurants.map(rest => {
                      const isActive = rest.status === 'Active';

                      return (
                        <tr key={rest.id} className="hover:bg-orange-50/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={rest.image}
                                alt={rest.name}
                                className="w-10 h-10 rounded-2xl object-cover bg-gray-100 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-gray-900 text-sm">{rest.name}</div>
                                <div className="text-[11px] text-gray-500">{rest.location}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-bold">
                            <span className="text-amber-500 flex items-center gap-1">
                              ★ {rest.rating}
                            </span>
                            <span className="text-[10px] text-gray-400 font-normal">{rest.ratingCount}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="5"
                                max="35"
                                value={rest.commissionRate || 18}
                                onChange={(e) => handleUpdateCommission(rest.id, e.target.value)}
                                className="w-12 px-1.5 py-1 bg-orange-50/60 border border-orange-200 rounded-lg text-xs font-bold text-orange-700 text-center focus:outline-none focus:border-orange-500"
                              />
                              <span className="text-gray-500 font-bold">%</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-gray-900">₹{(rest.totalRevenue || 280000).toLocaleString()}</div>
                            <div className="text-[10px] text-gray-400">{rest.totalOrdersCount || 380} orders</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {rest.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleToggleFeatured(rest.id)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                                  rest.featured
                                    ? 'bg-orange-500 text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                                }`}
                                title="Toggle Featured on homepage"
                              >
                                {rest.featured ? 'Featured ★' : '+ Feature'}
                              </button>

                              <button
                                onClick={() => handleTogglePromoted(rest.id)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                                  rest.isPromoted
                                    ? 'bg-amber-500 text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-600 hover:bg-amber-50'
                                }`}
                                title="Toggle Promoted Ad status"
                              >
                                {rest.isPromoted ? 'Ad Active' : '+ Promote'}
                              </button>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleToggleActive(rest.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600'
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              }`}
                            >
                              {isActive ? 'Suspend' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GLOBAL ORDERS FEED */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-orange-100 shadow-xs flex items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by Order ID, Restaurant, Status..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-orange-50/40 border border-orange-100 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              <div className="text-xs text-gray-500 font-semibold">
                Live Feed: <strong className="text-orange-600">{filteredOrders.length}</strong> orders logged
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-orange-100 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-orange-50/80 text-orange-950 uppercase tracking-wider font-extrabold border-b border-orange-100">
                    <tr>
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Restaurant</th>
                      <th className="py-3.5 px-4">Items Summary</th>
                      <th className="py-3.5 px-4">Grand Total</th>
                      <th className="py-3.5 px-4">Commission Cut</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100/60 text-gray-800">
                    {filteredOrders.map(ord => {
                      const commRate = 0.18;
                      const platformCut = Math.round(ord.grandTotal * commRate);

                      return (
                        <tr key={ord.id} className="hover:bg-orange-50/30">
                          <td className="py-3.5 px-4 font-mono font-bold text-orange-600">
                            #{ord.id}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">
                            {ord.restaurantName}
                          </td>
                          <td className="py-3.5 px-4 text-gray-600">
                            {ord.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                          </td>
                          <td className="py-3.5 px-4 font-black text-gray-900">
                            ₹{ord.grandTotal}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-emerald-600">
                            ₹{platformCut} <span className="text-[10px] text-gray-400 font-normal">(18%)</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-orange-50 text-orange-700 border border-orange-100">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-gray-500">
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: USERS & ADMINS MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-orange-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search user by name, email, or role..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full bg-orange-50/40 border border-orange-100 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              <div className="text-xs text-gray-500 font-semibold">
                Manage role-based privileges & admin authorizations
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-orange-100 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-orange-50/80 text-orange-950 uppercase tracking-wider font-extrabold border-b border-orange-100">
                    <tr>
                      <th className="py-3.5 px-4">User Details</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-4">Joined</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Assign Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100/60 text-gray-800">
                    {filteredUsers.map(usr => (
                      <tr key={usr.id} className="hover:bg-orange-50/30">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs">
                              {usr.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{usr.name}</div>
                              <div className="text-[11px] text-gray-500">{usr.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-gray-600 font-mono">
                          {usr.phone}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            usr.role === 'super_admin'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : usr.role === 'admin'
                              ? 'bg-orange-100 text-orange-700 border border-orange-200'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {usr.role}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-gray-500 font-mono">
                          {usr.joined}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {usr.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <select
                            value={usr.role}
                            onChange={(e) => handleChangeUserRole(usr.id, e.target.value)}
                            className="bg-orange-50/60 border border-orange-200 rounded-xl px-2.5 py-1 text-xs font-bold text-gray-800 focus:outline-none focus:border-orange-500 cursor-pointer"
                          >
                            <option value="user">User</option>
                            <option value="admin">Store Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FINANCIAL SETTLEMENTS */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-orange-100 shadow-xs">
                <div className="text-[11px] font-bold text-gray-500 uppercase">Gross Platform Commissions</div>
                <div className="text-2xl font-black text-orange-600 mt-1">₹3,32,136</div>
                <p className="text-[11px] text-gray-500 mt-1">Average 18% take rate across 12 outlets</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-orange-100 shadow-xs">
                <div className="text-[11px] font-bold text-gray-500 uppercase">Pending Restaurant Payouts</div>
                <div className="text-2xl font-black text-gray-900 mt-1">₹14,92,400</div>
                <p className="text-[11px] text-gray-500 mt-1">Weekly settlement cycle due in 2 days</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-orange-100 shadow-xs">
                <div className="text-[11px] font-bold text-gray-500 uppercase">Total Delivery Fees Disbursed</div>
                <div className="text-2xl font-black text-blue-600 mt-1">₹1,62,600</div>
                <p className="text-[11px] text-gray-500 mt-1">100% passed to delivery partner fleet</p>
              </div>
            </div>

            {/* Mock Payout Trigger */}
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-gray-900">Automated Bank Transfer Disbursal</h3>
                  <p className="text-xs text-gray-500">Initiate bulk NEFT/IMPS payout transfer to verified restaurant bank accounts.</p>
                </div>
                <button
                  onClick={() => showToast('Batch payout processing simulated! 12 restaurants credited.', 'success')}
                  className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
                >
                  Process Weekly Payouts Now
                </button>
              </div>

              <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 text-xs text-gray-700 space-y-1">
                <div className="font-bold text-orange-950">Direct Partner Bank Details Verified:</div>
                <div>• Thalassery Biryani Centre: HDFC Bank (A/C: ****4092) - Pending: ₹1,82,400</div>
                <div>• Arabian Grill & Mandi: Federal Bank (A/C: ****1190) - Pending: ₹1,45,200</div>
                <div>• Malabar Kitchen: State Bank of India (A/C: ****8831) - Pending: ₹1,12,000</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SYSTEM CONFIGURATIONS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-6">
            <div>
              <h3 className="font-bold text-base text-gray-900">Global Platform Configurations</h3>
              <p className="text-xs text-gray-500">Control core fees, emergency halts, and promotional banners platform-wide.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Global platform settings updated successfully!');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Customer Platform Fee (₹)</label>
                  <input
                    type="number"
                    value={systemSettings.platformFee}
                    onChange={(e) => setSystemSettings({ ...systemSettings, platformFee: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-orange-50/40 border border-orange-100 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-gray-400">Charged per completed customer checkout.</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Base Delivery Charge (₹)</label>
                  <input
                    type="number"
                    value={systemSettings.baseDeliveryFee}
                    onChange={(e) => setSystemSettings({ ...systemSettings, baseDeliveryFee: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-orange-50/40 border border-orange-100 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-gray-400">Standard rate within 4.0 km range.</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase">Global Header Announcement Banner</label>
                <textarea
                  rows={2}
                  value={systemSettings.broadcastMessage}
                  onChange={(e) => setSystemSettings({ ...systemSettings, broadcastMessage: e.target.value })}
                  className="w-full bg-orange-50/40 border border-orange-100 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-rose-700">Emergency System Pause</div>
                  <div className="text-[11px] text-gray-500">Temporarily suspend order placement platform-wide during storms/curfews.</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = !systemSettings.systemHaltMode;
                    setSystemSettings({ ...systemSettings, systemHaltMode: next });
                    showToast(next ? 'EMERGENCY HALT ACTIVATED' : 'Platform resumed normal operations', next ? 'error' : 'success');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    systemSettings.systemHaltMode
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {systemSettings.systemHaltMode ? 'HALT ACTIVE' : 'Normal Operation'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Save Platform Settings
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Onboard New Restaurant Modal */}
      {isOnboardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-orange-100 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-gray-900">
            <div className="flex items-center justify-between border-b border-orange-50 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-500" />
                <h3 className="font-extrabold text-base text-gray-900">Onboard New Restaurant</h3>
              </div>
              <button
                onClick={() => setIsOnboardModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOnboardSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase">Restaurant Name</label>
                <input
                  type="text"
                  placeholder="e.g. Paragon Seafood & Restaurant"
                  value={newRestData.name}
                  onChange={(e) => setNewRestData({ ...newRestData, name: e.target.value })}
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Location / Area</label>
                  <input
                    type="text"
                    value={newRestData.location}
                    onChange={(e) => setNewRestData({ ...newRestData, location: e.target.value })}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Cuisines (comma separated)</label>
                  <input
                    type="text"
                    value={newRestData.cuisines}
                    onChange={(e) => setNewRestData({ ...newRestData, cuisines: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Price For Two (₹)</label>
                  <input
                    type="number"
                    value={newRestData.priceForTwo}
                    onChange={(e) => setNewRestData({ ...newRestData, priceForTwo: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Delivery Mins</label>
                  <input
                    type="number"
                    value={newRestData.deliveryTimeMinutes}
                    onChange={(e) => setNewRestData({ ...newRestData, deliveryTimeMinutes: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Commission %</label>
                  <input
                    type="number"
                    value={newRestData.commissionRate}
                    onChange={(e) => setNewRestData({ ...newRestData, commissionRate: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase">Cover Image URL</label>
                <input
                  type="text"
                  value={newRestData.image}
                  onChange={(e) => setNewRestData({ ...newRestData, image: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newRestData.isPureVeg}
                    onChange={(e) => setNewRestData({ ...newRestData, isPureVeg: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Pure Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newRestData.featured}
                    onChange={(e) => setNewRestData({ ...newRestData, featured: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsOnboardModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Complete Onboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
