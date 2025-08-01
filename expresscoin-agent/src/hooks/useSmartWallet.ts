'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { createSmartAccount } from '../lib/alchemy';

// Use any type to avoid Alchemy SDK type conflicts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SmartAccount = any;

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
      
      // Create smart account provider using Account Kit
      const account = await createSmartAccount(user.uid);
      console.log('Created smart wallet for UID:', user.uid);
      
      // Get account address
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const address = await (account as any).getAddress();
      
      setWalletState({
        account,
        loading: false,
        error: null,
        address,
        backgroundInitializing: false,
      });

      return account;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create smart wallet';
      setWalletState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        backgroundInitializing: false,
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (walletState.account as any).sendUserOperation({
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
        backgroundInitializing: false,
      }));
      throw error;
    }
  };

  const getBalance = async () => {
    if (!walletState.account) {
      throw new Error('Smart wallet not initialized');
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((walletState.account as any).getBalance) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const balance = await (walletState.account as any).getBalance();
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const walletAddress = await (account as any).getAddress();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (account as any).sendUserOperation({
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