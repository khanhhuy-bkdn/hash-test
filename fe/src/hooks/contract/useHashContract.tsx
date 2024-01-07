import { abi as HashABI } from '@/resources/abis/Hash.json';
import { writeContract } from '@wagmi/core';

export const useHashContractWrite = () => {
  return { writeContract, ABI: HashABI };
};
