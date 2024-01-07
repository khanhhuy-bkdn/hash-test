import {
  getAllData
} from '@/api/hash';
import useSWR from 'swr';

export const allHashKey = 'all-hash';

const useAllData = (transactionHash: string | undefined) => {
  const fetchAllData = async () => {
    try {
      const allData = await getAllData(transactionHash);
      return allData;
    } catch (error) {
      console.log('fetchAllData error:', error);
      return [];
    }
  };

  const { data, error, isLoading } = useSWR(
    ['123', allHashKey],
    fetchAllData,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};

export default useAllData;
