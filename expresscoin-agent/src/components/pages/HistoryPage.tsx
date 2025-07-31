'use client';

import { useState } from 'react';
import { FaEye, FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { mockHistoryData } from '@/data/mockData';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('all');

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'delivered': return 'badge-success';
      case 'in-transit': return 'badge-warning';
      case 'ready': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  const getBadgeText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Terkirim';
      case 'in-transit': return 'Transit';
      case 'ready': return 'Pickup';
      default: return status;
    }
  };

  const getActionIcon = (status: string) => {
    switch (status) {
      case 'delivered': return FaEye;
      case 'in-transit': return FaMapMarkerAlt;
      case 'ready': return FaRoute;
      default: return FaEye;
    }
  };

  const getCommissionColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'in-transit': return 'text-yellow-600';
      case 'ready': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-fedex-purple">Histori Pengiriman</h1>
        <p className="text-gray-600">Riwayat paket yang telah Anda tangani</p>
      </div>

      <div className="tabs tabs-boxed bg-base-200 mb-6">
        <a 
          className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Semua
        </a>
        <a 
          className={`tab ${activeTab === 'delivered' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('delivered')}
        >
          Terkirim
        </a>
        <a 
          className={`tab ${activeTab === 'in-transit' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('in-transit')}
        >
          Dalam Perjalanan
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="overflow-x-auto"
      >
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID Paket</th>
              <th>Rute</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Komisi</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockHistoryData.map((item, index) => {
              const IconComponent = getActionIcon(item.status);
              
              return (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td>{item.id}</td>
                  <td>{item.route}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(item.status)}`}>
                      {getBadgeText(item.status)}
                    </span>
                  </td>
                  <td>{item.date}</td>
                  <td className={`font-bold ${getCommissionColor(item.status)}`}>
                    ${item.commission.toFixed(2)}
                  </td>
                  <td>
                    <button className="btn btn-xs btn-ghost">
                      <IconComponent />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}