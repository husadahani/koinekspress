import { User, Package, License, Transaction, Referral, WalletBalance, Stats } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  level: 3
};

export const mockStats: Stats = {
  usdtBalance: 2450.75,
  activeLicenses: 3,
  totalReferrals: 47,
  packagesSent: 156,
  pendingPackages: 23,
  deliveredPackages: 156,
  totalCommission: 845.32,
  pendingCommission: 234.18
};

export const mockPackages: Package[] = [
  {
    id: 'PKG-001-2024',
    origin: 'Jakarta, Indonesia',
    destination: 'Singapore',
    weight: 2.5,
    commission: 25.50,
    deadline: '2 hari',
    status: 'ready'
  },
  {
    id: 'PKG-002-2024',
    origin: 'Surabaya, Indonesia',
    destination: 'Hong Kong',
    weight: 5.0,
    commission: 45.75,
    deadline: '1 hari',
    status: 'priority'
  },
  {
    id: 'PKG-003-2024',
    origin: 'Bandung, Indonesia',
    destination: 'Tokyo, Japan',
    weight: 1.8,
    commission: 62.30,
    deadline: '3 hari',
    status: 'express'
  }
];

export const mockLicenses: License[] = [
  {
    id: 'basic',
    name: 'Basic Agent',
    price: 50,
    packagesPerDay: 5,
    commission: 3,
    referralLevels: 1,
    features: ['5 Paket per hari', 'Komisi 3%', 'Referral Level 1', 'Support 24/7'],
    color: 'blue',
    icon: 'star',
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Agent',
    price: 150,
    packagesPerDay: 15,
    commission: 5,
    referralLevels: 2,
    features: ['15 Paket per hari', 'Komisi 5%', 'Referral Level 1-2', 'Priority Support', 'Bonus Mingguan'],
    color: 'purple',
    icon: 'crown',
    popular: true
  },
  {
    id: 'vip',
    name: 'VIP Agent',
    price: 500,
    packagesPerDay: 'unlimited',
    commission: 8,
    referralLevels: 3,
    features: ['Unlimited Paket', 'Komisi 8%', 'Referral Level 1-3', 'VIP Support', 'Bonus Bulanan', 'NFT Exclusive'],
    color: 'yellow',
    icon: 'gem',
    popular: false
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'receive',
    asset: 'USDT',
    amount: 250.00,
    from: '0x1234...5678',
    date: '2024-01-15',
    status: 'confirmed'
  },
  {
    id: '2',
    type: 'send',
    asset: 'BNB',
    amount: 0.5,
    to: '0x9876...4321',
    date: '2024-01-14',
    status: 'confirmed'
  },
  {
    id: '3',
    type: 'receive',
    asset: 'USDT',
    amount: 125.50,
    from: 'Commission',
    date: '2024-01-13',
    status: 'confirmed'
  }
];

export const mockReferrals: Referral[] = [
  {
    id: '1',
    username: 'sarah_wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    level: 1,
    joinDate: '2024-01-10',
    totalCommission: 125.30,
    status: 'active'
  },
  {
    id: '2',
    username: 'mike_chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    level: 2,
    joinDate: '2024-01-08',
    totalCommission: 89.75,
    status: 'active'
  },
  {
    id: '3',
    username: 'anna_kim',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    level: 3,
    joinDate: '2024-01-05',
    totalCommission: 34.50,
    status: 'pending'
  }
];

export const mockWalletBalances: WalletBalance[] = [
  {
    asset: 'BNB',
    balance: 2.45,
    usdValue: 890.25,
    icon: 'bitcoin',
    color: 'yellow'
  },
  {
    asset: 'USDT',
    balance: 2450.75,
    icon: 'dollar',
    color: 'green'
  }
];

export const mockHistoryData = [
  {
    id: 'PKG-156-2024',
    route: 'Jakarta → Singapore',
    status: 'delivered',
    date: '2024-01-15',
    commission: 28.50
  },
  {
    id: 'PKG-155-2024',
    route: 'Surabaya → Hong Kong',
    status: 'in-transit',
    date: '2024-01-14',
    commission: 42.00
  },
  {
    id: 'PKG-154-2024',
    route: 'Bandung → Tokyo',
    status: 'delivered',
    date: '2024-01-13',
    commission: 55.75
  },
  {
    id: 'PKG-153-2024',
    route: 'Jakarta → Malaysia',
    status: 'ready',
    date: '2024-01-12',
    commission: 19.25
  }
];