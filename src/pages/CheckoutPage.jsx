import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, CreditCard, Wallet, Smartphone, Banknote, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { AddressCard } from '../components/checkout/AddressCard';
import { OrderSummary } from '../components/checkout/OrderSummary';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, currentRestaurant, subtotal, deliveryFee, platformFee, taxes, discount, grandTotal, clearCart, appliedCoupon } = useCart();
  const { user, selectAddress, getActiveAddress } = useAuth();
  const { placeOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] = useState("UPI (Google Pay)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPlacingOrderRef = useRef(false);

  const activeAddress = getActiveAddress();

  // Redirect to /cart only if cart is empty and user is not in the middle of placing an order
  useEffect(() => {
    if (cartItems.length === 0 && !isPlacingOrderRef.current) {
      navigate('/cart', { replace: true });
    }
  }, [cartItems.length, navigate]);

  if (cartItems.length === 0 && !isPlacingOrderRef.current) {
    return null;
  }

  const handlePlaceOrder = () => {
    if (isPlacingOrderRef.current) return;

    isPlacingOrderRef.current = true;
    setIsSubmitting(true);

    // Save order data first before clearing cart
    const orderPayload = {
      restaurantId: currentRestaurant?.id || "rest-1",
      restaurantName: currentRestaurant?.name || "Thalassery Biryani Centre",
      restaurantImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80",
      restaurantLocation: currentRestaurant?.location || "Mavoor Road, Calicut",
      items: [...cartItems],
      subtotal,
      deliveryFee,
      platformFee,
      taxes,
      discount,
      grandTotal,
      paymentMethod,
      address: activeAddress ? `${activeAddress.address}, ${activeAddress.pincode}` : "Mavoor Road, Calicut"
    };

    setTimeout(() => {
      // 1. Create order in OrderContext
      placeOrder(orderPayload);

      // 2. Navigate to /orders page FIRST
      navigate('/orders', { replace: true });

      // 3. Clear cart AFTER navigation
      setTimeout(() => {
        clearCart();
      }, 100);
    }, 1200);
  };

  const paymentOptions = [
    { id: "upi", label: "UPI (Google Pay / PhonePe / Paytm)", desc: "Instant pay via any UPI app", icon: Smartphone },
    { id: "cod", label: "Cash on Delivery", desc: "Pay cash to delivery executive", icon: Banknote },
    { id: "card", label: "Credit / Debit Card", desc: "Visa, MasterCard, RuPay", icon: CreditCard },
    { id: "wallet", label: "Wallets", desc: "Amazon Pay, Paytm Balance", icon: Wallet }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Checkout</h1>
            <p className="text-xs text-gray-500 font-normal">Confirm delivery address & payment options</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Secure Checkout</span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Address & Payment */}
          <div className="md:col-span-2 space-y-5">
            
            {/* Step 1: Address */}
            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-2xs space-y-3.5">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>1. Select Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {user.addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    isSelected={user.selectedAddressId === addr.id}
                    onSelect={() => selectAddress(addr.id)}
                  />
                ))}
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-2xs space-y-3.5">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-orange-500" />
                <span>2. Choose Payment Method</span>
              </h3>

              <div className="space-y-2.5">
                {paymentOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = paymentMethod === opt.label;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.label)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/30 shadow-2xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-800">{opt.label}</div>
                          <div className="text-xs text-gray-500 font-normal">{opt.desc}</div>
                        </div>
                      </div>

                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right 1 Col: Summary & Place Order */}
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
            />

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold text-base rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>PROCESSING PAYMENT...</span>
                </>
              ) : (
                <>
                  <span>PAY ₹{grandTotal} & PLACE ORDER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
