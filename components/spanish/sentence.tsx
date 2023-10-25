import DeleteSpanish from '../delete-spanish';

type Props = {
  spanish: string;
  korean: string;
  id: string;
  callback?: () => void;
};

export default function Sentence({ spanish, korean, id, callback }: Props) {
  return (
    <li className='flex items-center h-full w-full rounded-md border-2 mb-2 bg-red-500 text-white'>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col p-3'>
          <span className='text-xl'>{spanish}</span>
          <span className='text-sm'>{korean}</span>
        </div>
        <div className='flex items-center p-3'>
          <DeleteSpanish type={'sentence'} id={id} callback={callback} />
        </div>
      </div>
    </li>
  );
}
