'use client';

import { useState } from 'react';
import NoteMarkdown from './note-markdown';

export default function EnrollNote() {
  const [note, setNote] = useState('');

  return (
    <section className='flex flex-col items-center'>
      <div className='flex gap-2'>
        <textarea className='w-72 h-72 border-2 border-black' value={note} onChange={(e) => setNote(e.target.value)} />
        <NoteMarkdown markdown={note} />
      </div>
      <button className='w-32 h-8 bg-red-300 text-white rounded-md mt-6'>등록</button>
    </section>
  );
}
