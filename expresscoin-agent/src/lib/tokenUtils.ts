// ERC20 Token Transfer ABI
export const ERC20_TRANSFER_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

// Common BNB Mainnet Token Addresses
export const TOKEN_ADDRESSES = {
  USDT: "0x55d398326f99059fF775485246999027B3197955", // BNB Mainnet USDT
  BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", // BNB Mainnet BUSD
  USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", // BNB Mainnet USDC
} as const;

import { encodeFunctionData } from 'viem';

// Encode ERC20 transfer data
export function encodeERC20Transfer(to: string, amount: string): `0x${string}` {
  return encodeFunctionData({
    abi: ERC20_TRANSFER_ABI,
    functionName: 'transfer',
    args: [to as `0x${string}`, BigInt(amount)]
  });
}

// Get token address by symbol
export function getTokenAddress(symbol: string): string {
  const upperSymbol = symbol.toUpperCase();
  return TOKEN_ADDRESSES[upperSymbol as keyof typeof TOKEN_ADDRESSES] || symbol;
}