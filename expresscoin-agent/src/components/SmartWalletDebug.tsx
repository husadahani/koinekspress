'use client';

import { useAuth } from '../hooks/useAuth';
import { privateKeyFromUid } from '../lib/privateKeyFromUid';
import { FiEye, FiEyeOff, FiCopy } from 'react-icons/fi';
import { useState } from 'react';

export const SmartWalletDebug = () => {
  const { user } = useAuth();
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  if (!user) {
    return null;
  }

  const privateKey = privateKeyFromUid(user.uid);
  const shortPrivateKey = privateKey.slice(0, 10) + '...' + privateKey.slice(-8);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="card bg-yellow-50 border-yellow-200 shadow-lg mb-4">
      <div className="card-body">
        <h3 className="card-title text-yellow-800">
          🔧 Smart Wallet Debug Info
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Firebase UID:</strong> {user.uid}
          </div>
          <div>
            <strong>Generated Private Key:</strong>
            <div className="flex items-center gap-2 mt-1">
              <code className="bg-yellow-100 px-2 py-1 rounded">
                {showPrivateKey ? privateKey : shortPrivateKey}
              </code>
              <button
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="btn btn-xs btn-ghost"
              >
                {showPrivateKey ? <FiEyeOff /> : <FiEye />}
              </button>
              <button
                onClick={() => copyToClipboard(privateKey)}
                className="btn btn-xs btn-ghost"
              >
                <FiCopy />
              </button>
            </div>
          </div>
          <div className="text-yellow-700 text-xs mt-2">
            ⚠️ This is for development only. In production, use HMAC with server-side secret.
          </div>
        </div>
      </div>
    </div>
  );
};