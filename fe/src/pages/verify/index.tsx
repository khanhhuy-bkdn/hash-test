import { Button } from '@/components/button/Button';
import { useLoading } from '@/context/LoadingContext';
import AddIcon from '@/icons/AddIcon';
import Search from '@/icons/Search';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Address } from 'viem';

import { handleError } from '@/utils/handleError';

import * as HashContract from '@/utils/HashContract';
import {
  HASH_ADDRESS_MUMBAI,
} from '@/utils/constants';

import {
  getDataByTxHash
} from '@/api/hash';

interface PoolListProps { }

const PoolList = ({ }: PoolListProps) => {
  const [searchValue, setSearchValue] = useState('');
  let [result, setResult] = useState('');
  const router = useRouter();
  const { startLoadingTx, stopLoadingTx } = useLoading();

  const handleVerifyHash = async () => {
    try {
      result = 'Invalid';

      startLoadingTx({
        title: 'Verifing...',
        message: 'Please wait.',
      });

      const res = await getDataByTxHash(searchValue);

      if (res != undefined) {
        const hashValue = (await HashContract.read(
          HASH_ADDRESS_MUMBAI as Address,
          'hashList',
          [res.onchainId]
        )) as string;
        console.log(hashValue)
        if (res.data === hashValue) {
          result = 'Valid';
        }
      }

      setResult(result);
      stopLoadingTx();
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  return (
    <div
      className={clsx(['max-w-[1096px] w-full mx-auto  mb-20 mt-28  px-2 '])}
    >
      <div className="block lg:flex items-center justify-between">
        <div>
          <div className="font-bold">Verify hash</div>
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
          className={`w-[100px]  !rounded-[4px] !text-[16px] flex justify-center items-center`}
        >
          Verify
        </Button>
        <Button
          className={`w-[100px] ${'!bg-[#000] text-[#fff]'} x!rounded-[4px] !text-[16px] flex justify-center items-center`}
          onClick={() => router.push('/list')}
        >
          List
        </Button>
      </div>
      <div className="block lg:flex gap-5 items-center mt-3">
        <div className="w-full w-[300px] flex">
          <div className="w-[70px] bg-dark flex items-center justify-center rounded-tl-lg rounded-bl-lg">
            <Search />
          </div>
          <input
            className="w-full w-[300px] bg-dark h-[52px] text-[15px] font-semibold rounded-tr-lg rounded-br-lg focus:outline-none  placeholder-[#667085] w-full"
            placeholder="Transaction hash "
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <Button
          className="px-2 h-[48px] lg:h-[52px] w-full lg:w-[290px] flex justify-center"
          onClick={handleVerifyHash}
        >
          <AddIcon color="#0C111D" />
          Verify
        </Button>
      </div>
      <div className="mt-5">
        Result: {result}
      </div>
    </div>
  );
};

export default PoolList;
