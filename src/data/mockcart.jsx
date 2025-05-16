// Mock data file for cart items and suggested products
export const initialCartItems = [
    { 
      id: 1, 
      name: "EMUNZ Oral Suspension 5ml", 
      manufacturer: "Mfr: Hbc Lifesciences Pvt Ltd",
      price: 242.55, 
      originalPrice: 269.50,
      discount: 26.95,
      quantity: 5,
      image: "/api/placeholder/80/80",
      delivery: "Delivery between MAY 15-MAY 16"
    },
    { 
      id: 2, 
      name: "Stayfree Secure Dry Cover with Wings Sanitary Pads (XL) 6's", 
      manufacturer: "Mfr: Johnson & Johnson Pvt Ltd",
      price: 42.30, 
      originalPrice: 45.00,
      discount: 2.70,
      quantity: 1,
      image: "/api/placeholder/80/80",
      delivery: "Delivery between MAY 16-MAY 17"
    }
  ];
  
  // Promo codes for the application
  export const validPromoCodes = [
    { code: "NMSNEW", discount: 0.25, description: "Flat 25% OFF on First Order" },
    { code: "HEALTH10", discount: 0.10, description: "10% OFF on all products" },
    { code: "AyushiMine", discount: 0.15, description: "15% OFF up to ₹100" }
  ];
  
  // Banner content for slideshow
  export const banners = [
    {
      title: "NMSNEW - FLAT 25% OFF on Your First Meds* Order",
      color: "#8E44AD",
      code: "NMSNEW",
      description: "Place your first order and get Flat 25% off + Up to 10% cash-in-wallet & free shipping"
    },
    {
      title: "Become Dawasansaar First Member",
      color: "#E74C3C",
      description: "Join membership to save much more! Exclusive offers designed for you"
    },
    {
      title: "Free Delivery on Orders Above ₹99",
      color: "#2E86C1",
      description: "No minimum order value for medicines. Order now!"
    }
  ];
  
  // Suggested medicines data
  export const suggestedMedicines = [
    {
      id: 101,
      name: "Dolo 650 Tablet 15's",
      category: "Pain Relief",
      price: 65.50,
      originalPrice: 75.00,
      discount: 12.67,
      discountedPrice: 65.50,
      image: "/api/placeholder/140/140",
      rating: 4.5,
      ratingCount: 234,
      isNew: false
    },
    {
      id: 102,
      name: "Shelcal 500 Tablet 15's",
      category: "Vitamins & Supplements",
      price: 110.00,
      originalPrice: 125.00,
      discount: 12,
      discountedPrice: 110.00,
      image: "/api/placeholder/140/140",
      rating: 4.7,
      ratingCount: 189,
      isNew: false
    },
    {
      id: 103,
      name: "Zincovit Tablet 15's",
      category: "Vitamins & Supplements",
      price: 105.00,
      originalPrice: 115.00,
      discount: 8.7,
      discountedPrice: 105.00,
      image: "/api/placeholder/140/140",
      rating: 4.6,
      ratingCount: 312,
      isNew: true
    },
    {
      id: 104,
      name: "Combiflam Tablet 20's",
      category: "Pain Relief",
      price: 40.00,
      originalPrice: 45.00,
      discount: 11.11,
      discountedPrice: 40.00,
      image: "/api/placeholder/140/140",
      rating: 4.8,
      ratingCount: 567,
      isNew: false
    },
    {
      id: 105,
      name: "Volini Spray 100g",
      category: "Pain Relief",
      price: 235.00,
      originalPrice: 250.00,
      discount: 6,
      discountedPrice: 235.00,
      image: "/api/placeholder/140/140",
      rating: 4.4,
      ratingCount: 423,
      isNew: false
    },
    {
      id: 106,
      name: "Supradyn Daily Tablet 15's",
      category: "Vitamins & Supplements",
      price: 175.00,
      originalPrice: 195.00,
      discount: 10.26,
      discountedPrice: 175.00,
      image: "/api/placeholder/140/140",
      rating: 4.5,
      ratingCount: 289,
      isNew: false
    },
    {
      id: 107,
      name: "Crocin 650 Tablet 15's",
      category: "Pain Relief",
      price: 85.00,
      originalPrice: 95.00,
      discount: 10.53,
      discountedPrice: 85.00,
      image: "/api/placeholder/140/140",
      rating: 4.6,
      ratingCount: 445,
      isNew: false
    },
    {
      id: 108,
      name: "Himalaya Liv.52 DS Tablet 60's",
      category: "Ayurvedic",
      price: 220.00,
      originalPrice: 240.00,
      discount: 8.33,
      discountedPrice: 220.00,
      image: "/api/placeholder/140/140",
      rating: 4.7,
      ratingCount: 667,
      isNew: true
    }
  ];
  
  // Popular products data for different categories
  export const popularProducts = {
    vitamins: [
      {
        id: 201,
        name: "Centrum Multivitamin",
        category: "Vitamins & Supplements",
        price: 350.00,
        originalPrice: 399.00,
        discount: 12.28,
        discountedPrice: 350.00,
        image: "/api/placeholder/140/140",
        rating: 4.5,
        ratingCount: 234,
        isNew: false
      },
      // Add more vitamin products...
    ],
    painRelief: [
      {
        id: 301,
        name: "Disprin Tablet 10's",
        category: "Pain Relief",
        price: 15.00,
        originalPrice: 18.00,
        discount: 16.67,
        discountedPrice: 15.00,
        image: "/api/placeholder/140/140",
        rating: 4.3,
        ratingCount: 189,
        isNew: false
      },
      // Add more pain relief products...
    ],
    diabetesCare: [
      {
        id: 401,
        name: "OneTouch Select Plus",
        category: "Diabetes Care",
        price: 850.00,
        originalPrice: 950.00,
        discount: 10.53,
        discountedPrice: 850.00,
        image: "/api/placeholder/140/140",
        rating: 4.6,
        ratingCount: 567,
        isNew: true
      },
      // Add more diabetes care products...
    ]
  };
  
  // Trending products
  export const trendingProducts = [
    {
      id: 501,
      name: "N95 Mask Pack of 5",
      category: "Healthcare Devices",
      price: 299.00,
      originalPrice: 350.00,
      discount: 14.57,
      discountedPrice: 299.00,
      image: "/api/placeholder/140/140",
      rating: 4.8,
      ratingCount: 1234,
      isNew: false
    },
    {
      id: 502,
      name: "Immunity Booster Kit",
      category: "Vitamins & Supplements",
      price: 450.00,
      originalPrice: 499.00,
      discount: 9.82,
      discountedPrice: 450.00,
      image: "/api/placeholder/140/140",
      rating: 4.6,
      ratingCount: 789,
      isNew: true
    },
    // Add more trending products...
  ];
  
  // Default export for all mock data
  const mockData = {
    initialCartItems,
    validPromoCodes,
    banners,
    suggestedMedicines,
    popularProducts,
    trendingProducts
  };
  
  export default mockData;