import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { polygonMumbai } from 'viem/chains';
import {
  RPC_URL,
} from './constants';

const publicClient: any = createPublicClient({
  chain: polygonMumbai,
  transport: http(RPC_URL),
});

const getWalletClient = () => {
  try {
    return createWalletClient({
      chain: polygonMumbai,
      transport:
        typeof window !== 'undefined'
          ? custom((window as any).ethereum)
          : http(),
    });
  } catch (err) {
    console.log({ err });
    return {};
  }
};

const walletClient: any = getWalletClient();

export { publicClient, walletClient };