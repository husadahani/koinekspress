'use client';

import { useState } from 'react';
import { useSmartWallet } from '../hooks/useSmartWallet';
import { FiCreditCard, FiSend, FiRefreshCw, FiCopy } from 'react-icons/fi';

export const SmartWalletCard = () => {
  const { account, loading, error, address, sendTransaction, getBalance } = useSmartWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txLoading, setTxLoading] = useState(false);
  const [balance, setBalance] = useState<string>('0');

  const handleSendTransaction = async () => {
    if (!recipient || !amount) {
      alert('Please enter recipient address and amount');
      return;
    }

    try {
      setTxLoading(true);
      const result = await sendTransaction(recipient, amount);
      console.log('Transaction sent:', result);
      alert('Transaction sent successfully!');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Transaction error:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setTxLoading(false);
    }
  };

  const handleGetBalance = async () => {
    try {
      const bal = await getBalance();
      setBalance(bal.toString());
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="ml-2">Creating Smart Wallet...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-error">
            <FiCreditCard className="w-6 h-6" />
            Smart Wallet Error
          </h2>
          <p className="text-error">{error}</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <FiCreditCard className="w-6 h-6" />
            Smart Wallet
          </h2>
          <p>Please sign in to create your smart wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <FiCreditCard className="w-6 h-6" />
          Smart Wallet
        </h2>
        
        <div className="space-y-4">
          {/* Wallet Address */}
          <div>
            <label className="label">
              <span className="label-text">Wallet Address</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={address || ''}
                readOnly
                className="input input-bordered flex-1"
              />
              <button 
                onClick={copyAddress}
                className="btn btn-square btn-sm"
              >
                <FiCopy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Balance */}
          <div>
            <label className="label">
              <span className="label-text">Balance (BNB)</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={balance}
                readOnly
                className="input input-bordered flex-1"
              />
              <button 
                onClick={handleGetBalance}
                className="btn btn-square btn-sm"
                disabled={txLoading}
              >
                <FiRefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Send Transaction */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text">Send Transaction</span>
            </label>
            
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="input input-bordered w-full"
            />
            
            <input
              type="number"
              placeholder="Amount (BNB)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full"
            />
            
            <button
              onClick={handleSendTransaction}
              disabled={txLoading || !recipient || !amount}
              className="btn btn-primary w-full"
            >
              {txLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Send Transaction
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};