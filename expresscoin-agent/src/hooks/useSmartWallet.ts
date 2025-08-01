'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { createSmartAccount } from '../lib/alchemy';
import { LocalAccountSigner } from '@alchemy/aa-core';
import { privateKeyFromUid } from '../lib/privateKeyFromUid';

// Use more flexible type to avoid Alchemy SDK type conflicts
type SmartAccount = {
  getAddress: () => Promise<string>;
  sendUserOperation: (...args: unknown[]) => Promise<unknown>;
  getBalance?: () => Promise<bigint>;
};

export interface SmartWalletState {
  account: SmartAccount | null;
  loading: boolean;
  error: string | null;
  address: string | null;
  backgroundInitializing: boolean;
}

export const useSmartWallet = () => {
  const { user } = useAuth();
  const [walletState, setWalletState] = useState<SmartWalletState>({
    account: null,
    loading: false,
    error: null,
    address: null,
    backgroundInitializing: false,
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
        target: to as `0x${string}`,
        data: (data || '0x') as `0x${string}`,
        value: BigInt(value),
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

  // Auto-create wallet and run background transaction when user is authenticated
  useEffect(() => {
    if (user && !walletState.account && !walletState.loading) {
      createWalletAndInitialize().catch(console.error);
    }
  }, [user]);

  const createWalletAndInitialize = async () => {
    try {
      // Create wallet first
      const account = await createWallet();
      
      // Run background transaction to initialize smart wallet
      await runBackgroundTransaction(account);
      
    } catch (error) {
      console.error('Error creating wallet and initializing:', error);
    }
  };

  const runBackgroundTransaction = async (account: SmartAccount) => {
    try {
      setWalletState(prev => ({ ...prev, backgroundInitializing: true }));
      console.log('🔄 Running background transaction to initialize smart wallet...');
      
      // Send a zero-value transaction to initialize the smart wallet
      // This helps with gas estimation and wallet activation
      const walletAddress = await account.getAddress();
      const result = await account.sendUserOperation({
        target: walletAddress as `0x${string}`, // Send to self (zero-value transaction)
        data: '0x' as `0x${string}`, // Empty data
        value: BigInt(0),
      });
      
      console.log('✅ Background transaction completed:', result);
      
    } catch (error) {
      console.error('⚠️ Background transaction failed (this is normal for new wallets):', error);
      // Don't throw error - this is expected for new wallets
    } finally {
      setWalletState(prev => ({ ...prev, backgroundInitializing: false }));
    }
  };

  return {
    ...walletState,
    createWallet,
    sendTransaction,
    getBalance,
  };
};