import React, { createContext, useContext, useState, useEffect } from 'react';
import { offers } from '../data/offers';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('foodly_cart_items');
    return saved ? JSON.parse(saved) : [
      {
        id: "food-101",
        restaurantId: "rest-1",
        restaurantName: "Thalassery Biryani Centre",
        name: "Thalassery Chicken Dum Biryani",
        price: 240,
        qty: 2,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "food-106",
        restaurantId: "rest-1",
        restaurantName: "Thalassery Biryani Centre",
        name: "Sulaimani Chai (Hot)",
        price: 30,
        qty: 1,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&auto=format&fit=crop&q=80"
      }
    ];
  });

  const [currentRestaurant, setCurrentRestaurant] = useState(() => {
    const saved = localStorage.getItem('foodly_cart_restaurant');
    return saved ? JSON.parse(saved) : {
      id: "rest-1",
      name: "Thalassery Biryani Centre",
      location: "Mavoor Road, Calicut"
    };
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('foodly_cart_coupon');
    return saved ? JSON.parse(saved) : offers[0]; // Default FOODLY50
  });

  const [restaurantConflictModal, setRestaurantConflictModal] = useState(null);

  useEffect(() => {
    localStorage.setItem('foodly_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('foodly_cart_restaurant', JSON.stringify(currentRestaurant));
  }, [currentRestaurant]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('foodly_cart_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('foodly_cart_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (item, restaurant) => {
    // If cart is not empty and from a different restaurant
    if (cartItems.length > 0 && currentRestaurant?.id && currentRestaurant.id !== restaurant.id) {
      setRestaurantConflictModal({
        pendingItem: item,
        pendingRestaurant: restaurant
      });
      return false;
    }

    // Set restaurant
    if (!currentRestaurant || cartItems.length === 0) {
      setCurrentRestaurant({
        id: restaurant.id,
        name: restaurant.name,
        location: restaurant.location || "Calicut"
      });
    }

    setCartItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += 1;
        return updated;
      } else {
        return [...prev, {
          id: item.id,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          name: item.name,
          price: item.price,
          isVeg: item.isVeg,
          image: item.image,
          qty: 1
        }];
      }
    });
    return true;
  };

  const confirmClearAndAdd = () => {
    if (restaurantConflictModal) {
      const { pendingItem, pendingRestaurant } = restaurantConflictModal;
      setCartItems([{
        id: pendingItem.id,
        restaurantId: pendingRestaurant.id,
        restaurantName: pendingRestaurant.name,
        name: pendingItem.name,
        price: pendingItem.price,
        isVeg: pendingItem.isVeg,
        image: pendingItem.image,
        qty: 1
      }]);
      setCurrentRestaurant({
        id: pendingRestaurant.id,
        name: pendingRestaurant.name,
        location: pendingRestaurant.location || "Calicut"
      });
      setRestaurantConflictModal(null);
    }
  };

  const updateQty = (itemId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setCurrentRestaurant(null);
    setAppliedCoupon(null);
  };

  const getItemQty = (itemId) => {
    const found = cartItems.find(i => i.id === itemId);
    return found ? found.qty : 0;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Delivery & Fees
  const deliveryFee = subtotal > 0 ? (subtotal > 499 ? 0 : 30) : 0;
  const platformFee = subtotal > 0 ? 6 : 0;
  const taxes = Math.round(subtotal * 0.05); // 5% GST

  // Discount Calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= (appliedCoupon.minOrder || 0)) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.min(Math.round((subtotal * appliedCoupon.discountValue) / 100), appliedCoupon.maxDiscount || 100);
    } else if (appliedCoupon.discountType === 'flat') {
      discount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === 'free_delivery') {
      discount = deliveryFee;
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + platformFee + taxes - discount);

  return (
    <CartContext.Provider value={{
      cartItems,
      currentRestaurant,
      appliedCoupon,
      subtotal,
      totalCount,
      deliveryFee,
      platformFee,
      taxes,
      discount,
      grandTotal,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      getItemQty,
      applyCoupon: setAppliedCoupon,
      removeCoupon: () => setAppliedCoupon(null),
      restaurantConflictModal,
      closeConflictModal: () => setRestaurantConflictModal(null),
      confirmClearAndAdd
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
