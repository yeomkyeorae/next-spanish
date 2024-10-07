import { FaStar } from 'react-icons/fa';

export default function Star({ isChecked }: { isChecked: boolean }) {
  const style = isChecked ? 'text-yellow-400' : 'text-slate-300';
  return <FaStar className={style} />;
}
