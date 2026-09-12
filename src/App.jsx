import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { OrderProvider } from './context/OrderContext';

import { Navbar } from './components/common/Navbar';
import { MobileHeader } from './components/common/MobileHeader';
import { BottomNavigation } from './components/common/BottomNavigation';
import { CartBar } from './components/common/CartBar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { RestaurantDetailsPage } from './pages/RestaurantDetailsPage';
import { SearchPage } from './pages/SearchPage';
import { OffersPage } from './pages/OffersPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HelpPage } from './pages/HelpPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SuperAdminDashboardPage } from './pages/SuperAdminDashboardPage';

const RestaurantConflictModal = () => {
  const { restaurantConflictModal, closeConflictModal, confirmClearAndAdd, currentRestaurant } = useCart();

  if (!restaurantConflictModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
        <h3 className="text-lg font-extrabold text-gray-900">Replace cart items?</h3>
        <p className="text-xs text-gray-600 leading-relaxed font-medium">
          Your cart contains dishes from <strong className="text-gray-900">{currentRestaurant?.name}</strong>. Do you want to discard your cart and add dishes from <strong className="text-gray-900">{restaurantConflictModal.pendingRestaurant?.name}</strong>?
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={closeConflictModal}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
          >
            NO, KEEP ITEMS
          </button>
          <button
            onClick={confirmClearAndAdd}
            className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
          >
            YES, REPLACE
          </button>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/super-admin');

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Desktop & Mobile Top Headers (hidden on custom dashboard views) */}
      {!isDashboard && <Navbar />}
      {!isDashboard && <MobileHeader />}

      {/* Main Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Super Admin Dashboard */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <SuperAdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/*"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <SuperAdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Floating Bottom Cart Bar */}
      {!isDashboard && <CartBar />}

      {/* Mobile Bottom Navigation */}
      {!isDashboard && <BottomNavigation />}

      {/* Footer */}
      {!isDashboard && <Footer />}

      {/* Multi-restaurant Warning Modal */}
      <RestaurantConflictModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <OrderProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </OrderProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
