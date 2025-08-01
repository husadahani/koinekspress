import { 
  createLightAccountAlchemyProvider
} from '@alchemy/aa-alchemy';
import { 
  createWalletClient, 
  http, 
  createPublicClient 
} from 'viem';
import { bsc } from 'viem/chains';



// BNB MAINNET chain configuration
export const bnbChain = {
  ...bsc,
  rpcUrls: {
    ...bsc.rpcUrls,
    default: {
      http: [`https://bsc-dataseed.binance.org/`],
    },
    public: {
      http: [`https://bsc-dataseed.binance.org/`],
    },
  },
};

// Public client for BNB MAINNET
export const publicClient = createPublicClient({
  chain: bnbChain,
  transport: http(),
});

// Wallet client configuration
export const createWalletClientConfig = (account: unknown) => {
  return createWalletClient({
    account,
    chain: bnbChain,
    transport: http(),
  });
};

// Gas Manager Policy ID (replace with your actual policy ID)
export const GAS_MANAGER_POLICY_ID = process.env.NEXT_PUBLIC_GAS_MANAGER_POLICY_ID || "your-gas-manager-policy-id";

// Smart Account creation helper for BNB Mainnet
export const createSmartAccount = async (uid: string) => {
  try {
    const { privateKeyFromUid } = await import('./privateKeyFromUid');
    const { LocalAccountSigner } = await import('@alchemy/aa-core');
    
    // Create signer from UID
    const privateKey = privateKeyFromUid(uid);
    const signer = LocalAccountSigner.privateKeyToAccountSigner(privateKey);
    
    // Create smart account provider
    const provider = createLightAccountAlchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '',
      chain: bnbChain,
      signer,
      gasManagerConfig: {
        policyId: GAS_MANAGER_POLICY_ID,
      },
    });
    
    return provider;
  } catch (error) {
    console.error('Error creating smart account:', error);
    throw error;
  }
};