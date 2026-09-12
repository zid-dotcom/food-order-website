import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, Heart, Utensils, HelpCircle, LogOut, Plus, Shield, Home, Briefcase, Crown, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/common/Toast';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, addAddress, selectAddress, switchRole } = useAuth();
  const roleLabels = {
    user: 'FOODLY ONE MEMBER',
    admin: 'STORE ADMIN ACCOUNT',
    super_admin: 'SUPER ADMIN (HQ)'
  };

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newType, setNewType] = useState('Home');
  const [newAddr, setNewAddr] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center max-w-sm w-full space-y-4">
          <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Please Sign In</h2>
          <p className="text-xs text-gray-500 font-normal">Sign in to manage your profile, saved addresses, and view order history.</p>
          <Link
            to="/login"
            className="block py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl transition-all shadow-xs text-xs cursor-pointer"
          >
            SIGN IN NOW
          </Link>
        </div>
      </div>
    );
  }

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.trim()) return;

    addAddress({
      type: newType,
      address: newAddr,
      pincode: newPincode || '673001',
      landmark: newLandmark
    });

    setIsAddAddressOpen(false);
    setNewAddr('');
    setNewPincode('');
    setNewLandmark('');
    setToastMsg('New address added successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {toastMsg && <Toast message={toastMsg} type="success" onClose={() => setToastMsg('')} />}

      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* User Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 text-white rounded-2xl flex items-center justify-center font-semibold text-xl shadow-xs ${
              user.role === 'super_admin'
                ? 'bg-gradient-to-tr from-purple-600 to-indigo-600'
                : 'bg-gradient-to-tr from-orange-500 to-amber-500'
            }`}>
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{user.name}</h1>
              <p className="text-xs text-gray-500 font-normal">{user.phone} • {user.email}</p>
              <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                <Shield className="w-3 h-3" /> {roleLabels[user.role] || roleLabels.user}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 font-medium text-xs rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Role-Specific Dashboard Launchers */}
        {(user.role === 'admin' || user.role === 'super_admin') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/admin"
              className="p-5 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg transition-all group flex flex-col justify-between h-40"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Store Operations
                </span>
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight">Admin Dashboard</h3>
                <p className="text-xs text-white/90 font-medium mt-0.5">Manage live orders queue, update dish availability & review outlet metrics.</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-black text-white group-hover:translate-x-1 transition-transform">
                <span>Enter Admin Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {user.role === 'super_admin' && (
              <Link
                to="/super-admin"
                className="p-5 rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-700 text-white shadow-md hover:shadow-lg transition-all group flex flex-col justify-between h-40"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Platform HQ
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight">Super Admin Console</h3>
                  <p className="text-xs text-white/90 font-medium mt-0.5">Multi-restaurant governance, GMV financials, user roles & global configurations.</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-black text-white group-hover:translate-x-1 transition-transform">
                  <span>Enter Super Admin HQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Demo Persona Switcher */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700">Demo Persona Switcher</h3>
            </div>
            <span className="text-[11px] text-gray-400">Switch current account role for testing</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'user', label: 'Customer (User)', desc: 'Browse & Order Food' },
              { id: 'admin', label: 'Store Admin', desc: 'Restaurant Manager' },
              { id: 'super_admin', label: 'Super Admin', desc: 'Foodly Platform HQ' }
            ].map(persona => {
              const isSelected = user.role === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => {
                    switchRole(persona.id);
                    setToastMsg(`Switched role to ${persona.label}`);
                    if (persona.id === 'admin') navigate('/admin');
                    if (persona.id === 'super_admin') navigate('/super-admin');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-bold text-xs text-gray-900">{persona.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{persona.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Saved Delivery Addresses */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-semibold text-base text-gray-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Saved Addresses ({user.addresses.length})</span>
            </h3>
            <button
              onClick={() => setIsAddAddressOpen(!isAddAddressOpen)}
              className="flex items-center gap-1 text-xs font-medium text-orange-600 hover:underline cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          {/* Add Address Form */}
          {isAddAddressOpen && (
            <form onSubmit={handleAddAddressSubmit} className="bg-orange-50/40 p-4 rounded-2xl border border-orange-100 space-y-3">
              <div className="text-xs font-semibold text-orange-700 uppercase">Add New Delivery Location</div>
              <div className="flex gap-2">
                {['Home', 'Work', 'Other'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewType(type)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      newType === type ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Full address (House no, Street, Area)"
                value={newAddr}
                onChange={(e) => setNewAddr(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-normal focus:outline-none focus:border-orange-500"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Pincode"
                  value={newPincode}
                  onChange={(e) => setNewPincode(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-normal focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  value={newLandmark}
                  onChange={(e) => setNewLandmark(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-normal focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-orange-500 text-white text-xs font-medium rounded-lg hover:bg-orange-600"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {user.addresses.map((addr) => {
              const isSelected = user.selectedAddressId === addr.id;
              const Icon = addr.type === 'Work' ? Briefcase : Home;

              return (
                <div
                  key={addr.id}
                  onClick={() => selectAddress(addr.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
                    isSelected ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-800">{addr.type}</div>
                      <div className="text-xs text-gray-600 font-normal mt-0.5">{addr.address}, {addr.pincode}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] font-medium bg-orange-500 text-white px-2 py-0.5 rounded uppercase">
                      ACTIVE
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/orders"
            className="p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex items-center gap-3"
          >
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Orders</div>
              <div className="text-xs text-gray-500 font-normal">Track & reorder</div>
            </div>
          </Link>

          <Link
            to="/favorites"
            className="p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex items-center gap-3"
          >
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Favorites</div>
              <div className="text-xs text-gray-500 font-normal">Saved spots & food</div>
            </div>
          </Link>

          <Link
            to="/help"
            className="p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex items-center gap-3"
          >
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Help & Support</div>
              <div className="text-xs text-gray-500 font-normal">24/7 Customer care</div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};
