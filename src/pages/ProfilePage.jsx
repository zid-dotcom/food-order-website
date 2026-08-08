import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, Heart, Utensils, HelpCircle, LogOut, Plus, Shield, Home, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/common/Toast';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, addAddress, selectAddress } = useAuth();

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
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl flex items-center justify-center font-semibold text-xl shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{user.name}</h1>
              <p className="text-xs text-gray-500 font-normal">{user.phone} • {user.email}</p>
              <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                <Shield className="w-3 h-3" /> FOODLY ONE MEMBER
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 font-medium text-xs rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
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
