import { Spanish } from '@/types';
import DeleteSpanish from './DeleteSpanish';
import ModifySpanish from './ModifySpanish';

type Props = {
  sentence: Spanish;
  modifyCallback: (id: string, spanish: string, korean: string) => void;
  deleteCallback: (id: string) => void;
};

export default function Sentence({ sentence, modifyCallback, deleteCallback }: Props) {
  const { spanish, korean, id } = sentence;

  return (
    <li className='flex items-center h-full w-full rounded-md border-2 mb-2 bg-red-500 text-white shadow-inner'>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col p-3'>
          <span className='text-xl'>{spanish}</span>
          <span className='text-sm'>{korean}</span>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 p-1'>
          <ModifySpanish callback={() => modifyCallback(id, spanish, korean)} />
          <DeleteSpanish type={'sentence'} id={id} callback={deleteCallback} />
        </div>
      </div>
    </li>
  );
}
