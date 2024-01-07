import { Button } from '@/components/button/Button';
import { useLoading } from '@/context/LoadingContext';
import AddIcon from '@/icons/AddIcon';
import Search from '@/icons/Search';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { waitForTransaction } from '@wagmi/core';
import customToast from '../../components/notification/customToast';
import { polygonMumbai } from 'wagmi/chains';
import handleSwitchNetwork from '@/utils/switchNetwork';

import { handleError } from '@/utils/handleError';

import { useHashContractWrite } from '@/hooks/contract/useHashContract';
import { Address, encodePacked, decodeAbiParameters } from 'viem';
import { handleSuccessTxMessageActionWithNoValue } from '@/components/successTxMessage';
import {
  create
} from '@/api/hash';

import {
  HASH_ADDRESS_MUMBAI
} from '@/utils/constants';

interface PoolListProps { }

const PoolList = ({ }: PoolListProps) => {
  const [searchValue, setSearchValue] = useState('');
  let [hashValue, setHashValue] = useState('');
  const router = useRouter();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();

  const resetInput = () => {
    setSearchValue('');
    setHashValue('');
  };

  useEffect(() => {
    setSearchValue(searchValue);
    setHashValue(hashValue);
  }, [hashValue, searchValue]);

  const handleSetValue = (value: string) => {
    setSearchValue(value);
    hashValue = encodePacked(
      ['string'],
      [value]
    );
    setHashValue(hashValue);
  }

  const handleCreateHash = async () => {
    try {
      const { writeContract: writeHashContract, ABI: HashABI } =
        useHashContractWrite();

      if (chain?.id !== polygonMumbai.id) {
        handleSwitchNetwork(switchNetwork);
        return;
      }

      startLoadingTx({
        title: 'Submitting...',
        message: 'Confirming your transaction, please wait.',
      });

      let txResult: any;

      txResult = await writeHashContract({
        address: HASH_ADDRESS_MUMBAI as Address,
        abi: HashABI,
        functionName: 'createHash',
        args: [
          hashValue
        ],
      });

      if (!txResult) {
        stopLoadingTx();
        return;
      }

      const hash = txResult.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log(txReceipt.logs);

      if (txReceipt.logs[0] != undefined) {
        const values = decodeAbiParameters(
          [
            { name: 'id', type: 'uint256' },
            { name: 'data', type: 'bytes' },
          ],
          txReceipt.logs[0].data,
        )
        const dataRequest = {
          onchainId: Number(values[0]),
          txHash: hash,
          data: values[1]
        };
        // console decoded data
        await create(dataRequest);
      }

      // const dataRequest = {
      //   onchainId: 10,
      //   txHash: "0x5fcf52f9af4024b904e9098925fc6c591db7585e5826d5a24d040ed25d17abc0",
      //   data: "0x31323336393837"
      // };
      // console decoded data
      // console.log(dataRequest);
      // await create(dataRequest);

      resetInput();
      stopLoadingTx();
      customToast({
        message: 'Create successfully',
        type: 'success',
      });

      startSuccessTx(
        handleSuccessTxMessageActionWithNoValue({
          action: 'create hash',
          txHash: hash,
        })
      );
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  return (
    <div className={clsx(['max-w-[1096px] w-full mx-auto mb-20 mt-28 px-2'])}>
      <div className="block lg:flex items-center justify-between">
        <div>
          <div className="font-bold">Create hash</div>
        </div>
      </div>
      <div className="flex ml-1 my-4">
        <Button
          className={`w-[100px]  !rounded-[4px] !text-[16px] flex justify-center items-center`}
        >
          Encode
        </Button>
        <Button
          className={`w-[100px] ${'!bg-[#000] text-[#fff]'} !rounded-[4px] !text-[16px] flex justify-center items-center`}
          onClick={() => router.push('/verify')}
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
            placeholder="Input "
            value={searchValue}
            onChange={(e: any) => handleSetValue(e.target.value)}
          />
        </div>
        <Button
          className="px-2 h-[48px] lg:h-[52px] w-full lg:w-[290px] flex justify-center"
          onClick={handleCreateHash}
        >
          <AddIcon color="#0C111D" />
          Submit
        </Button>
      </div>
      <div className="mt-5">
        Hash: {hashValue}
      </div>
    </div>
  );
};

export default PoolList;
