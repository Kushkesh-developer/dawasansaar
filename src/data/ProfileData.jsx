// ProfileData.js - Separate file for mock data
import { 
    User, 
    CreditCard, 
    Heart, 
    Gift, 
    MapPin, 
    Award 
  } from 'lucide-react';
  
  // Menu Items
  export const menuItems = [
    { 
      id: 'account',
      title: 'Account Information', 
      icon: <User size={20}/>, 
      link: '/profile/account' 
    },
    { 
      id: 'wallet',
      title: 'My Wallet', 
      icon: <CreditCard size={20} />, 
      link: '/profile/wallet' 
    },
    { 
      id: 'wishlist',
      title: 'My Wishlist', 
      icon: <Heart size={20} />, 
      link: '/profile/wishlist' 
    },
    { 
      id: 'offers',
      title: 'Offers', 
      icon: <Gift size={20} />, 
      link: '/profile/offers' 
    },
    { 
      id: 'addresses',
      title: 'Delivery Addresses', 
      icon: <MapPin size={20} />, 
      link: '/profile/addresses' 
    },
    { 
      id: 'prescription',
      title: 'My Prescription', 
      icon: <User size={20} />, 
      link: '/profile/prescription' 
    },
    { 
      id: 'subscriptions',
      title: 'My Subscriptions', 
      icon: <User size={20} />, 
      link: '/profile/subscriptions' 
    },
    { 
      id: 'refer',
      title: 'Refer & Earn', 
      icon: <Award size={20} />, 
      link: '/profile/refer' 
    }
  ];
  
  // Banner Cards
  export const bannerCards = [
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={24} color="#2E86C1" />
    },
    {
      id: 'orders',
      title: 'Medicine Orders',
      icon: <User size={24} color="#E74C3C" />
    },
    {
      id: 'rewards',
      title: 'My Rewards',
      icon: <Award size={24} color="#27AE60" />
    }
  ];
  
  export default {
    menuItems,
    bannerCards
  };