'use client';

import { FaDollarSign, FaCertificate, FaUsers, FaBox } from 'react-icons/fa';
import { Stats } from '@/types';
import { motion } from 'framer-motion';

interface StatsCardsProps {
  stats: Stats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cardData = [
    {
      title: 'Saldo USDT',
      value: `$${stats.usdtBalance.toLocaleString()}`,
      icon: FaDollarSign,
      gradient: 'from-green-500 to-green-600',
      textColor: 'text-green-100'
    },
    {
      title: 'Lisensi Aktif',
      value: stats.activeLicenses.toString(),
      icon: FaCertificate,
      gradient: 'from-fedex-purple to-fedex-light',
      textColor: 'text-purple-100'
    },
    {
      title: 'Total Referral',
      value: stats.totalReferrals.toString(),
      icon: FaUsers,
      gradient: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100'
    },
    {
      title: 'Paket Dikirim',
      value: stats.packagesSent.toString(),
      icon: FaBox,
      gradient: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cardData.map((card, index) => {
        const IconComponent = card.icon;
        
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`stat bg-gradient-to-r ${card.gradient} text-white rounded-lg shadow-lg`}
          >
            <div className="stat-figure text-white">
              <IconComponent className="text-2xl" />
            </div>
            <div className={`stat-title ${card.textColor}`}>{card.title}</div>
            <div className="stat-value">{card.value}</div>
          </motion.div>
        );
      })}
    </div>
  );
}