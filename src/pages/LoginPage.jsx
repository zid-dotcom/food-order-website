import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mobileOrEmail, setMobileOrEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobileOrEmail.trim()) return;
    login(mobileOrEmail);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md max-w-md w-full overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white text-center space-y-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-xs rounded-2xl flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">FOOD<span className="text-orange-200">LY</span></h1>
          <p className="text-xs text-white/90 font-normal">Log in to unlock exclusive offers & fast delivery</p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase">Mobile Number or Email</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter 10-digit phone number or email"
                value={mobileOrEmail}
                onChange={(e) => setMobileOrEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm"
          >
            <span>CONTINUE</span>
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
