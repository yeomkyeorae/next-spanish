import { FaPen } from 'react-icons/fa';

type Props = {
  callback: () => void;
};

export default function ModifySpanish({ callback }: Props) {
  return (
    <span onClick={callback} className='cursor-pointer'>
      <FaPen className='text-yellow-400' />
    </span>
  );
}
