import { Button } from '@/components/button/Button';
import ListHashTable from '@/components/table/ListHashTable';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import useAllData from '@/hooks/useAllData';

interface PoolListProps { }

const PoolList = ({ }: PoolListProps) => {
  const router = useRouter();

  const { data: allData, isLoading: isLoading } =
    useAllData('');

  return (
    <div className={clsx(['max-w-[1096px] w-full mx-auto mb-20 mt-28 px-2'])}>
      <div className="block lg:flex items-center justify-between">
        <div>
          <div className="font-bold">List data</div>
        </div>
      </div>
      <div className="flex ml-1 my-4 ">
        <Button
          className={`w-[100px] ${'!bg-[#000] text-[#fff]'} x!rounded-[4px] !text-[16px] flex justify-center items-center`}
          onClick={() => router.push('/encode')}
        >
          Encode
        </Button>
        <Button
          className={`w-[100px] ${'!bg-[#000] text-[#fff]'} x!rounded-[4px] !text-[16px] flex justify-center items-center`}
          onClick={() => router.push('/verify')}
        >
          Verify
        </Button>
        <Button
          className={`w-[100px]  !rounded-[4px] !text-[16px] flex justify-center items-center`}
        >
          List
        </Button>
      </div>

      <ListHashTable
        data={(allData as any)}
        loading={isLoading}
      />
    </div>
  );
};

export default PoolList;
