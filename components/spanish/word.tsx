import DeleteSpanish from '../delete-spanish';

type Props = {
  spanish: string;
  korean: string;
  type: 'word' | 'sentence';
  id: string;
  callback?: () => void;
};

export default function Word({ spanish, korean, type, id, callback }: Props) {
  return (
    <li className='flex items-center h-14 w-72 rounded-md border-2 mb-2 bg-red-500 text-white'>
      <div className='flex w-full'>
        <div className='flex flex-col w-11/12 p-3'>
          <span className='text-xl'>{spanish}</span>
          <span className='text-sm'>{korean}</span>
        </div>
        <div className='flex items-center w-1/12'>
          <DeleteSpanish type={type} id={id} callback={callback} />
        </div>
      </div>
    </li>
  );
}
