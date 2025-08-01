'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSmartWallet } from '../../hooks/useSmartWallet';
import { FiSend, FiDownload, FiCopy, FiCheck } from 'react-icons/fi';

const WalletPage = () => {
  const { user } = useAuth();
  const { account, address, loading: walletLoading, error: walletError, sendToken } = useSmartWallet();
  
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [selectedToken, setSelectedToken] = useState('BNB');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const tokens = [
    { symbol: 'BNB', name: 'BNB', address: '0x0000000000000000000000000000000000000000' },
    { symbol: 'USDT', name: 'Tether USD', address: '0x55d398326f99059fF775485246999027B3197955' },
    { symbol: 'BUSD', name: 'Binance USD', address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' },
    { symbol: 'USDC', name: 'USD Coin', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' },
  ];

  const handleSend = async () => {
    if (!sendTo || !sendAmount) return;
    
    try {
      setSending(true);
      await sendToken(sendTo, sendAmount, selectedToken);
      setShowSendModal(false);
      setSendAmount('');
      setSendTo('');
    } catch (error) {
      console.error('Send error:', error);
    } finally {
      setSending(false);
    }
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login First</h2>
          <p className="text-gray-600">You need to be logged in to access your wallet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Smart Wallet</h1>
          <p className="text-gray-600">Manage your BNB Mainnet smart wallet</p>
        </div>

        {/* Wallet Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Wallet Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Wallet Status</h2>
            
            {walletLoading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Creating smart wallet...</span>
              </div>
            ) : walletError ? (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                Error: {walletError}
              </div>
            ) : account ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-semibold">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Address:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{formatAddress(address || '')}</span>
                    <button
                      onClick={copyAddress}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-600">Wallet not initialized</div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowSendModal(true)}
                disabled={!account || walletLoading}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiSend />
                <span>Send</span>
              </button>
              <button
                onClick={() => setShowReceiveModal(true)}
                disabled={!account || walletLoading}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiDownload />
                <span>Receive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Token Balances */}
        {account && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Token Balances</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tokens.map((token) => (
                <div key={token.symbol} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{token.symbol}</span>
                    <span className="text-sm text-gray-500">{token.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">0.00</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Send Token</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token</label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol} - {token.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Address</label>
                <input
                  type="text"
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSendModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending || !sendTo || !sendAmount}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {showReceiveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Receive</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Address</label>
                <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
                  <span className="font-mono text-sm flex-1">{address}</span>
                  <button
                    onClick={copyAddress}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
                  </button>
                </div>
              </div>
              
                              <p className="text-sm text-gray-600">
                  Share this address to receive tokens. Make sure you&apos;re on BNB Mainnet.
                </p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => setShowReceiveModal(false)}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;