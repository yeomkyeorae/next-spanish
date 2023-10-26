'use client';

import { useCallback, useState } from 'react';
import NoteMarkdown from './note-markdown';
import { enrollNote } from '@/service/note';
import { useAuthContext } from '@/context/authContext';

export default function EnrollNote() {
  const [note, setNote] = useState('');
  const { user } = useAuthContext();

  const onEnrollHandler = useCallback(async () => {
    const userId = user?.uid;

    try {
      if (userId) {
        await enrollNote(userId, note);
        alert('노트 등록에 성공했습니다!');
      }
    } catch (err) {
      console.log(err);
      alert('노트 등록에 실패했습니다!');
    }
  }, [note, user]);

  return (
    <section className='flex flex-col items-center'>
      <div className='flex gap-2'>
        <textarea className='w-72 h-72 border-2 border-black' value={note} onChange={(e) => setNote(e.target.value)} />
        <NoteMarkdown markdown={note} />
      </div>
      <button className='w-32 h-8 bg-red-300 text-white rounded-md mt-6' onClick={onEnrollHandler}>
        등록
      </button>
    </section>
  );
}
