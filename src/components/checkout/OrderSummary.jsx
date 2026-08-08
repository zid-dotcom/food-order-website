import React from 'react';
import { Check, Tag } from 'lucide-react';

export const OrderSummary = ({
  items,
  subtotal,
  deliveryFee,
  platformFee,
  taxes,
  discount,
  grandTotal,
  appliedCoupon,
  onApplyCouponClick,
  onRemoveCoupon
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs space-y-4">
      <h3 className="font-semibold text-sm sm:text-base text-gray-800 border-b border-gray-100 pb-3">
        Bill Details
      </h3>

      {/* Coupon banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            {appliedCoupon ? (
              <>
                <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Coupon '{appliedCoupon.code}' Applied!</span>
                </div>
                <div className="text-[11px] text-gray-500 font-normal">
                  Saving ₹{discount} on this order
                </div>
              </>
            ) : (
              <>
                <div className="text-xs font-semibold text-gray-800">Apply Coupon Code</div>
                <div className="text-[11px] text-gray-500 font-normal">Save up to 50% extra</div>
              </>
            )}
          </div>
        </div>

        {appliedCoupon ? (
          <button
            onClick={onRemoveCoupon}
            className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
          >
            REMOVE
          </button>
        ) : (
          <button
            onClick={onApplyCouponClick}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 cursor-pointer uppercase"
          >
            APPLY
          </button>
        )}
      </div>

      {/* Price Rows */}
      <div className="space-y-2 text-xs text-gray-600 font-normal pt-1">
        <div className="flex items-center justify-between">
          <span>Item Total</span>
          <span className="font-medium text-gray-800">₹{subtotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            Delivery Fee
            {deliveryFee === 0 && <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1 py-0.5 rounded font-medium">FREE</span>}
          </span>
          <span className={`font-medium ${deliveryFee === 0 ? 'text-emerald-700 line-through' : 'text-gray-800'}`}>
            ₹{deliveryFee === 0 ? 35 : deliveryFee}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Platform Fee</span>
          <span className="font-medium text-gray-800">₹{platformFee}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>GST & Restaurant Charges (5%)</span>
          <span className="font-medium text-gray-800">₹{taxes}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-700 font-medium bg-emerald-50/70 p-2 rounded-lg">
            <span>Coupon Discount</span>
            <span>- ₹{discount}</span>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-sm font-semibold text-gray-800">
        <span>TO PAY</span>
        <span className="text-lg text-orange-600 font-semibold">₹{grandTotal}</span>
      </div>
    </div>
  );
};
