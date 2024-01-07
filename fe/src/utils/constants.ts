import { Address } from 'viem';
import { polygonMumbai } from 'wagmi/chains';

export const ADDRESS_ZERO: Address =
  '0x0000000000000000000000000000000000000000';

export const MAX_UINT256 =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://testnet-api.arthur.exchange';

export const ALCHEMY_MUMBAI_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_API_KEY;

export const INFURA_API_KEY = process.env.NEXT_PUBLIC_MUMBAI_API_KEY;

export const MUMBAI_ALCHEMY_RPC = process.env.NEXT_PUBLIC_MUMBAI_ALCHEMY_RPC;

export const RPC_URL = MUMBAI_ALCHEMY_RPC;

export const MUMBAI_EXPLORER_URL = process.env.NEXT_PUBLIC_MUMBAI_EXPLORER_URL || 'https://mumbai.polygonscan.com';

export const CHAIN_EXPLORER_URL = MUMBAI_EXPLORER_URL;

export const APP_BASED_CHAIN = polygonMumbai;

// Mumbai testnet
export const HASH_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_HASH_ADDRESS_MUMBAI ||
  '0xE3d94a70166DAd5E7119BD4A7C7cA7dE1B755F45';