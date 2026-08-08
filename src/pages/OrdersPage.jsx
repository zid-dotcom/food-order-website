import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { OrderStatusBadge } from '../components/order/OrderStatusBadge';
import { OrderTrackingModal } from '../components/order/OrderTrackingModal';
import { Utensils, RotateCcw, Navigation } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { Toast } from '../components/common/Toast';

export const OrdersPage = () => {
  const { orders } = useOrders();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState('all'); // all, active, delivered
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'active') return o.status === 'Preparing' || o.status === 'Out for Delivery';
    if (activeTab === 'delivered') return o.status === 'Delivered';
    return true;
  });

  const handleReorder = (order) => {
    order.items.forEach(item => {
      addToCart(item, { id: order.restaurantId, name: order.restaurantName, location: order.restaurantLocation });
    });
    setToastMsg(`Items from ${order.restaurantName} added to your cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {toastMsg && <Toast message={toastMsg} type="success" onClose={() => setToastMsg('')} />}

      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              <span>My Orders</span>
            </h1>
            <p className="text-xs text-gray-500 font-normal">Track current orders & review past order history</p>
          </div>

          <div className="flex bg-white p-1 rounded-xl border border-gray-200 text-xs font-medium text-gray-600">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'all' ? 'bg-orange-500 text-white font-semibold shadow-2xs' : 'hover:bg-gray-100'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'active' ? 'bg-orange-500 text-white font-semibold shadow-2xs' : 'hover:bg-gray-100'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('delivered')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'delivered' ? 'bg-orange-500 text-white font-semibold shadow-2xs' : 'hover:bg-gray-100'
              }`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isActive = order.status === 'Preparing' || order.status === 'Out for Delivery';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-gray-100 p-5 shadow-2xs hover:shadow-sm transition-all space-y-3.5"
                >
                  {/* Top: Restaurant Header + Status */}
                  <div className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.restaurantImage}
                        alt={order.restaurantName}
                        className="w-11 h-11 rounded-2xl object-cover border border-gray-100"
                      />
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800">{order.restaurantName}</h3>
                        <div className="text-xs text-gray-500 font-normal">{order.restaurantLocation} • Order #{order.id}</div>
                      </div>
                    </div>

                    <OrderStatusBadge status={order.status} />
                  </div>

                  {/* Middle: Items Summary */}
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-gray-600 font-normal">
                        <span>{item.qty}x {item.name}</span>
                        <span className="font-medium">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer: Date & Actions */}
                  <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-gray-500 font-normal">
                      <span>Total Paid: </span>
                      <span className="font-semibold text-gray-800 text-sm">₹{order.grandTotal}</span>
                      <span className="ml-2 text-gray-400">({order.paymentMethod})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive ? (
                        <button
                          onClick={() => setTrackingModalOrder(order)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-2xs cursor-pointer"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Track Live Order</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReorder(order)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reorder Items</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon="food"
            title="No orders found"
            description="You haven't placed any food orders yet. Explore top restaurants to order now!"
            actionText="Start Food Order"
            actionLink="/"
          />
        )}

      </div>

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        order={trackingModalOrder}
        isOpen={Boolean(trackingModalOrder)}
        onClose={() => setTrackingModalOrder(null)}
      />
    </div>
  );
};
