import ModifySpanish from './ModifySpanish';
import DeleteSpanish from './DeleteSpanish';
import Star from '../common/icons/Star';
import { FaPlus } from 'react-icons/fa';
import { Spanish } from '@/types';

type Props = {
  word: Spanish;
  starChecked: boolean;
  modifyCallback: (id: string, spanish: string, korean: string) => void;
  deleteCallback: () => void;
  changeStarState: (id: string, starChecked: boolean) => void;
  openModal: () => void;
};

export default function Word({ word, starChecked, modifyCallback, deleteCallback, changeStarState, openModal }: Props) {
  const { spanish, korean, id } = word;

  return (
    <section className='flex min-h-14'>
      <li className='flex items-center min-h-14 w-full rounded-l-md border-2 mb-2 bg-red-500 text-white shadow-inner'>
        <div className='flex w-full justify-between'>
          <div className='flex flex-col p-3'>
            <div className='flex items-center gap-1'>
              {starChecked ? (
                <span className='text-yellow-400'>
                  <Star />
                </span>
              ) : (
                ''
              )}
              <span className='text-xl'>{spanish}</span>
            </div>
            <span className='text-sm'>{korean}</span>
          </div>
          <div className='flex flex-col justify-center items-center gap-2 w-1/12'>
            <ModifySpanish callback={() => modifyCallback(id, spanish, korean)} />
            <DeleteSpanish type={'word'} id={id} callback={deleteCallback} />
          </div>
        </div>
      </li>
      <div className='flex flex-col gap-1'>
        <div
          className='border-2 ml-1 rounded-r-md h-8 w-8 flex justify-center items-center cursor-pointer'
          onClick={openModal}
        >
          <FaPlus className='text-yellow-400 hover:text-carrot' />
        </div>
        <div
          className={`border-2 ml-1 rounded-r-md h-8 w-8 flex justify-center items-center cursor-pointer hover:text-yellow-400 ${
            starChecked ? 'text-yellow-400' : 'text-slate-300'
          }`}
          onClick={() => changeStarState(id, !starChecked)}
        >
          <Star />
        </div>
      </div>
    </section>
  );
}
