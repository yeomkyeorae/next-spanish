'use client';

import { useState, useEffect, useCallback } from 'react';
import MyNote from '@/components/note/my-note';
import EnrollNote from '@/components/note/enroll-note';
import { getNextNote, getBeforeNote, getFirstNote, deleteNote } from '@/service/note';
import { useAuthContext } from '@/context/authContext';
import { NoteState } from '@/types';
import Button from '@/components/button';

const MenuNameConvert = {
  note: '등록',
  enroll: '노트',
  modify: '노트',
};

export default function Note() {
  const [noteState, setNoteState] = useState<NoteState>('note');
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

  const changeNoteState = (noteState: NoteState) => {
    setNoteState(noteState);
  };

  const deleteNoteHandler = async () => {
    const ok = confirm('현재 노트를 삭제하시겠습니까?');
    if (ok) {
      if (currentNote) {
        try {
          const docId = currentNote.id;
          await deleteNote(docId);

          alert('노트가 삭제되었습니다!');

          requestFirstNote();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    requestFirstNote();
  }, [user, requestFirstNote]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        requestBeforeNote();
      } else if (event.key === 'ArrowRight') {
        requestNextNote();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [content, requestNextNote, requestBeforeNote]);

  return (
    <section className='bg-midFever h-full flex flex-col items-center'>
      <span className='text-2xl font-bold my-2 text-white'>notas escritas a mano!</span>
      <div className='flex gap-2 mt-6 mb-6 justify-between'>
        <Button
          text={MenuNameConvert[noteState]}
          btnBgColor={noteState === 'note' ? 'bg-orange' : 'bg-black'}
          onClickHandler={() => changeNoteState(noteState === 'note' ? 'enroll' : 'note')}
        />
        {noteState === 'note' ? (
          <>
            <Button text='수정' btnBgColor='bg-carrot' onClickHandler={() => changeNoteState('modify')} />
            <Button text='삭제' onClickHandler={deleteNoteHandler} />
          </>
        ) : null}
      </div>
      {noteState === 'note' ? (
        <MyNote content={content} requestBeforeNote={requestBeforeNote} requestNextNote={requestNextNote} />
      ) : (
        <EnrollNote
          setNoteState={setNoteState}
          noteState={noteState}
          currentNote={noteState === 'modify' ? currentNote : null}
          setContent={setContent}
        />
      )}
    </section>
  );
}
