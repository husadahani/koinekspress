'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { createSmartAccount } from '../lib/alchemy';
import { LocalAccountSigner } from '@alchemy/aa-core';

interface SmartAccount {
  getAddress: () => Promise<string>;
  sendUserOperation: (params: {
    target: string;
    value: bigint;
    data?: string;
  }) => Promise<unknown>;
  getBalance: () => Promise<bigint>;
}

export interface SmartWalletState {
  account: SmartAccount | null;
  loading: boolean;
  error: string | null;
  address: string | null;
}

export const useSmartWallet = () => {
  const { user, getIdToken } = useAuth();
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
      
      // Get Firebase ID token
      const idToken = await getIdToken();
      if (!idToken) {
        throw new Error('Failed to get authentication token');
      }

      // Create a simple signer for demo purposes
      // In production, you would use a proper JWT-based signer
      const signer = LocalAccountSigner.privateKeyToAccountSigner(
        ("0x" + "1".repeat(64)) as `0x${string}` // Demo private key - replace with proper JWT signer
      );
      
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
      const balance = await walletState.account.getBalance();
      return balance;
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