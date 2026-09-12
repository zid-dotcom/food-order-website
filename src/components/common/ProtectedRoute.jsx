import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, RefreshCw, LogIn } from 'lucide-react';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, switchRole } = useAuth();
  const location = useLocation();

  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(user.role);

  if (!hasAccess) {
    const requiredRoleName = allowedRoles.includes('super_admin') && !allowedRoles.includes('admin')
      ? 'Super Admin'
      : 'Admin';

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-gray-100 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Access Restricted</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              This area requires <span className="font-bold text-gray-800">{requiredRoleName}</span> privileges.
              You are currently logged in as <span className="font-bold text-orange-600 uppercase">{user.role}</span>.
            </p>
          </div>

          {/* Quick Demo Switcher */}
          <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 space-y-2 text-left">
            <p className="text-[11px] font-bold text-orange-800 uppercase tracking-wide flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
              Quick Switch Role for Demo:
            </p>
            <div className="flex gap-2">
              {allowedRoles.includes('admin') && (
                <button
                  onClick={() => switchRole('admin')}
                  className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Switch to Admin
                </button>
              )}
              {allowedRoles.includes('super_admin') && (
                <button
                  onClick={() => switchRole('super_admin')}
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Switch to Super Admin
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/"
              className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
            <Link
              to="/login"
              className="flex-1 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log in as Another</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
