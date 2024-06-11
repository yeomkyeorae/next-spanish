import { deleteSpanish } from '@/service/spanish';
import { IoMdRemoveCircle } from 'react-icons/io';

type Props = {
  type: 'word' | 'sentence';
  id: string;
  callback?: (id: string) => void;
};

export default function DeleteSpanish({ type, id, callback }: Props) {
  const clickHandler = async () => {
    try {
      const ok = confirm('삭제하시겠습니까?');
      if (ok) {
        await deleteSpanish(type, id);

        if (callback) {
          callback(id);
        }

        alert(`${type === 'sentence' ? '문장' : '단어'} 삭제가 완료되었습니다!`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <span onClick={clickHandler} className='cursor-pointer'>
      <IoMdRemoveCircle className='text-yellow-400' />
    </span>
  );
}
