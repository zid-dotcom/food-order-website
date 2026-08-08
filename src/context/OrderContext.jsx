import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialOrders } from '../data/orders';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('foodly_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [activeTrackingId, setActiveTrackingId] = useState("FD10291");

  useEffect(() => {
    localStorage.setItem('foodly_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderPayload) => {
    const newId = `FD${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newId,
      restaurantId: orderPayload.restaurantId,
      restaurantName: orderPayload.restaurantName,
      restaurantImage: orderPayload.restaurantImage || "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80",
      restaurantLocation: orderPayload.restaurantLocation || "Calicut",
      items: orderPayload.items,
      subtotal: orderPayload.subtotal,
      deliveryFee: orderPayload.deliveryFee,
      platformFee: orderPayload.platformFee,
      taxes: orderPayload.taxes,
      discount: orderPayload.discount,
      grandTotal: orderPayload.grandTotal,
      paymentMethod: orderPayload.paymentMethod || "UPI (Google Pay)",
      address: orderPayload.address || "Mavoor Road, Calicut",
      status: "Preparing",
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: "25 mins",
      deliveryExecutive: {
        name: "Vikram S.",
        phone: "+91 98460 77889",
        rating: 4.9,
        vehicle: "KL 11 BN 5521"
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingId(newId);
    return newOrder;
  };

  const getOrderById = (id) => orders.find(o => o.id === id);

  const getActiveOrder = () => {
    return orders.find(o => o.status === "Preparing" || o.status === "Out for Delivery") || null;
  };

  return (
    <OrderContext.Provider value={{
      orders,
      placeOrder,
      getOrderById,
      getActiveOrder,
      activeTrackingId,
      setActiveTrackingId
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
