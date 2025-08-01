'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { createSmartAccount } from '../lib/alchemy';
import { LocalAccountSigner } from '@alchemy/aa-core';
import { privateKeyFromUid } from '../lib/privateKeyFromUid';

interface SmartAccount {
  getAddress: () => Promise<string>;
  sendUserOperation: (params: {
    target: string;
    value: bigint;
    data?: string;
  }) => Promise<unknown>;
  getBalance?: () => Promise<bigint>;
}

export interface SmartWalletState {
  account: SmartAccount | null;
  loading: boolean;
  error: string | null;
  address: string | null;
}

export const useSmartWallet = () => {
  const { user } = useAuth();
  const [walletState, setWalletState] = useState<SmartWalletState>({
    account: null,
    loading: false,
    error: null,
    address: null,
  });

  const createWallet = async () => {
    if (!user) {
      throw new Error('User must be authenticated to create smart wallet');
    }

    try {
      setWalletState(prev => ({ ...prev, loading: true, error: null }));
      
      // Generate private key from Firebase UID
      const privateKey = privateKeyFromUid(user.uid);
      console.log('Generated private key from UID:', user.uid);
      
      // Create signer from private key
      const signer = LocalAccountSigner.privateKeyToAccountSigner(privateKey);
      
      // Create smart account
      const account = await createSmartAccount(signer);
      
      // Get account address
      const address = await account.getAddress();
      
      setWalletState({
        account,
        loading: false,
        error: null,
        address,
      });

      return account;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create smart wallet';
      setWalletState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const sendTransaction = async (to: string, value: string, data?: string) => {
    if (!walletState.account) {
      throw new Error('Smart wallet not initialized');
    }

    try {
      setWalletState(prev => ({ ...prev, loading: true, error: null }));

      const result = await walletState.account.sendUserOperation({
        target: to,
        value: BigInt(value),
        data: data || '0x',
      });

      setWalletState(prev => ({ ...prev, loading: false }));
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send transaction';
      setWalletState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const getBalance = async () => {
    if (!walletState.account) {
      throw new Error('Smart wallet not initialized');
    }

    try {
      if (walletState.account.getBalance) {
        const balance = await walletState.account.getBalance();
        return balance;
      } else {
        // Fallback if getBalance is not available
        return BigInt(0);
      }
    } catch (error: unknown) {
      console.error('Error getting balance:', error);
      throw error;
    }
  };

  // Auto-create wallet when user is authenticated
  useEffect(() => {
    if (user && !walletState.account && !walletState.loading) {
      createWallet().catch(console.error);
    }
  }, [user]);

  return {
    ...walletState,
    createWallet,
    sendTransaction,
    getBalance,
  };
};