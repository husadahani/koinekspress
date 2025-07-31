'use client';

import { Stats } from '@/types';
import { motion } from 'framer-motion';
import StatsCards from '@/components/dashboard/StatsCards';

interface DashboardProps {
  stats: Stats;
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-fedex-purple">Dashboard</h1>
        <p className="text-gray-600">Ringkasan aktivitas agent Anda</p>
      </div>

      <StatsCards stats={stats} />

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Package Status */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card bg-base-100 shadow-lg"
        >
          <div className="card-body">
            <h3 className="card-title text-fedex-purple">Status Paket</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingPackages}</div>
                <div className="text-sm text-gray-600">Belum Dikirim</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.deliveredPackages}</div>
                <div className="text-sm text-gray-600">Sudah Dikirim</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Commission Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="card bg-base-100 shadow-lg"
        >
          <div className="card-body">
            <h3 className="card-title text-fedex-purple">Komisi</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${stats.totalCommission}</div>
                <div className="text-sm text-gray-600">Terkumpul</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">${stats.pendingCommission}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Referral Rewards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card bg-base-100 shadow-lg mt-6"
      >
        <div className="card-body">
          <h3 className="card-title text-fedex-purple">Reward Referral</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="text-lg font-bold text-blue-600">Level 1</div>
              <div className="text-2xl font-bold text-blue-800">$342.50</div>
              <div className="text-sm text-blue-600">15 Referrals</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="text-lg font-bold text-purple-600">Level 2</div>
              <div className="text-2xl font-bold text-purple-800">$198.25</div>
              <div className="text-sm text-purple-600">22 Referrals</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="text-lg font-bold text-green-600">Level 3</div>
              <div className="text-2xl font-bold text-green-800">$89.75</div>
              <div className="text-sm text-green-600">10 Referrals</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}