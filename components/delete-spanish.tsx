import { deleteSpanish } from '@/service/spanish';
import { IoMdRemoveCircle } from 'react-icons/io';

type Props = {
  type: 'word' | 'sentence';
  id: string;
  callback?: () => void;
};

export default function DeleteSpanish({ type, id, callback }: Props) {
  const clickHandler = async () => {
    try {
      const ok = confirm('삭제하시겠습니까?');
      if (ok) {
        await deleteSpanish(type, id);

        if (callback) {
          callback();
        }
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
