export const offers = [
  {
    id: "offer-1",
    code: "FOODLY50",
    title: "50% OFF up to ₹100",
    description: "Use code FOODLY50 on orders above ₹199 across all top-rated restaurants",
    discountType: "percentage",
    discountValue: 50,
    maxDiscount: 100,
    minOrder: 199,
    expiry: "Valid till 31 Aug 2026",
    terms: "Applicable once per user per day. Maximum discount ₹100."
  },
  {
    id: "offer-2",
    code: "WELCOME100",
    title: "FLAT ₹100 OFF",
    description: "Special welcome offer for your order above ₹299",
    discountType: "flat",
    discountValue: 100,
    maxDiscount: 100,
    minOrder: 299,
    expiry: "Valid for next 7 days",
    terms: "Applicable on your first 3 orders with FOODLY."
  },
  {
    id: "offer-3",
    code: "FREEDEL",
    title: "FREE DELIVERY",
    description: "Get zero delivery fee on orders above ₹149",
    discountType: "free_delivery",
    discountValue: 35,
    maxDiscount: 35,
    minOrder: 149,
    expiry: "Valid today",
    terms: "Free delivery discount up to ₹35 applied at checkout."
  },
  {
    id: "offer-4",
    code: "FESTIVE125",
    title: "FLAT ₹125 OFF",
    description: "Enjoy ₹125 instant discount on feast orders above ₹499",
    discountType: "flat",
    discountValue: 125,
    maxDiscount: 125,
    minOrder: 499,
    expiry: "Valid till Sunday",
    terms: "Valid on orders containing Biryani, Grills or Pizzas."
  }
];
