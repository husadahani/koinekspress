'use client';

import { FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { mockReferrals } from '@/data/mockData';

export default function ReferralPage() {
  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://expresscoin.app/ref/AGENT123');
    // In a real app, you'd show a toast notification here
  };

  const getBadgeClass = (level: number) => {
    switch (level) {
      case 1: return 'badge-info';
      case 2: return 'badge-secondary';
      case 3: return 'badge-accent';
      default: return 'badge-neutral';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'inactive': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'pending': return 'Pending';
      case 'inactive': return 'Tidak Aktif';
      default: return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-fedex-purple">Program Referral</h1>
        <p className="text-gray-600">Kelola jaringan referral Anda</p>
      </div>

      {/* Referral Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card bg-base-100 shadow-lg mb-6"
      >
        <div className="card-body">
          <h3 className="card-title text-fedex-purple">Link Referral Anda</h3>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <input 
              type="text" 
              className="input input-bordered flex-1 text-base" 
              value="https://expresscoin.app/ref/AGENT123" 
              readOnly 
            />
            <button 
              onClick={copyReferralLink}
              className="btn btn-primary bg-fedex-purple hover:bg-fedex-dark border-none"
            >
              <FaCopy className="mr-2" />
              Copy Link
            </button>
          </div>
        </div>
      </motion.div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { level: 1, count: 15, commission: 5, color: 'from-blue-500 to-blue-600', textColor: 'text-blue-100' },
          { level: 2, count: 22, commission: 3, color: 'from-purple-500 to-purple-600', textColor: 'text-purple-100' },
          { level: 3, count: 10, commission: 1, color: 'from-green-500 to-green-600', textColor: 'text-green-100' }
        ].map((stat, index) => (
          <motion.div
            key={stat.level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`card bg-gradient-to-r ${stat.color} text-white shadow-lg`}
          >
            <div className="card-body text-center">
              <div className="text-3xl font-bold">{stat.count}</div>
              <div className={stat.textColor}>Level {stat.level}</div>
              <div className={`text-sm ${stat.textColor}`}>Komisi: {stat.commission}%</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Referral List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card bg-base-100 shadow-lg"
      >
        <div className="card-body">
          <h3 className="card-title text-fedex-purple">Daftar Referral</h3>
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Level</th>
                  <th>Tanggal Join</th>
                  <th>Total Komisi</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockReferrals.map((referral, index) => (
                  <motion.tr
                    key={referral.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full">
                            <img src={referral.avatar} alt={referral.username} />
                          </div>
                        </div>
                        <span>{referral.username}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getBadgeClass(referral.level)}`}>
                        Level {referral.level}
                      </span>
                    </td>
                    <td>{referral.joinDate}</td>
                    <td className="text-green-600 font-bold">
                      ${referral.totalCommission.toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(referral.status)}`}>
                        {getStatusText(referral.status)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}