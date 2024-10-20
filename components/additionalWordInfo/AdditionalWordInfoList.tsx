import { WordInfo } from '@/types';
import Pen from '../common/icons/Pen';
import Remove from '../common/icons/Remove';

interface Props {
  data: WordInfo[];
  removeWordInfo: (wordId: string) => void;
  changeEnrollModiType: (spanish: string, explanation: string, id: string) => void;
}

export default function AdditionWordInfoList({ data, removeWordInfo, changeEnrollModiType }: Props) {
  return (
    <ul className='w-full flex flex-col items-center gap-1'>
      {data?.length > 0 ? (
        data.map((item, index) => {
          const { spanish, explanation, id } = item;

          return (
            <li key={index} className='flex justify-center w-4/5 gap-1'>
              <div className='border-2 border-black w-1/6 p-1 rounded-md'>{explanation}</div>
              <div className='border-2 border-black w-4/6 p-1 rounded-md'>{spanish}</div>
              <div className='border-2 border-black w-1/6 p-1 rounded-md flex justify-center items-center gap-2'>
                <span onClick={() => changeEnrollModiType(spanish, explanation, id)} className='cursor-pointer'>
                  <Pen />
                </span>
                <span onClick={() => removeWordInfo(id)} className='cursor-pointer'>
                  <Remove />
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
