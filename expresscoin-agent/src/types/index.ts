export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
}

export interface Package {
  id: string;
  origin: string;
  destination: string;
  weight: number;
  commission: number;
  deadline: string;
  status: 'ready' | 'priority' | 'express' | 'in-transit' | 'delivered';
}

export interface License {
  id: string;
  name: string;
  price: number;
  packagesPerDay: number | 'unlimited';
  commission: number;
  referralLevels: number;
  features: string[];
  color: string;
  icon: string;
  popular?: boolean;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  asset: string;
  amount: number;
  from?: string;
  to?: string;
  date: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface Referral {
  id: string;
  username: string;
  avatar: string;
  level: number;
  joinDate: string;
  totalCommission: number;
  status: 'active' | 'pending' | 'inactive';
}

export interface WalletBalance {
  asset: string;
  balance: number;
  usdValue?: number;
  icon: string;
  color: string;
}

export interface Stats {
  usdtBalance: number;
  activeLicenses: number;
  totalReferrals: number;
  packagesSent: number;
  pendingPackages: number;
  deliveredPackages: number;
  totalCommission: number;
  pendingCommission: number;
}

export type PageType = 'dashboard' | 'license' | 'packages' | 'history' | 'referral' | 'wallet';