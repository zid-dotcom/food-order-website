import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight, User, ShieldCheck, Crown, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const loginTypes = [
  {
    id: 'user',
    label: 'User',
    title: 'User Login',
    helper: 'Order food, track deliveries, and save favorites.',
    placeholder: 'Enter phone number or email',
    Icon: User
  },
  {
    id: 'admin',
    label: 'Admin',
    title: 'Admin Login',
    helper: 'Manage restaurants, menus, offers, and orders.',
    placeholder: 'Enter admin email or phone',
    Icon: ShieldCheck
  },
  {
    id: 'super_admin',
    label: 'Super Admin',
    title: 'Super Admin Login',
    helper: 'Access platform-level controls and admin settings.',
    placeholder: 'Enter super admin email',
    Icon: Crown
  }
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState(loginTypes[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobileOrEmail.trim() || !password.trim()) return;
    login(mobileOrEmail, password, selectedLoginType.id);
    if (selectedLoginType.id === 'super_admin') {
      navigate('/super-admin');
    } else if (selectedLoginType.id === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const ActiveIcon = selectedLoginType.Icon;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md max-w-lg w-full overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white text-center space-y-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-xs rounded-2xl flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">FOOD<span className="text-orange-200">LY</span></h1>
          <p className="text-xs text-white/90 font-normal">Log in to unlock exclusive offers & fast delivery</p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-gray-50 p-1.5 border border-gray-100">
            {loginTypes.map((loginType) => {
              const Icon = loginType.Icon;
              const isActive = selectedLoginType.id === loginType.id;

              return (
                <button
                  key={loginType.id}
                  type="button"
                  onClick={() => setSelectedLoginType(loginType)}
                  className={`min-h-20 rounded-xl px-2 py-3 flex flex-col items-center justify-center gap-1.5 text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-orange-600 shadow-xs ring-1 ring-orange-100'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-white/70'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] sm:text-xs font-semibold leading-tight">{loginType.label}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-orange-50/60 border border-orange-100 p-4 flex items-start gap-3">
            <div className="w-9 h-9 bg-orange-500 text-white rounded-xl flex items-center justify-center shrink-0">
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{selectedLoginType.title}</h2>
              <p className="text-xs text-gray-600 font-normal mt-0.5 leading-relaxed">{selectedLoginType.helper}</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase">Mobile Number or Email</label>
            <div className="relative">
              <input
                type="text"
                placeholder={selectedLoginType.placeholder}
                value={mobileOrEmail}
                onChange={(e) => setMobileOrEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase">Password</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={`Enter ${selectedLoginType.label.toLowerCase()} password`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700 cursor-pointer"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm"
          >
            <span>CONTINUE AS {selectedLoginType.label.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 font-normal">
              Don't have an account?{' '}
              <Link to="/signup" className="text-orange-600 font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center leading-relaxed font-normal">
            By continuing, you agree to FOODLY's <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
          </div>
        </form>

      </div>
    </div>
  );
};
