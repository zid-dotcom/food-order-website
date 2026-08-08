import React from 'react';
import { X, CheckCircle2, Phone, Navigation, Bike, ChefHat, Store } from 'lucide-react';

export const OrderTrackingModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const timelineSteps = [
    { title: "Order Placed", desc: "Order #" + order.id + " received", icon: CheckCircle2, done: true },
    { title: "Restaurant Accepted", desc: order.restaurantName + " confirmed order", icon: Store, done: true },
    { title: "Food Preparing", desc: "Chef is preparing your meal fresh", icon: ChefHat, done: order.status !== "Cancelled" },
    { title: "Out for Delivery", desc: "Partner on the way to your door", icon: Bike, done: order.status === "Out for Delivery" || order.status === "Delivered" },
    { title: "Delivered", desc: "Handed over at " + (order.address?.split(',')[0] || "destination"), icon: Navigation, done: order.status === "Delivered" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-white/80">Live Delivery Status</div>
            <h2 className="text-lg font-semibold flex items-center gap-2 mt-0.5">
              <span>Arriving in {order.estimatedDeliveryTime}</span>
            </h2>
            <div className="text-xs text-white/90 font-normal mt-0.5">Order #{order.id}</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Driver Card */}
        {order.deliveryExecutive && (
          <div className="p-4 bg-orange-50/50 border-b border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-medium text-sm">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">{order.deliveryExecutive.name}</div>
                <div className="text-xs text-gray-500 font-normal">
                  {order.deliveryExecutive.vehicle} • ⭐ {order.deliveryExecutive.rating}
                </div>
              </div>
            </div>
            <a
              href={`tel:${order.deliveryExecutive.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Partner</span>
            </a>
          </div>
        )}

        {/* Timeline */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 bg-white">
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {timelineSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="relative flex items-start gap-3.5 group">
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center z-10 transition-colors ${
                      step.done
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <StepIcon className="w-3 h-3" />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${step.done ? "text-gray-800" : "text-gray-400"}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 font-normal mt-0.5">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Items Summary */}
          <div className="pt-4 border-t border-gray-100 bg-gray-50/50 p-3.5 rounded-xl">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Items Ordered ({order.items.length})
            </div>
            <div className="space-y-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs font-normal text-gray-700">
                  <span>{item.qty}x {item.name}</span>
                  <span className="font-medium">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
