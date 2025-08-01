import { Alchemy, Network } from 'alchemy-sdk';
import { 
  createLightAccount, 
  createModularAccount,
  getDefaultLightAccountFactoryAddress 
} from '@alchemy/aa-alchemy';
import { 
  createWalletClient, 
  http, 
  createPublicClient 
} from 'viem';
import { bsc } from 'viem/chains';

// Alchemy configuration for BNB MAINNET
export const alchemyConfig = {
  apiKey: "your-alchemy-api-key", // Replace with your Alchemy API key
  network: Network.BSC_MAINNET, // BNB MAINNET
};

// Initialize Alchemy SDK
export const alchemy = new Alchemy(alchemyConfig);

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
export const createWalletClientConfig = (account: any) => {
  return createWalletClient({
    account,
    chain: bnbChain,
    transport: http(),
  });
};

// Gas Manager Policy ID (replace with your actual policy ID)
export const GAS_MANAGER_POLICY_ID = "your-gas-manager-policy-id";

// Light Account Factory Address for BNB MAINNET
export const LIGHT_ACCOUNT_FACTORY_ADDRESS = getDefaultLightAccountFactoryAddress(bnbChain);

// Smart Account creation helper
export const createSmartAccount = async (signer: any) => {
  try {
    const account = await createLightAccount({
      chain: bnbChain,
      signer,
      factoryAddress: LIGHT_ACCOUNT_FACTORY_ADDRESS,
      gasManagerConfig: {
        policyId: GAS_MANAGER_POLICY_ID,
      },
    });
    
    return account;
  } catch (error) {
    console.error('Error creating smart account:', error);
    throw error;
  }
};

// Modular Account creation helper (alternative)
export const createModularSmartAccount = async (signer: any) => {
  try {
    const account = await createModularAccount({
      chain: bnbChain,
      signer,
      gasManagerConfig: {
        policyId: GAS_MANAGER_POLICY_ID,
      },
    });
    
    return account;
  } catch (error) {
    console.error('Error creating modular smart account:', error);
    throw error;
  }
};