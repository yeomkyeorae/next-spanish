'use client';

import { useState, useEffect, useCallback } from 'react';
import MyNote from '@/components/note/my-note';
import EnrollNote from '@/components/note/enroll-note';
import { getNextNote, getBeforeNote, getFirstNote } from '@/service/note';
import { useAuthContext } from '@/context/authContext';

const MenuNameConvert = {
  note: '등록',
  enroll: '노트',
};

export default function Note() {
  const [noteState, setNoteState] = useState<'note' | 'enroll'>('note');
  const [currentNote, setCurrentNote] = useState<any>(null);
  const [content, setContent] = useState<string>('');
  const { user } = useAuthContext();

  const requestFirstNote = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const firstNote = await getFirstNote(userId);
      setCurrentNote(firstNote);
      setContent(firstNote?.data()?.content ?? '');
    }
  }, [user]);

  const requestNextNote = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const nextNote = await getNextNote(userId, currentNote);

      if (nextNote) {
        setCurrentNote(nextNote);
        setContent(nextNote?.data()?.content ?? '');
      } else {
        alert('다음 노트가 없습니다!');
      }
    }
  }, [user, currentNote]);

  const requestBeforeNote = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const beforeNote = await getBeforeNote(userId, currentNote);

      if (beforeNote) {
        setCurrentNote(beforeNote);
        setContent(beforeNote?.data()?.content ?? '');
      } else {
        alert('이전 노트가 없습니다!');
      }
    }
  }, [user, currentNote]);

  useEffect(() => {
    requestFirstNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {noteState === 'note' ? <MyNote content={content} /> : <EnrollNote setNoteState={setNoteState} />}
      <button onClick={() => requestBeforeNote()}>before</button>
      <button onClick={() => requestNextNote()}>next</button>
    </section>
  );
}
