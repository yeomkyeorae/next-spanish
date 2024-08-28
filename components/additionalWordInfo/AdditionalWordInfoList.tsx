import { WordInfo } from '@/types';
import { FaPen } from 'react-icons/fa';
import { IoMdRemoveCircle } from 'react-icons/io';

interface Props {
  data: WordInfo[];
  removeWordInfo: (wordId: string) => void;
}

export default function AdditionWordInfoList({ data, removeWordInfo }: Props) {
  return (
    <ul className='w-full flex flex-col items-center gap-1'>
      {data?.length > 0 ? (
        data.map((item, index) => {
          return (
            <li key={index} className='flex justify-center w-4/5 gap-1'>
              <div className='border-2 border-black w-1/6 p-1 rounded-md'>{item.explanation}</div>
              <div className='border-2 border-black w-4/6 p-1 rounded-md'>{item.spanish}</div>
              <div className='border-2 border-black w-1/6 p-1 rounded-md flex justify-center items-center gap-2'>
                <span className='cursor-pointer'>
                  <FaPen className='text-yellow-400 hover:text-carrot' />
                </span>
                <span onClick={() => removeWordInfo(item.id)} className='cursor-pointer'>
                  <IoMdRemoveCircle className='text-yellow-400 hover:text-carrot' />
                </span>
              </div>
            </li>
          );
        })
      ) : (
        <span>추가한 단어 정보가 없습니다</span>
      )}
    </ul>
  );
}
