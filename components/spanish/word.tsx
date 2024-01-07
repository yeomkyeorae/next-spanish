import ModifySpanish from '../modify-spanish';
import DeleteSpanish from '../delete-spanish';

type Props = {
  spanish: string;
  korean: string;
  id: string;
  modifyCallback: (id: string, spanish: string, korean: string) => void;
  deleteCallback: () => void;
};

export default function Word({ spanish, korean, id, modifyCallback, deleteCallback }: Props) {
  return (
    <li className='flex items-center min-h-14 w-80 rounded-md border-2 mb-2 bg-red-500 text-white shadow-inner'>
      <div className='flex w-full'>
        <div className='flex flex-col w-11/12 p-3'>
          <span className='text-xl'>{spanish}</span>
          <span className='text-sm'>{korean}</span>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 w-1/12'>
          <ModifySpanish callback={() => modifyCallback(id, spanish, korean)} />
          <DeleteSpanish type={'word'} id={id} callback={deleteCallback} />
        </div>
      </div>
    </li>
  );
}
