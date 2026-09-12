import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UtensilsCrossed, ShoppingBag, Clock, CheckCircle2, AlertCircle,
  TrendingUp, Search, Plus, Trash2, Star, ChevronDown, Store,
  ArrowUpRight, LogOut, Bell, Shield, ChefHat, Bike, X, Check,
  SlidersHorizontal, RefreshCw, Layers, PhoneCall, MapPin, DollarSign, Edit3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { restaurants as initialRestaurants } from '../data/restaurants';
import { foodsByRestaurant as initialFoods } from '../data/foods';
import { VegIndicator } from '../components/common/VegIndicator';
import { Toast } from '../components/common/Toast';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();
  const { orders, updateOrderStatus } = useOrders();

  // Selected Restaurant outlet
  const [selectedRestId, setSelectedRestId] = useState('rest-1');
  const [isStoreOnline, setIsStoreOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'overview' | 'orders' | 'menu' | 'settings' | 'reviews'
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  // Orders Tab filters
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Menu Inventory State (persisted in local state per session)
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem(`foodly_admin_menu_${selectedRestId}`);
    return saved ? JSON.parse(saved) : (initialFoods[selectedRestId] || initialFoods['rest-1'] || []);
  });

  // Category filter in menu
  const [selectedMenuCategory, setSelectedMenuCategory] = useState('ALL');
  const [menuSearchQuery, setMenuSearchQuery] = useState('');

  // Add/Edit Dish Modal
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [dishFormData, setDishFormData] = useState({
    name: '',
    price: '',
    category: 'Biryani',
    description: '',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
    isRecommended: false
  });

  // Store Settings Form
  const currentRestaurant = initialRestaurants.find(r => r.id === selectedRestId) || initialRestaurants[0];
  const [storeSettings, setStoreSettings] = useState({
    name: currentRestaurant.name,
    prepTime: '20-25 mins',
    minOrder: '150',
    pureVeg: currentRestaurant.isPureVeg,
    deliveryRadius: '6.5 km',
    contactPhone: '+91 98950 11223'
  });

  // Current outlet orders
  const outletOrders = useMemo(() => {
    return orders.filter(o => !o.restaurantId || o.restaurantId === selectedRestId || selectedRestId === 'rest-1');
  }, [orders, selectedRestId]);

  const filteredOrders = useMemo(() => {
    return outletOrders.filter(order => {
      const matchesStatus = orderStatusFilter === 'ALL' || order.status.toLowerCase() === orderStatusFilter.toLowerCase();
      const matchesSearch = !orderSearchQuery.trim() ||
        order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        (order.address && order.address.toLowerCase().includes(orderSearchQuery.toLowerCase())) ||
        (order.deliveryExecutive?.name && order.deliveryExecutive.name.toLowerCase().includes(orderSearchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [outletOrders, orderStatusFilter, orderSearchQuery]);

  // Order Counts
  const orderCounts = useMemo(() => {
    return {
      all: outletOrders.length,
      preparing: outletOrders.filter(o => o.status === 'Preparing').length,
      outForDelivery: outletOrders.filter(o => o.status === 'Out for Delivery').length,
      delivered: outletOrders.filter(o => o.status === 'Delivered').length,
      cancelled: outletOrders.filter(o => o.status === 'Cancelled').length
    };
  }, [outletOrders]);

  // Menu items filtered
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCat = selectedMenuCategory === 'ALL' || item.category === selectedMenuCategory;
      const matchesSearch = !menuSearchQuery.trim() ||
        item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(menuSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [menuItems, selectedMenuCategory, menuSearchQuery]);

  const showToast = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
  };

  // Status advancement
  const handleAdvanceStatus = (orderId, currentStatus) => {
    if (currentStatus === 'Preparing') {
      updateOrderStatus(orderId, 'Out for Delivery');
      showToast(`Order #${orderId} is dispatched and Out for Delivery! 🚀`);
    } else if (currentStatus === 'Out for Delivery') {
      updateOrderStatus(orderId, 'Delivered');
      showToast(`Order #${orderId} marked as Delivered! 🎉`);
    }
  };

  const handleCancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'Cancelled');
    showToast(`Order #${orderId} has been cancelled.`, 'error');
  };

  // Toggle item stock
  const handleToggleStock = (itemId) => {
    setMenuItems(prev => {
      const updated = prev.map(item => {
        if (item.id === itemId) {
          const isOutOfStock = !item.isOutOfStock;
          showToast(`"${item.name}" marked as ${isOutOfStock ? 'OUT OF STOCK' : 'IN STOCK'}`);
          return { ...item, isOutOfStock };
        }
        return item;
      });
      localStorage.setItem(`foodly_admin_menu_${selectedRestId}`, JSON.stringify(updated));
      return updated;
    });
  };

  // Add Dish
  const handleAddDishSubmit = (e) => {
    e.preventDefault();
    if (!dishFormData.name.trim() || !dishFormData.price) return;

    const newDish = {
      id: `food-${Date.now()}`,
      restaurantId: selectedRestId,
      name: dishFormData.name,
      price: parseFloat(dishFormData.price),
      description: dishFormData.description || 'Prepared fresh with premium ingredients.',
      isVeg: Boolean(dishFormData.isVeg),
      rating: 5.0,
      ratingCount: 1,
      category: dishFormData.category,
      isRecommended: Boolean(dishFormData.isRecommended),
      image: dishFormData.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
      isOutOfStock: false
    };

    setMenuItems(prev => {
      const updated = [newDish, ...prev];
      localStorage.setItem(`foodly_admin_menu_${selectedRestId}`, JSON.stringify(updated));
      return updated;
    });

    setIsAddDishModalOpen(false);
    setDishFormData({
      name: '',
      price: '',
      category: 'Biryani',
      description: '',
      isVeg: false,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
      isRecommended: false
    });
    showToast(`Added "${newDish.name}" to menu!`);
  };

  // Delete Dish
  const handleDeleteDish = (itemId, itemName) => {
    if (confirm(`Remove "${itemName}" from menu?`)) {
      setMenuItems(prev => {
        const updated = prev.filter(i => i.id !== itemId);
        localStorage.setItem(`foodly_admin_menu_${selectedRestId}`, JSON.stringify(updated));
        return updated;
      });
      showToast(`Removed "${itemName}" from menu.`, 'info');
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('Store settings updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30 flex flex-col antialiased text-gray-900">
      {toastMsg && <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />}

      {/* Top Header Navbar - Matching Website Vibrant Orange */}
      <header className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand & Outlet selector */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-white text-orange-600 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight leading-none text-white">
                  FOOD<span className="text-orange-200">LY</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-orange-100 leading-none mt-0.5">
                  Store Partner
                </span>
              </div>
            </Link>

            <span className="text-white/40 hidden sm:inline">|</span>

            {/* Outlet dropdown */}
            <div className="relative flex items-center gap-1.5 bg-white/15 hover:bg-white/20 border border-white/25 px-3 py-1.5 rounded-xl text-xs backdrop-blur-xs">
              <Store className="w-3.5 h-3.5 text-orange-200 shrink-0" />
              <select
                value={selectedRestId}
                onChange={(e) => {
                  setSelectedRestId(e.target.value);
                  const newItems = initialFoods[e.target.value] || [];
                  setMenuItems(newItems);
                  showToast(`Switched outlet view`);
                }}
                className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer pr-1"
              >
                {initialRestaurants.map(r => (
                  <option key={r.id} value={r.id} className="bg-orange-600 text-white">
                    {r.name} ({r.location.split(',')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Online / Offline status badge */}
            <button
              onClick={() => {
                setIsStoreOnline(!isStoreOnline);
                showToast(`Store is now ${!isStoreOnline ? 'ONLINE & ACCEPTING ORDERS' : 'PAUSED / OFFLINE'}`);
              }}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer shadow-xs ${
                isStoreOnline
                  ? 'bg-white text-emerald-700'
                  : 'bg-white/20 text-white border border-white/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isStoreOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-300'}`} />
              <span>{isStoreOnline ? 'Live Accepting Orders' : 'Store Offline'}</span>
            </button>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-3">
            {/* View public storefront */}
            <Link
              to={`/restaurants/${selectedRestId}`}
              target="_blank"
              className="hidden sm:flex items-center gap-1 text-xs font-bold text-orange-600 bg-white hover:bg-orange-50 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
              title="Open public menu in new tab"
            >
              <span>Customer Storefront</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-orange-600 stroke-[2.5]" />
            </Link>

            {/* Role switch pill for demo */}
            <div className="hidden lg:flex items-center gap-1 bg-white/15 border border-white/25 px-2.5 py-1 rounded-xl text-[11px] text-white">
              <span className="text-orange-100">Role:</span>
              <span className="text-white font-black uppercase">{user.role}</span>
              <button
                onClick={() => {
                  switchRole('super_admin');
                  navigate('/super-admin');
                }}
                className="ml-1 text-[10px] text-yellow-200 hover:text-white font-bold underline cursor-pointer"
                title="Switch to Super Admin Console"
              >
                Super Admin &rarr;
              </button>
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/25">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white text-orange-600 font-extrabold flex items-center justify-center text-xs shadow-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden xl:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-white">{user.name}</span>
                  <span className="text-[10px] text-orange-100">Store Manager</span>
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

      {/* Main Dashboard Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Top KPIs Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Today's Sales</div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">₹16,840</div>
              <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3 h-3" /> +14.2% vs yesterday
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Active Orders</div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {orderCounts.preparing + orderCounts.outForDelivery}
              </div>
              <div className="text-[11px] font-semibold text-gray-500 mt-0.5">
                {orderCounts.preparing} preparing • {orderCounts.outForDelivery} in transit
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Delivered Today</div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {orderCounts.delivered}
              </div>
              <div className="text-[11px] font-semibold text-gray-500 mt-0.5">
                Avg time: 24 mins
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-amber-500 text-amber-500 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Customer Rating</div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {currentRestaurant.rating} <span className="text-xs text-gray-400 font-medium">/ 5.0</span>
              </div>
              <div className="text-[11px] font-semibold text-gray-500 mt-0.5">
                {currentRestaurant.ratingCount} reviews
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="bg-white p-1.5 rounded-2xl border border-orange-100 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'orders', label: 'Live Orders Queue', count: orderCounts.preparing + orderCounts.outForDelivery },
            { id: 'menu', label: 'Menu & Inventory', count: menuItems.length },
            { id: 'overview', label: 'Analytics & Sales' },
            { id: 'settings', label: 'Store Operations' },
            { id: 'reviews', label: 'Customer Reviews' }
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

        {/* TAB 1: LIVE ORDERS QUEUE */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filters bar */}
            <div className="bg-white p-4 rounded-3xl border border-orange-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Status pill tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {[
                  { id: 'ALL', label: 'All Orders', count: orderCounts.all },
                  { id: 'PREPARING', label: 'Preparing', count: orderCounts.preparing },
                  { id: 'OUT FOR DELIVERY', label: 'Out for Delivery', count: orderCounts.outForDelivery },
                  { id: 'DELIVERED', label: 'Delivered', count: orderCounts.delivered },
                  { id: 'CANCELLED', label: 'Cancelled', count: orderCounts.cancelled }
                ].map(status => (
                  <button
                    key={status.id}
                    onClick={() => setOrderStatusFilter(status.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      orderStatusFilter === status.id
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                    }`}
                  >
                    <span>{status.label}</span>
                    <span className="ml-1 text-[10px] opacity-75">({status.count})</span>
                  </button>
                ))}
              </div>

              {/* Search Orders */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search Order ID, Address..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full bg-orange-50/40 border border-orange-100 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Orders Cards Grid */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-orange-100 shadow-xs space-y-3">
                <div className="w-14 h-14 bg-orange-50 text-orange-400 rounded-2xl flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-gray-800">No orders match filter</h4>
                <p className="text-xs text-gray-500">There are no orders with status "{orderStatusFilter}".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOrders.map(order => {
                  const isPreparing = order.status === 'Preparing';
                  const isOutForDelivery = order.status === 'Out for Delivery';
                  const isDelivered = order.status === 'Delivered';
                  const isCancelled = order.status === 'Cancelled';

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl border border-orange-100 p-5 shadow-xs hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      {/* Top row: Order ID, status, amount */}
                      <div className="flex items-start justify-between border-b border-orange-50 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-black text-gray-900">
                              #{order.id}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              isPreparing
                                ? 'bg-orange-100 text-orange-700 animate-pulse'
                                : isOutForDelivery
                                ? 'bg-blue-100 text-blue-700'
                                : isDelivered
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-rose-100 text-rose-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                            Placed at: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-black text-gray-900">₹{order.grandTotal}</div>
                          <div className="text-[10px] text-gray-400 font-semibold">{order.paymentMethod}</div>
                        </div>
                      </div>

                      {/* Items list */}
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Order Items ({order.items.length})</div>
                        <div className="space-y-1 bg-orange-50/40 p-2.5 rounded-2xl border border-orange-100/60">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs text-gray-800">
                              <span className="font-semibold">
                                <span className="text-orange-600 font-bold">{it.qty}x</span> {it.name}
                              </span>
                              <span className="text-gray-600 font-mono">₹{it.price * it.qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery & Address */}
                      <div className="text-xs text-gray-600 space-y-1 bg-gray-50/80 p-2.5 rounded-2xl">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="truncate">{order.address}</span>
                        </div>
                        {order.deliveryExecutive && (
                          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
                            <span className="flex items-center gap-1">
                              <Bike className="w-3 h-3 text-blue-500" />
                              Rider: <strong className="text-gray-800">{order.deliveryExecutive.name}</strong>
                            </span>
                            <span className="font-mono text-[10px]">{order.deliveryExecutive.vehicle}</span>
                          </div>
                        )}
                      </div>

                      {/* Order Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-orange-50">
                        {isPreparing && (
                          <button
                            onClick={() => handleAdvanceStatus(order.id, 'Preparing')}
                            className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Bike className="w-3.5 h-3.5" />
                            <span>Mark Out for Delivery</span>
                          </button>
                        )}

                        {isOutForDelivery && (
                          <button
                            onClick={() => handleAdvanceStatus(order.id, 'Out for Delivery')}
                            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Delivered</span>
                          </button>
                        )}

                        {(isPreparing || isOutForDelivery) && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="px-3 py-2 bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-600 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                            title="Cancel Order"
                          >
                            Cancel
                          </button>
                        )}

                        {isDelivered && (
                          <div className="flex-1 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Order Fulfilled Successfully</span>
                          </div>
                        )}

                        {isCancelled && (
                          <div className="flex-1 py-2 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl text-center">
                            Cancelled
                          </div>
                        )}

                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          className="px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MENU & INVENTORY MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="bg-white p-4 rounded-3xl border border-orange-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {['ALL', 'Biryani', 'Starters', 'Grills', 'Shawarma', 'Desserts', 'Beverages'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedMenuCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedMenuCategory === cat
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={menuSearchQuery}
                    onChange={(e) => setMenuSearchQuery(e.target.value)}
                    className="w-full bg-orange-50/40 border border-orange-100 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                </div>

                <button
                  onClick={() => setIsAddDishModalOpen(true)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Dish</span>
                </button>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMenuItems.map(item => {
                const isOutOfStock = Boolean(item.isOutOfStock);

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-3xl border p-4 shadow-xs transition-all flex flex-col justify-between space-y-3 ${
                      isOutOfStock ? 'border-rose-200 bg-rose-50/30 opacity-85' : 'border-orange-100 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale' : ''}`}
                        />
                        <div className="absolute top-1 left-1">
                          <VegIndicator isVeg={item.isVeg} size="sm" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                          <span className="text-[10px] font-bold text-orange-600 uppercase bg-orange-50 px-1.5 py-0.5 rounded">{item.category}</span>
                        </div>
                        <div className="font-black text-sm text-gray-900 mt-0.5">₹{item.price}</div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-tight">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Controls: In Stock Switch & Delete */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStock(item.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            isOutOfStock
                              ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          <span>{isOutOfStock ? 'Out of Stock' : 'In Stock'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteDish(item.id, item.name)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          title="Remove dish from menu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-gray-900">Hourly Revenue Stream (Today)</h3>
                  <p className="text-xs text-gray-500">Peak dining hours between 12:30 PM and 8:30 PM</p>
                </div>
                <div className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-xl">
                  Peak: ₹3,400 / hr
                </div>
              </div>

              {/* Bar Visualization */}
              <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-orange-50">
                {[
                  { time: '11 AM', val: 35, amt: '₹1,200' },
                  { time: '12 PM', val: 75, amt: '₹2,800' },
                  { time: '1 PM', val: 95, amt: '₹3,400' },
                  { time: '2 PM', val: 65, amt: '₹2,300' },
                  { time: '4 PM', val: 25, amt: '₹850' },
                  { time: '6 PM', val: 40, amt: '₹1,400' },
                  { time: '7 PM', val: 80, amt: '₹3,100' },
                  { time: '8 PM', val: 90, amt: '₹3,250' },
                  { time: '9 PM', val: 60, amt: '₹2,100' }
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      style={{ height: `${bar.val}%` }}
                      className="w-full max-w-[28px] bg-gradient-to-t from-orange-500 to-amber-400 group-hover:from-orange-600 group-hover:to-amber-500 rounded-t-lg transition-all relative"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none transition-opacity">
                        {bar.amt}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500">{bar.time}</span>
                  </div>
                ))}
              </div>

              {/* Summary KPIs */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 bg-orange-50/50 border border-orange-100/60 rounded-2xl">
                  <div className="text-[10px] font-bold uppercase text-gray-400">Total Dishes Cooked</div>
                  <div className="text-lg font-black text-gray-900 mt-0.5">86 items</div>
                </div>
                <div className="p-3 bg-orange-50/50 border border-orange-100/60 rounded-2xl">
                  <div className="text-[10px] font-bold uppercase text-gray-400">Avg Prep Speed</div>
                  <div className="text-lg font-black text-gray-900 mt-0.5">18.4 mins</div>
                </div>
                <div className="p-3 bg-orange-50/50 border border-orange-100/60 rounded-2xl">
                  <div className="text-[10px] font-bold uppercase text-gray-400">Refunds / Issues</div>
                  <div className="text-lg font-black text-emerald-600 mt-0.5">0.0%</div>
                </div>
              </div>
            </div>

            {/* Top Selling Items */}
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-gray-900">Best Sellers Today</h3>
              <div className="space-y-3">
                {[
                  { name: 'Thalassery Chicken Dum Biryani', count: 32, rev: '₹7,680', pct: 85 },
                  { name: 'Al Faham Chicken (Full)', count: 18, rev: '₹8,820', pct: 60 },
                  { name: 'Rumali Shawarma Roll', count: 24, rev: '₹3,120', pct: 45 },
                  { name: 'Sulaimani Chai', count: 42, rev: '₹1,260', pct: 90 }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">{item.name}</span>
                      <span className="font-mono font-bold text-orange-600">{item.count} orders</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div style={{ width: `${item.pct}%` }} className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full" />
                    </div>
                    <div className="text-[10px] text-gray-400 text-right">{item.rev} generated</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STORE OPERATIONS SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-5">
            <div>
              <h3 className="font-bold text-base text-gray-900">Store Operations & Delivery Rules</h3>
              <p className="text-xs text-gray-500">Configure business hours, preparation times, and service parameters.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase">Outlet Display Name</label>
                <input
                  type="text"
                  value={storeSettings.name}
                  onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Standard Prep Time</label>
                  <input
                    type="text"
                    value={storeSettings.prepTime}
                    onChange={(e) => setStoreSettings({ ...storeSettings, prepTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Min. Order Amount (₹)</label>
                  <input
                    type="number"
                    value={storeSettings.minOrder}
                    onChange={(e) => setStoreSettings({ ...storeSettings, minOrder: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Delivery Max Radius</label>
                  <input
                    type="text"
                    value={storeSettings.deliveryRadius}
                    onChange={(e) => setStoreSettings({ ...storeSettings, deliveryRadius: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Store Help Hotline</label>
                  <input
                    type="text"
                    value={storeSettings.contactPhone}
                    onChange={(e) => setStoreSettings({ ...storeSettings, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Save Store Configurations
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: CUSTOMER REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 max-w-4xl">
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900">Customer Feedback & Reviews</h3>
                <p className="text-xs text-gray-500">Live verified customer reviews from completed orders</p>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-black text-sm text-amber-900">{currentRestaurant.rating}</span>
                <span className="text-xs text-amber-700">({currentRestaurant.ratingCount})</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { customer: 'Nithya R.', rating: 5, time: '2 hours ago', dish: 'Thalassery Chicken Dum Biryani', comment: 'Steaming hot dum biryani arrived in under 20 mins! Super aromatic short grain kaima rice, mouthwatering tender chicken pieces.' },
                { customer: 'Rohan Sharma', rating: 4, time: 'Yesterday', dish: 'Rumali Shawarma Roll', comment: 'Loved the garlic toum dip and authentic spiced chicken. Packaging was neat and spill-proof.' },
                { customer: 'Amina Farooq', rating: 5, time: '3 days ago', dish: 'Sulaimani Chai (Hot)', comment: 'The best sulaimani in town. Sweetness was on point with mint and lemon notes.' }
              ].map((rev, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs">
                        {rev.customer.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-gray-900">{rev.customer}</div>
                        <div className="text-[10px] text-gray-400">{rev.time} • Verified Order</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed font-medium">"{rev.comment}"</p>
                  <div className="text-[11px] font-bold text-orange-600 bg-orange-50 inline-block px-2 py-0.5 rounded">
                    Item: {rev.dish}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add Dish Modal */}
      {isAddDishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-gray-900">Add New Dish to Menu</h3>
              <button
                onClick={() => setIsAddDishModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDishSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase">Dish Name</label>
                <input
                  type="text"
                  placeholder="e.g. Special Malabar Chicken Fry"
                  value={dishFormData.name}
                  onChange={(e) => setDishFormData({ ...dishFormData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="250"
                    value={dishFormData.price}
                    onChange={(e) => setDishFormData({ ...dishFormData, price: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Category</label>
                  <select
                    value={dishFormData.category}
                    onChange={(e) => setDishFormData({ ...dishFormData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 bg-white"
                  >
                    {['Biryani', 'Starters', 'Grills', 'Shawarma', 'Main Course', 'Breads', 'Desserts', 'Beverages'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase">Short Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe taste, ingredients and spices..."
                  value={dishFormData.description}
                  onChange={(e) => setDishFormData({ ...dishFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dishFormData.isVeg}
                    onChange={(e) => setDishFormData({ ...dishFormData, isVeg: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Is Pure Vegetarian Dish</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dishFormData.isRecommended}
                    onChange={(e) => setDishFormData({ ...dishFormData, isRecommended: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded"
                  />
                  <span>Chef's Recommendation</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddDishModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Add to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">Order #{selectedOrderDetails.id}</h3>
                <span className="text-xs text-gray-500">{new Date(selectedOrderDetails.createdAt).toLocaleString()}</span>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-orange-50/40 p-3 rounded-2xl border border-orange-100/60 space-y-1.5">
                <div className="text-[11px] font-bold uppercase text-gray-400">Items Ordered</div>
                {selectedOrderDetails.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-gray-800 font-semibold">
                    <span>{it.qty}x {it.name}</span>
                    <span>₹{it.price * it.qty}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs space-y-1 pt-1 border-t border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{selectedOrderDetails.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Taxes & Fees</span>
                  <span>₹{(selectedOrderDetails.taxes || 0) + (selectedOrderDetails.platformFee || 0)}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-gray-900 pt-1 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span className="text-orange-600">₹{selectedOrderDetails.grandTotal}</span>
                </div>
              </div>

              <div className="bg-orange-50/60 p-3 rounded-2xl border border-orange-100 space-y-1 text-xs text-gray-700">
                <div className="font-bold text-orange-800 text-[11px] uppercase">Delivery Information</div>
                <div>{selectedOrderDetails.address}</div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Payment: <strong className="text-gray-800">{selectedOrderDetails.paymentMethod}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
