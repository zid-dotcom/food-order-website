export const menuCategories = [
  "Recommended",
  "Biryani",
  "Starters",
  "Grills",
  "Shawarma",
  "Main Course",
  "Breads",
  "Desserts",
  "Beverages"
];

export const foodsByRestaurant = {
  "rest-1": [ // Thalassery Biryani Centre
    {
      id: "food-101",
      restaurantId: "rest-1",
      name: "Thalassery Chicken Dum Biryani",
      price: 240,
      description: "Authentic Kaima rice dum biryani cooked with tender chicken, fried onions, cashews and secret spices.",
      isVeg: false,
      rating: 4.8,
      ratingCount: 1420,
      category: "Biryani",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-102",
      restaurantId: "rest-1",
      name: "Mutton Dum Biryani",
      price: 320,
      description: "Juicy mutton pieces slow-cooked with short-grain Kaima rice and freshly ground aromatic spices.",
      isVeg: false,
      rating: 4.7,
      ratingCount: 980,
      category: "Biryani",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-103",
      restaurantId: "rest-1",
      name: "Fish Biryani (King Fish)",
      price: 350,
      description: "Fresh King Fish masala embedded in aromatic ghee-rich short grain rice.",
      isVeg: false,
      rating: 4.6,
      ratingCount: 450,
      category: "Biryani",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-104",
      restaurantId: "rest-1",
      name: "Chicken 65 (Malabar Style)",
      price: 210,
      description: "Crispy fried chicken bits marinated with curry leaves, red chilies, and sour yogurt.",
      isVeg: false,
      rating: 4.5,
      ratingCount: 810,
      category: "Starters",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-105",
      restaurantId: "rest-1",
      name: "Coin Parotta (3 Pcs)",
      price: 60,
      description: "Flaky miniature layered Kerala wheat parottas baked on iron tawa.",
      isVeg: true,
      rating: 4.6,
      ratingCount: 1100,
      category: "Breads",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-106",
      restaurantId: "rest-1",
      name: "Sulaimani Chai (Hot)",
      price: 30,
      description: "Traditional Malabar spiced black tea infused with cardamom, mint & lemon.",
      isVeg: true,
      rating: 4.9,
      ratingCount: 2300,
      category: "Beverages",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&auto=format&fit=crop&q=80"
    }
  ],
  "rest-2": [ // Arabian Grill
    {
      id: "food-201",
      restaurantId: "rest-2",
      name: "Full Al Faham Chicken (Pepper)",
      price: 490,
      description: "Whole chicken charcoal grilled with authentic Arabian spices and green pepper paste. Served with Kubboos & Garlic Mayo.",
      isVeg: false,
      rating: 4.7,
      ratingCount: 1250,
      category: "Grills",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-202",
      restaurantId: "rest-2",
      name: "Rumali Shawarma Roll",
      price: 130,
      description: "Thin Rumali roti stuffed with slow-roasted chicken, pickles, French fries, and special toum garlic sauce.",
      isVeg: false,
      rating: 4.8,
      ratingCount: 3100,
      category: "Shawarma",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-203",
      restaurantId: "rest-2",
      name: "Chicken Mandi Half",
      price: 360,
      description: "Traditional Yemeni fragrant Mandi rice topped with juicy roasted chicken, fried raisins & nuts.",
      isVeg: false,
      rating: 4.6,
      ratingCount: 890,
      category: "Main Course",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-204",
      restaurantId: "rest-2",
      name: "Toum Garlic Sauce Dip",
      price: 40,
      description: "Authentic fluffy Lebanese garlic paste emulsion.",
      isVeg: true,
      rating: 4.9,
      ratingCount: 1500,
      category: "Starters",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-205",
      restaurantId: "rest-2",
      name: "Mint Lime Mojito",
      price: 80,
      description: "Refreshing crushed ice drink with muddled mint leaves, lemon juice & soda.",
      isVeg: true,
      rating: 4.5,
      ratingCount: 620,
      category: "Beverages",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80"
    }
  ],
  "rest-3": [ // Malabar Kitchen
    {
      id: "food-301",
      restaurantId: "rest-3",
      name: "Malabar Parotta (2 Pcs) + Beef Roast",
      price: 220,
      description: "Classic combo of 2 layered soft parottas with spicy slow-cooked Kerala style beef fry.",
      isVeg: false,
      rating: 4.8,
      ratingCount: 2100,
      category: "Recommended",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-302",
      restaurantId: "rest-3",
      name: "Special Kerala Fish Curry Meals",
      price: 190,
      description: "Red rice served with King Fish curry, avial, thoran, rasam, curd, pickle & papad.",
      isVeg: false,
      rating: 4.7,
      ratingCount: 1450,
      category: "Main Course",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-303",
      restaurantId: "rest-3",
      name: "Kizhi Parotta (Chicken)",
      price: 250,
      description: "Parottas layered with spicy chicken masala wrapped in banana leaf and steamed to perfection.",
      isVeg: false,
      rating: 4.9,
      ratingCount: 1800,
      category: "Recommended",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-304",
      restaurantId: "rest-3",
      name: "Payasam of the Day",
      price: 70,
      description: "Traditional Kerala sweet dessert made with jaggery, coconut milk, and roasted vermicelli.",
      isVeg: true,
      rating: 4.6,
      ratingCount: 520,
      category: "Desserts",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80"
    }
  ],
  "rest-4": [ // Burger House
    {
      id: "food-401",
      restaurantId: "rest-4",
      name: "Crispy Zinger Chicken Burger",
      price: 179,
      description: "Crispy fried chicken breast fillet, lettuce, cheddar cheese slice and spicy mayo in sesame brioche bun.",
      isVeg: false,
      rating: 4.6,
      ratingCount: 1120,
      category: "Recommended",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-402",
      restaurantId: "rest-4",
      name: "Double Cheese Veggie Smash Burger",
      price: 149,
      description: "Crispy potato & herb patty smashed with melted cheese, caramelized onions and secret sauce.",
      isVeg: true,
      rating: 4.5,
      ratingCount: 680,
      category: "Starters",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-403",
      restaurantId: "rest-4",
      name: "Peri Peri French Fries (Large)",
      price: 110,
      description: "Golden crispy skin-on fries tossed in fiery African peri peri seasoning blend.",
      isVeg: true,
      rating: 4.7,
      ratingCount: 940,
      category: "Starters",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-404",
      restaurantId: "rest-4",
      name: "Belgian Chocolate Milkshake",
      price: 140,
      description: "Thick creamy shake blended with dark Belgian cocoa and vanilla ice cream.",
      isVeg: true,
      rating: 4.8,
      ratingCount: 830,
      category: "Beverages",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80"
    }
  ],
  "rest-5": [ // Dosa Corner & Tiffins
    {
      id: "food-501",
      restaurantId: "rest-5",
      name: "Ghee Roast Masala Dosa",
      price: 110,
      description: "Golden crispy crepe roasted in pure Desi Ghee filled with spiced potato onion masala.",
      isVeg: true,
      rating: 4.9,
      ratingCount: 3400,
      category: "Recommended",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-502",
      restaurantId: "rest-5",
      name: "Cheese Butter Onion Dosa",
      price: 140,
      description: "Crispy dosa topped with grated Amul cheese, chopped onions & fresh coriander.",
      isVeg: true,
      rating: 4.7,
      ratingCount: 1650,
      category: "Biryani",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-503",
      restaurantId: "rest-5",
      name: "Steamed Soft Idli (3 Pcs) + Vada (1 Pc)",
      price: 80,
      description: "Piping hot fluffy rice cakes served with crispy medu vada, 3 chutneys and sambar.",
      isVeg: true,
      rating: 4.8,
      ratingCount: 2900,
      category: "Main Course",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-504",
      restaurantId: "rest-5",
      name: "Filter Coffee (Hot)",
      price: 35,
      description: "Authentic South Indian brass filter coffee brewed with chicory blended beans.",
      isVeg: true,
      rating: 4.9,
      ratingCount: 4100,
      category: "Beverages",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80"
    }
  ],
  "rest-6": [ // Pizza Hub
    {
      id: "food-601",
      restaurantId: "rest-6",
      name: "12\" Supreme Chicken BBQ Pizza",
      price: 450,
      description: "Smokey BBQ chicken chunks, jalapenos, sweet corn, onion, and mozzarella cheese.",
      isVeg: false,
      rating: 4.5,
      ratingCount: 780,
      category: "Recommended",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-602",
      restaurantId: "rest-6",
      name: "12\" Paneer Tikka Feast Pizza",
      price: 390,
      description: "Tandoori paneer tikka, red paprika, capsicum, onion and mozzarella with spicy makhani sauce base.",
      isVeg: true,
      rating: 4.4,
      ratingCount: 610,
      category: "Main Course",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "food-603",
      restaurantId: "rest-6",
      name: "Cheesy Garlic Breadsticks (4 Pcs)",
      price: 130,
      description: "Freshly baked dough brushed with garlic butter and topped with melted cheese.",
      isVeg: true,
      rating: 4.6,
      ratingCount: 920,
      category: "Starters",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=500&auto=format&fit=crop&q=80"
    }
  ]
};

// Fallback generator for other restaurants so every restaurant has items
export const getRestaurantFoods = (restaurantId) => {
  if (foodsByRestaurant[restaurantId]) {
    return foodsByRestaurant[restaurantId];
  }
  // Generic list for rest-7 to rest-12
  return [
    {
      id: `${restaurantId}-f1`,
      restaurantId,
      name: "Chef Special Combo Meal",
      price: 260,
      description: "Complete nutritious balanced meal with main dish, sides, bread and dessert.",
      isVeg: false,
      rating: 4.5,
      ratingCount: 320,
      category: "Recommended",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: `${restaurantId}-f2`,
      restaurantId,
      name: "Butter Chicken & Butter Naan (2 Pcs)",
      price: 290,
      description: "Rich creamy tomato cashew gravy with succulent chicken tikka pieces served with soft naans.",
      isVeg: false,
      rating: 4.7,
      ratingCount: 450,
      category: "Main Course",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: `${restaurantId}-f3`,
      restaurantId,
      name: "Paneer Butter Masala (Veg)",
      price: 220,
      description: "Fresh cottage cheese cubes simmered in mildly spiced creamy tomato gravy.",
      isVeg: true,
      rating: 4.6,
      ratingCount: 290,
      category: "Main Course",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: `${restaurantId}-f4`,
      restaurantId,
      name: "Chilli Chicken Dry",
      price: 210,
      description: "Indo-Chinese boneless chicken tossed with green chilies, capsicum & soya sauce.",
      isVeg: false,
      rating: 4.4,
      ratingCount: 180,
      category: "Starters",
      isRecommended: false,
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: `${restaurantId}-f5`,
      restaurantId,
      name: "Chocolate Lava Cake",
      price: 99,
      description: "Warm chocolate cake with molten chocolate gooey center.",
      isVeg: true,
      rating: 4.8,
      ratingCount: 510,
      category: "Desserts",
      isRecommended: true,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80"
    }
  ];
};
