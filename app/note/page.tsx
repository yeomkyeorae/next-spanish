'use client';

import { useState, useEffect, useCallback } from 'react';
import MyNote from '@/components/note/my-note';
import EnrollNote from '@/components/note/enroll-note';
import { getNextNote, getBeforeNote, getFirstNote, deleteNote, getNoteCount } from '@/service/note';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [maxNoteCount, setMaxNoteCount] = useState(0);
  const { user } = useAuthContext();

  const requestFirstNote = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const firstNote = await getFirstNote(userId);
      setCurrentNote(firstNote);
      const content = firstNote?.data()?.content;
      setContent(content ?? '등록된 노트가 없습니다!');

      const count = await getNoteCount(userId);
      setMaxNoteCount(count);

      if (content) {
        setCurrentPage(1);
      }
    }
  }, [user]);

  const requestNextNote = useCallback(async () => {
    const userId = user?.uid;

    if (userId && currentNote) {
      const nextNote = await getNextNote(userId, currentNote);

      if (nextNote) {
        setCurrentNote(nextNote);
        setContent(nextNote?.data()?.content ?? '');
        setCurrentPage(currentPage + 1);
      } else {
        alert('다음 노트가 없습니다!');
      }
    }
  }, [user, currentNote, currentPage]);

  const requestBeforeNote = useCallback(async () => {
    const userId = user?.uid;

    if (userId && currentNote) {
      const beforeNote = await getBeforeNote(userId, currentNote);

      if (beforeNote) {
        setCurrentNote(beforeNote);
        setContent(beforeNote?.data()?.content ?? '');
        setCurrentPage(currentPage - 1);
      } else {
        alert('이전 노트가 없습니다!');
      }
    }
  }, [user, currentNote, currentPage]);

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
        <>
          <MyNote content={content} requestBeforeNote={requestBeforeNote} requestNextNote={requestNextNote} />
          {currentPage > 0 && maxNoteCount > 0 ? (
            <span className='text-white mb-5'>
              {currentPage} / {maxNoteCount}
            </span>
          ) : null}
        </>
      ) : (
        <EnrollNote
          setNoteState={setNoteState}
          noteState={noteState}
          content={noteState === 'modify' ? content : null}
          noteId={noteState === 'modify' ? currentNote.id : null}
          setContent={setContent}
          requestFirstNote={requestFirstNote}
        />
      )}
    </section>
  );
}
