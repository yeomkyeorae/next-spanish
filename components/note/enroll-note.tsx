'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import NoteMarkdown from './note-markdown';
import { enrollNote } from '@/service/note';
import { useAuthContext } from '@/context/authContext';
import { NoteState } from '@/types';
import Button from '../button';

type Props = {
  setNoteState: Dispatch<SetStateAction<NoteState>>;
  noteState: NoteState;
  currentNote: any;
};

export default function EnrollNote({ setNoteState, noteState, currentNote }: Props) {
  const [note, setNote] = useState(currentNote ? currentNote.data().content : '');
  const { user } = useAuthContext();

  const onEnrollHandler = useCallback(async () => {
    const userId = user?.uid;

    try {
      if (userId) {
        await enrollNote(userId, note);
        alert('노트 등록에 성공했습니다!');

        setNoteState('note');
      }
    } catch (err) {
      console.log(err);
      alert('노트 등록에 실패했습니다!');
    }
  }, [note, user, setNoteState]);

  const onModifyHandler = () => {};

  return (
    <section className='flex flex-col items-center w-full h-full'>
      <div className='flex gap-2 w-4/5 h-full'>
        <textarea className='w-1/2 h-full rounded-md' value={note} onChange={(e) => setNote(e.target.value)} />
        <NoteMarkdown markdown={note} width='half' />
      </div>
      <Button
        text={noteState === 'enroll' ? '등록' : '수정'}
        btnBgColor={noteState === 'enroll' ? 'bg-orange' : 'bg-carrot'}
        onClickHandler={onEnrollHandler}
      />
    </section>
  );
}
