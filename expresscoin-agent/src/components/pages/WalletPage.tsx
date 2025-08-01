'use client';

import { useState } from 'react';
import { FaBitcoin, FaDollarSign, FaPaperPlane, FaDownload, FaCopy, FaQrcode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { mockWalletBalances, mockTransactions } from '@/data/mockData';
import { SmartWalletCard } from '@/components/SmartWalletCard';
import { useAuth } from '@/hooks/useAuth';

export default function WalletPage() {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText('0x742d35Cc6634C0532925a3b8D0A91A1D4bF5b53c');
    // In a real app, you'd show a toast notification here
  };

  const getBadgeClass = (type: string) => {
    return type === 'receive' ? 'badge-success' : 'badge-error';
  };

  const getBadgeText = (type: string) => {
    return type === 'receive' ? 'Receive' : 'Send';
  };

  const getAmountColor = (type: string) => {
    return type === 'receive' ? 'text-green-600' : 'text-red-600';
  };

  const getAmountPrefix = (type: string) => {
    return type === 'receive' ? '+' : '-';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-fedex-purple">Wallet</h1>
        <p className="text-gray-600">Kelola aset crypto Anda</p>
      </div>

      {/* Wallet Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card bg-base-100 shadow-lg mb-6"
      >
        <div className="card-body">
          <h3 className="card-title text-fedex-purple">Alamat Wallet</h3>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <input 
              type="text" 
              className="input input-bordered flex-1 text-base" 
              value="0x742d35Cc6634C0532925a3b8D0A91A1D4bF5b53c" 
              readOnly 
            />
            <button 
              onClick={copyWalletAddress}
              className="btn btn-primary bg-fedex-purple hover:bg-fedex-dark border-none"
            >
              <FaCopy className="mr-2" />
              Copy
            </button>
          </div>
        </div>
      </motion.div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {mockWalletBalances.map((balance, index) => {
          const IconComponent = balance.icon === 'bitcoin' ? FaBitcoin : FaDollarSign;
          const gradientClass = balance.color === 'yellow' 
            ? 'from-yellow-400 to-yellow-500' 
            : 'from-green-500 to-green-600';
          const textColor = balance.color === 'yellow' ? 'text-yellow-200' : 'text-green-200';
          
          return (
            <motion.div
              key={balance.asset}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`card bg-gradient-to-r ${gradientClass} text-white shadow-lg`}
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-bold ${textColor}`}>
                      {balance.asset} Balance
                    </h3>
                    <div className="text-3xl font-bold">
                      {balance.asset === 'BNB' ? `${balance.balance} BNB` : `${balance.balance.toLocaleString()} USDT`}
                    </div>
                    {balance.usdValue && (
                      <div className={textColor}>≈ ${balance.usdValue.toLocaleString()} USD</div>
                    )}
                    {balance.asset === 'USDT' && (
                      <div className={textColor}>Stablecoin</div>
                    )}
                  </div>
                  <div className={`text-4xl ${textColor}`}>
                    <IconComponent />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Send/Receive Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <button 
          onClick={() => setShowSendModal(true)}
          className="btn btn-lg bg-fedex-purple hover:bg-fedex-dark text-white border-none"
        >
          <FaPaperPlane className="mr-2" />
          Kirim
        </button>
        <button 
          onClick={() => setShowReceiveModal(true)}
          className="btn btn-lg btn-outline btn-primary"
        >
          <FaDownload className="mr-2" />
          Terima
        </button>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card bg-base-100 shadow-lg"
      >
        <div className="card-body">
          <h3 className="card-title text-fedex-purple">Histori Transaksi</h3>
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Asset</th>
                  <th>Amount</th>
                  <th>From/To</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <td>
                      <span className={`badge ${getBadgeClass(transaction.type)}`}>
                        {getBadgeText(transaction.type)}
                      </span>
                    </td>
                    <td>{transaction.asset}</td>
                    <td className={`font-bold ${getAmountColor(transaction.type)}`}>
                      {getAmountPrefix(transaction.type)}{transaction.amount}
                    </td>
                    <td>{transaction.from || transaction.to}</td>
                    <td>{transaction.date}</td>
                    <td>
                      <span className="badge badge-success">Confirmed</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Send Modal */}
      {showSendModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-fedex-purple">Kirim Crypto</h3>
            <div className="py-4">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Pilih Asset</span>
                </label>
                <select className="select select-bordered w-full text-base">
                  <option>USDT</option>
                  <option>BNB</option>
                </select>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Alamat Tujuan</span>
                </label>
                <input type="text" className="input input-bordered w-full text-base" placeholder="0x..." />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Jumlah</span>
                </label>
                <input type="number" className="input input-bordered w-full text-base" placeholder="0.00" />
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary bg-fedex-purple hover:bg-fedex-dark border-none">
                Kirim
              </button>
              <button 
                className="btn"
                onClick={() => setShowSendModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {showReceiveModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-fedex-purple">Terima Crypto</h3>
            <div className="py-4 text-center">
              <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 flex items-center justify-center rounded-lg">
                <FaQrcode className="text-6xl text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Scan QR Code atau gunakan alamat wallet di bawah
              </p>
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="text-xs break-all">
                  0x742d35Cc6634C0532925a3b8D0A91A1D4bF5b53c
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button 
                onClick={copyWalletAddress}
                className="btn btn-primary bg-fedex-purple hover:bg-fedex-dark border-none"
              >
                Copy Address
              </button>
              <button 
                className="btn"
                onClick={() => setShowReceiveModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}