import Pen from '../common/icons/Pen';

type Props = {
  callback: () => void;
};

export default function ModifySpanish({ callback }: Props) {
  return (
    <span onClick={callback} className='cursor-pointer'>
      <Pen />
    </span>
  );
}
