import { WordInfo } from '@/types';

interface Props {
  data: WordInfo[];
}

export default function AdditionWordInfoList({ data }: Props) {
  return (
    <ul className='w-full flex flex-col items-center gap-1'>
      {data?.length > 0 ? (
        data.map((item, index) => {
          return (
            <li key={index} className='flex w-4/5 gap-1'>
              <div className='border-2 border-black w-1/5 p-1'>{item.explanation}</div>
              <div className='border-2 border-black w-4/5 p-1'>{item.spanish}</div>
            </li>
          );
        })
      ) : (
        <span>추가한 단어 정보가 없습니다</span>
      )}
    </ul>
  );
}
