import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-24 md:pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                FOOD<span className="text-orange-500">LY</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              FOODLY is India's premier food delivery platform bringing fresh, delicious meals from top local restaurants right to your doorstep.
            </p>
            <p className="text-xs text-gray-500 font-normal">
              © 2026 FOODLY Technologies Pvt. Ltd.
            </p>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs font-normal">
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Team & Careers</Link></li>
              <li><Link to="/offers" className="hover:text-orange-400 transition-colors">Foodly One Membership</Link></li>
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Foodly Instamart</Link></li>
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Foodly Genie</Link></li>
            </ul>
          </div>

          {/* Col 3: Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Contact & Support</h4>
            <ul className="space-y-2 text-xs font-normal">
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Help & Support</Link></li>
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Partner with Us</Link></li>
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Ride with Us</Link></li>
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/help" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 4: We deliver to */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">We Deliver To</h4>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400 font-normal">
              <span className="bg-gray-800 px-2.5 py-1 rounded-md">Calicut</span>
              <span className="bg-gray-800 px-2.5 py-1 rounded-md">Kochi</span>
              <span className="bg-gray-800 px-2.5 py-1 rounded-md">Trivandrum</span>
              <span className="bg-gray-800 px-2.5 py-1 rounded-md">Bangalore</span>
              <span className="bg-gray-800 px-2.5 py-1 rounded-md">Chennai</span>
              <span className="bg-gray-800 px-2.5 py-1 rounded-md">Mumbai</span>
            </div>
          </div>

        </div>

        {/* Bottom tagline */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-normal gap-4">
          <div>Made for food lovers with passion across India.</div>
          <div className="flex items-center gap-4">
            <Link to="/offers" className="hover:text-orange-400">Offers</Link>
            <Link to="/restaurants" className="hover:text-orange-400">Restaurants</Link>
            <Link to="/help" className="hover:text-orange-400">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
