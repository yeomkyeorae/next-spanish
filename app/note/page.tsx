'use client';

import { useState } from 'react';
import MyNote from '@/components/note/my-note';
import EnrollNote from '@/components/note/enroll-note';

export default function Note() {
  const [noteState, setNoteState] = useState<'note' | 'enroll'>('note');

  const changeNoteState = () => {
    setNoteState(noteState === 'note' ? 'enroll' : 'note');
  };

  return (
    <section className='bg-midFever h-full flex flex-col items-center'>
      <span className='text-2xl font-bold my-2 text-white'>notas escritas a mano!</span>
      <button className='w-32 h-8 bg-red-300 text-white rounded-lg mb-6' onClick={changeNoteState}>
        {noteState}
      </button>
      {noteState === 'note' ? <MyNote /> : <EnrollNote />}
    </section>
  );
}
