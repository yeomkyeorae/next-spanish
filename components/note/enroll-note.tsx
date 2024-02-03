'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import NoteMarkdown from './note-markdown';
import { enrollNote, modifyNote } from '@/service/note';
import { useAuthContext } from '@/context/authContext';
import { NoteStateType } from '@/types';
import { NoteState } from '@/def';
import Button from '../button';

type Props = {
  setNoteState: Dispatch<SetStateAction<NoteStateType>>;
  noteState: NoteStateType;
  content: string | null;
  noteId: string | null;
  setContent: Dispatch<SetStateAction<string>>;
  requestFirstNote: () => void;
};

export default function EnrollNote({ setNoteState, noteState, content, noteId, setContent, requestFirstNote }: Props) {
  const [note, setNote] = useState(content ?? '');
  const { user } = useAuthContext();

  const onEnrollHandler = useCallback(async () => {
    const userId = user?.uid;

    try {
      if (userId) {
        await enrollNote(userId, note);
        alert('노트 등록에 성공했습니다!');

        setNoteState(NoteState.note);
        setContent(note);
        requestFirstNote();
      }
    } catch (err) {
      console.log(err);
      alert('노트 등록에 실패했습니다!');
    }
  }, [note, user, setNoteState, setContent, requestFirstNote]);

  const onModifyHandler = useCallback(async () => {
    const userId = user?.uid;

    try {
      if (userId && noteId) {
        await modifyNote(noteId, note);
        alert('노트 수정에 성공했습니다!');

        setNoteState(NoteState.note);
        setContent(note);
      }
    } catch (err) {
      console.log(err);
      alert('노트 수정에 실패했습니다!');
    }
  }, [note, user, setNoteState, setContent, noteId]);

  return (
    <section className='flex flex-col items-center w-full h-full'>
      <div className='flex gap-2 w-4/5 h-full'>
        <textarea
          className='w-full h-full rounded-md lg:w-1/2'
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <NoteMarkdown markdown={note} width='half' />
      </div>
      <div className='my-5'>
        <Button
          text={noteState === NoteState.enroll ? '등록' : '수정'}
          btnBgColor={noteState === NoteState.enroll ? 'bg-orange' : 'bg-carrot'}
          onClickHandler={noteId ? onModifyHandler : onEnrollHandler}
        />
      </div>
    </section>
  );
}
