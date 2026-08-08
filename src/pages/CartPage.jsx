import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, MapPin, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { VegIndicator } from '../components/common/VegIndicator';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { EmptyState } from '../components/common/EmptyState';
import { offers } from '../data/offers';
import { Toast } from '../components/common/Toast';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    currentRestaurant,
    updateQty,
    clearCart,
    subtotal,
    deliveryFee,
    platformFee,
    taxes,
    discount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { getActiveAddress } = useAuth();
  const activeAddress = getActiveAddress();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          description="Good food is always cooking! Add dishes from top restaurants to start your order."
          actionText="Explore Restaurants"
          actionLink="/restaurants"
        />
      </div>
    );
  }

  const handleApplyCoupon = (coupon) => {
    if (subtotal < (coupon.minOrder || 0)) {
      setToastMsg(`Minimum order of ₹${coupon.minOrder} required for ${coupon.code}`);
      return;
    }
    applyCoupon(coupon);
    setIsCouponModalOpen(false);
    setToastMsg(`Coupon '${coupon.code}' applied successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {toastMsg && <Toast message={toastMsg} type="info" onClose={() => setToastMsg('')} />}

      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <span>My Cart ({cartItems.length})</span>
          </h1>

          <button
            onClick={clearCart}
            className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Cart items list & Address */}
          <div className="md:col-span-2 space-y-5">
            
            {/* Restaurant Info Header */}
            {currentRestaurant && (
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-3">
                <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">{currentRestaurant.name}</h3>
                  <p className="text-xs text-gray-500 font-normal">{currentRestaurant.location}</p>
                </div>
              </div>
            )}

            {/* Cart Items Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <VegIndicator isVeg={item.isVeg} />
                    <div>
                      <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
                      <div className="text-xs font-normal text-gray-600 mt-0.5">₹{item.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <QuantitySelector
                      qty={item.qty}
                      onIncrease={() => updateQty(item.id, 1)}
                      onDecrease={() => updateQty(item.id, -1)}
                    />
                    <span className="font-medium text-sm text-gray-800 w-16 text-right">
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 font-semibold text-sm text-gray-800">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Delivery Address</span>
                </div>
                <Link to="/profile" className="text-xs font-medium text-orange-600 hover:underline">
                  Change
                </Link>
              </div>

              {activeAddress ? (
                <div className="text-xs text-gray-600 space-y-1 font-normal">
                  <div className="font-medium text-gray-800">{activeAddress.type} ({activeAddress.landmark || 'Home'})</div>
                  <div>{activeAddress.address}, {activeAddress.pincode}</div>
                </div>
              ) : (
                <div className="text-xs text-gray-500 font-normal">No address selected. Please add an address.</div>
              )}
            </div>

          </div>

          {/* Right 1 Col: Summary & Checkout button */}
          <div className="space-y-5">
            <OrderSummary
              items={cartItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              platformFee={platformFee}
              taxes={taxes}
              discount={discount}
              grandTotal={grandTotal}
              appliedCoupon={appliedCoupon}
              onApplyCouponClick={() => setIsCouponModalOpen(true)}
              onRemoveCoupon={removeCoupon}
            />

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Coupon Selector Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-base text-gray-800">Apply Promo Code</h3>
              <button onClick={() => setIsCouponModalOpen(false)} className="text-xs font-medium text-gray-400 hover:text-gray-700">
                CLOSE
              </button>
            </div>

            <div className="space-y-2.5">
              {offers.map(offer => (
                <div key={offer.id} className="p-3 border border-gray-200 rounded-xl hover:border-orange-500 flex items-center justify-between">
                  <div>
                    <div className="font-mono font-semibold text-sm text-gray-800">{offer.code}</div>
                    <div className="text-xs text-gray-500 font-normal">{offer.title}</div>
                  </div>
                  <button
                    onClick={() => handleApplyCoupon(offer)}
                    className="px-3 py-1 bg-orange-50 text-orange-600 font-semibold text-xs rounded-lg hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
