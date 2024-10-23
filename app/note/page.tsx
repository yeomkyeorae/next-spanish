'use client';

import { useState, useEffect, useCallback } from 'react';
import MyNote from '@/components/note/MyNote';
import EnrollNote from '@/components/note/EnrollNote';
import { getNextNote, getBeforeNote, getFirstNote, deleteNote, getNoteCount } from '@/service/note';
import { useAuthContext } from '@/context/authContext';
import { NoteStateType } from '@/types';
import Button from '@/components/common/Button';
import { MenuNameConvertName, NoteState } from '@/def';

export default function Note() {
  const [noteState, setNoteState] = useState<NoteStateType>(NoteState.note);
  const [currentNote, setCurrentNote] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [maxNoteCount, setMaxNoteCount] = useState(0);
  const { user } = useAuthContext();

  const userId = user!.uid;
  const requestFirstNote = useCallback(async () => {
    const firstNote = await getFirstNote(userId);
    setCurrentNote(firstNote);

    const title = firstNote?.data()?.title;
    const content = firstNote?.data()?.content;

    setTitle(title ?? '제목이 없습니다!');
    setContent(content ?? '등록된 노트가 없습니다!');

    const count = await getNoteCount(userId);
    setMaxNoteCount(count);

    if (content) {
      setCurrentPage(1);
    }
  }, [userId]);

  const requestNextNote = useCallback(async () => {
    if (currentNote) {
      const nextNote = await getNextNote(userId, currentNote);

      if (nextNote) {
        setCurrentNote(nextNote);
        setTitle(nextNote?.data()?.title ?? '');
        setContent(nextNote?.data()?.content ?? '');
        setCurrentPage(currentPage + 1);
      } else {
        alert('다음 노트가 없습니다!');
      }
    }
  }, [userId, currentNote, currentPage]);

  const requestBeforeNote = useCallback(async () => {
    if (currentNote) {
      const beforeNote = await getBeforeNote(userId, currentNote);

      if (beforeNote) {
        setCurrentNote(beforeNote);
        setTitle(beforeNote?.data()?.title ?? '');
        setContent(beforeNote?.data()?.content ?? '');
        setCurrentPage(currentPage - 1);
      } else {
        alert('이전 노트가 없습니다!');
      }
    }
  }, [userId, currentNote, currentPage]);

  const changeNoteState = (noteState: NoteStateType) => {
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
          text={MenuNameConvertName[noteState]}
          btnBgColor={noteState === NoteState.note ? 'bg-orange' : 'bg-black'}
          onClickHandler={() => changeNoteState(noteState === NoteState.note ? NoteState.enroll : NoteState.note)}
        />
        {noteState === NoteState.note ? (
          <>
            <Button text='수정' btnBgColor='bg-carrot' onClickHandler={() => changeNoteState(NoteState.modify)} />
            <Button text='삭제' onClickHandler={deleteNoteHandler} />
          </>
        ) : null}
      </div>
      {noteState === NoteState.note ? (
        <>
          <MyNote
            title={title}
            content={content}
            requestBeforeNote={requestBeforeNote}
            requestNextNote={requestNextNote}
          />
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
          title={noteState === NoteState.modify ? title : null}
          content={noteState === NoteState.modify ? content : null}
          noteId={noteState === NoteState.modify ? currentNote.id : null}
          setTitle={setTitle}
          setContent={setContent}
          requestFirstNote={requestFirstNote}
        />
      )}
    </section>
  );
}
