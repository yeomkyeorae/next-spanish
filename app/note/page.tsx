'use client';

import { useState } from 'react';
import MyNote from '@/components/note/my-note';
import EnrollNote from '@/components/note/enroll-note';

const MenuNameConvert = {
  note: '등록',
  enroll: '노트',
};

export default function Note() {
  const [noteState, setNoteState] = useState<'note' | 'enroll'>('note');

  const changeNoteState = () => {
    setNoteState(noteState === 'note' ? 'enroll' : 'note');
  };

  return (
    <section className='bg-midFever h-full flex flex-col items-center'>
      <span className='text-2xl font-bold my-2 text-white'>notas escritas a mano!</span>
      <div className='flex mt-6 mb-6 justify-between'>
        <button className='w-32 h-8 bg-red-300 text-white rounded-lg mr-2' onClick={changeNoteState}>
          {MenuNameConvert[noteState]}
        </button>
        {noteState === 'note' ? <button className='w-32 h-8 bg-red-300 text-white rounded-md ml-2'>수정</button> : null}
      </div>
      {noteState === 'note' ? <MyNote /> : <EnrollNote setNoteState={setNoteState} />}
    </section>
  );
}
