import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, phone);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md max-w-md w-full overflow-hidden">
        
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white text-center space-y-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-xs rounded-2xl flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">FOOD<span className="text-orange-200">LY</span></h1>
          <p className="text-xs text-white/90 font-normal">Create an account to start ordering delicious food</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Arjun Nair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-normal text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase">Email Address</label>
            <input
              type="email"
              placeholder="arjun@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-normal text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase">Mobile Number</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-normal text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm"
          >
            <span>CREATE ACCOUNT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 font-normal">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};
