import { 
  User, 
  CreditCard, 
  Heart, 
  Gift, 
  MapPin, 
  Award,
  FileText
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
    id: 'wishlist',
    title: 'My Wishlist', 
    icon: <Heart size={20} />, 
    link: '/profile/wishlist' 
  },
  { 
    id: 'prescription',
    title: 'My Prescriptions', 
    icon: <FileText size={20} />, 
    link: '/profile/prescription' 
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
