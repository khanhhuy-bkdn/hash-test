import React from 'react';
import InlineLoading from '../loading/InlineLoading';

interface ListHashTableProps {
  data: {
    onchainId: number;
    txHash: string;
    data: string;
  }[];
  loading: boolean;
}

const ListHashTable: React.FC<ListHashTableProps> = ({
  data,
  loading,
}) => {

  return (
    <>
      <div className="overflow-x-auto mt-8 bg-dark md:min-h-[320px]">
        <table className="min-w-full relative">
          <thead>
            <tr>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                Transaction Hash
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                OnchainId
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                Data
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody className="bg-[transparent] h-[260px]">
              <div className="flex items-center justify-center absolute w-[210px] left-[40%] top-[40%]">
                <InlineLoading message="Fetching data" />
              </div>
            </tbody>
          ) : (
            <tbody>
              {data?.map((item, index: number) => (
                <tr key={index} className="hover:bg-darkBlue cursor-pointer">
                  <td
                    className="py-4 text-sm px-4 border-b border-[#344054] text-left relative font-semibold"
                  >
                    <div className='break-all'>{item?.txHash}</div>
                  </td>
                  <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                    {item?.onchainId}
                  </td>
                  <td className="py-4 w-[400px] text-sm px-4 border-b border-[#344054] text-right">
                    {item?.data}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default ListHashTable;
