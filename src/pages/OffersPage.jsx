import React, { useState } from 'react';
import { offers } from '../data/offers';
import { Percent, Copy, Check, Tag } from 'lucide-react';
import { Toast } from '../components/common/Toast';

export const OffersPage = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setToastMessage(`Coupon code '${code}' copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Toast feedback */}
      {toastMessage && <Toast message={toastMessage} type="success" onClose={() => setToastMessage('')} />}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-10 px-4 sm:px-6 lg:px-8 mb-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-5">
          <div className="p-3.5 bg-white/20 backdrop-blur-xs rounded-2xl shrink-0">
            <Percent className="w-8 h-8 text-white stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-semibold bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Foodly Savings Zone
            </span>
            <h1 className="text-xl sm:text-3xl font-semibold tracking-tight mt-1">
              Offers & Promo Codes
            </h1>
            <p className="text-xs sm:text-sm text-white/90 font-normal mt-0.5">
              Copy promo codes and apply them at checkout for huge discounts
            </p>
          </div>
        </div>
      </div>

      {/* Offer Cards Grid */}
      <div className="max-w-4xl mx-auto px-4 space-y-5">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Tag className="w-4 h-4 text-orange-500" />
          <span>Available Coupons ({offers.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {offers.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                {/* Decorative border cut */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-200" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-200" />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                      {offer.expiry}
                    </span>
                    <span className="text-xs font-normal text-gray-400">
                      Min order: ₹{offer.minOrder}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-gray-600 font-normal leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Terms & Copy button */}
                <div className="pt-3 border-t border-dashed border-gray-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                    <span className="font-mono text-xs font-semibold text-gray-800 tracking-wider">
                      {offer.code}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(offer.code)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY CODE</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[10px] text-gray-400 font-normal pt-0.5">
                  • {offer.terms}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
