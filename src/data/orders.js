export const initialOrders = [
  {
    id: "FD10291",
    restaurantId: "rest-1",
    restaurantName: "Thalassery Biryani Centre",
    restaurantImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80",
    restaurantLocation: "Mavoor Road, Calicut",
    items: [
      { id: "food-101", name: "Thalassery Chicken Dum Biryani", price: 240, qty: 2 },
      { id: "food-106", name: "Sulaimani Chai (Hot)", price: 30, qty: 2 }
    ],
    subtotal: 540,
    deliveryFee: 30,
    platformFee: 6,
    taxes: 24,
    discount: 100,
    grandTotal: 500,
    paymentMethod: "UPI (Google Pay)",
    address: "Room 402, Platinum Residency, Mavoor Road, Calicut - 673004",
    status: "Out for Delivery", // Preparing, Out for Delivery, Delivered, Cancelled
    createdAt: "2026-08-08T12:10:00Z",
    estimatedDeliveryTime: "18 mins",
    deliveryExecutive: {
      name: "Rahul Kumar",
      phone: "+91 98765 43210",
      rating: 4.9,
      vehicle: "Kerala KL 11 AZ 4029"
    }
  },
  {
    id: "FD10188",
    restaurantId: "rest-2",
    restaurantName: "Arabian Grill & Mandi",
    restaurantImage: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=300&auto=format&fit=crop&q=80",
    restaurantLocation: "Beach Road, Calicut",
    items: [
      { id: "food-201", name: "Full Al Faham Chicken (Pepper)", price: 490, qty: 1 },
      { id: "food-202", name: "Rumali Shawarma Roll", price: 130, qty: 2 }
    ],
    subtotal: 750,
    deliveryFee: 35,
    platformFee: 6,
    taxes: 38,
    discount: 125,
    grandTotal: 704,
    paymentMethod: "Cash on Delivery",
    address: "Room 402, Platinum Residency, Mavoor Road, Calicut - 673004",
    status: "Delivered",
    createdAt: "2026-08-05T19:45:00Z",
    estimatedDeliveryTime: "Delivered",
    deliveryExecutive: {
      name: "Anas V.P.",
      phone: "+91 94471 22334",
      rating: 4.8,
      vehicle: "KL 11 AV 8812"
    }
  },
  {
    id: "FD09940",
    restaurantId: "rest-5",
    restaurantName: "Dosa Corner & Tiffins",
    restaurantImage: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&auto=format&fit=crop&q=80",
    restaurantLocation: "SM Street, Calicut",
    items: [
      { id: "food-501", name: "Ghee Roast Masala Dosa", price: 110, qty: 2 },
      { id: "food-504", name: "Filter Coffee (Hot)", price: 35, qty: 2 }
    ],
    subtotal: 290,
    deliveryFee: 20,
    platformFee: 6,
    taxes: 14,
    discount: 50,
    grandTotal: 280,
    paymentMethod: "Credit Card (HDFC)",
    address: "Room 402, Platinum Residency, Mavoor Road, Calicut - 673004",
    status: "Delivered",
    createdAt: "2026-08-01T08:30:00Z",
    estimatedDeliveryTime: "Delivered",
    deliveryExecutive: {
      name: "Shaju M.",
      phone: "+91 98470 11223",
      rating: 4.9,
      vehicle: "KL 11 BE 1902"
    }
  }
];
