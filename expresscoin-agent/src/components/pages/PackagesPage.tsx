'use client';

import { FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { mockPackages } from '@/data/mockData';

export default function PackagesPage() {
  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'ready': return 'badge-success';
      case 'priority': return 'badge-warning';
      case 'express': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  const getBadgeText = (status: string) => {
    switch (status) {
      case 'ready': return 'Siap Kirim';
      case 'priority': return 'Priority';
      case 'express': return 'Express';
      default: return status;
    }
  };

  const getDeadlineColor = (deadline: string) => {
    if (deadline.includes('1 hari')) return 'text-red-600';
    if (deadline.includes('2 hari')) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-fedex-purple">Paket Tersedia</h1>
        <p className="text-gray-600">Pilih paket yang siap untuk dikirim</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="card bg-base-100 shadow-lg"
          >
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div className={`badge ${getBadgeClass(pkg.status)}`}>
                  {getBadgeText(pkg.status)}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ${pkg.commission.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Komisi</div>
                </div>
              </div>
              
              <h3 className="font-bold text-lg">{pkg.id}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Asal:</span>
                  <span>{pkg.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tujuan:</span>
                  <span>{pkg.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Berat:</span>
                  <span>{pkg.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className={getDeadlineColor(pkg.deadline)}>
                    {pkg.deadline}
                  </span>
                </div>
              </div>
              
              <button className="btn btn-primary bg-fedex-purple hover:bg-fedex-dark border-none w-full mt-4">
                <FaTruck className="mr-2" />
                Ambil Paket
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}