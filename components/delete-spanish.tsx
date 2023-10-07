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
      await deleteSpanish(type, id);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <span onClick={clickHandler}>
      <IoMdRemoveCircle className='text-red-600' />
    </span>
  );
}
