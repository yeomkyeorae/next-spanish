'use client';

import { Dispatch, SetStateAction, useCallback, useState, useRef, KeyboardEvent } from 'react';
import NoteMarkdown from './NoteMarkdown';
import { enrollNote, modifyNote } from '@/service/note';
import { useAuthContext } from '@/context/authContext';
import { NoteStateType } from '@/types';
import { NoteState, SpanishConvertDict, TargetSpanishCharListForInput, SpanishKeyboardActivationKey } from '@/def';
import Button from '../common/Button';
import SpanishKeyboard from '../keyboard/SpanishKeyboard';
import Input from '../common/Input';

type Props = {
  setNoteState: Dispatch<SetStateAction<NoteStateType>>;
  noteState: NoteStateType;
  title: string | null;
  content: string | null;
  noteId: string | null;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  requestFirstNote: () => void;
};

export default function EnrollNote({
  setNoteState,
  noteState,
  title,
  content,
  noteId,
  setTitle,
  setContent,
  requestFirstNote,
}: Props) {
  const [noteTitle, setNoteTitle] = useState(title ?? '');
  const [note, setNote] = useState(content ?? '');
  const [open, setOpen] = useState(false);
  const [specialChar, setSpecialChar] = useState<keyof typeof SpanishConvertDict | null>(null);
  const [isActiveSpanishKeyboard, setIsActiveSpanishKeyboard] = useState(false);
  const { user } = useAuthContext();
  const userId = user!.uid;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onEnrollHandler = useCallback(async () => {
    try {
      await enrollNote(userId, note, noteTitle);
      alert('노트 등록에 성공했습니다!');

      setNoteState(NoteState.note);
      setTitle(noteTitle);
      setContent(note);
      requestFirstNote();
    } catch (err) {
      console.log(err);
      alert('노트 등록에 실패했습니다!');
    }
  }, [noteTitle, note, userId, setNoteState, setTitle, setContent, requestFirstNote]);

  const onModifyHandler = useCallback(async () => {
    try {
      if (noteId) {
        await modifyNote(noteId, note, noteTitle);
        alert('노트 수정에 성공했습니다!');

        setNoteState(NoteState.note);
        setTitle(noteTitle);
        setContent(note);
      }
    } catch (err) {
      console.log(err);
      alert('노트 수정에 실패했습니다!');
    }
  }, [noteTitle, note, setNoteState, setTitle, setContent, noteId]);

  const charClickHandler = (char: string) => {
    const currentCursorLocation = textAreaRef.current?.selectionStart as number;
    setNote(note.slice(0, currentCursorLocation - 1) + char + note.slice(currentCursorLocation));

    setOpen(false);
    setIsActiveSpanishKeyboard(false);

    setTimeout(() => {
      textAreaRef.current?.focus();
      textAreaRef.current?.setSelectionRange(currentCursorLocation + 1, currentCursorLocation);
    }, 0);
  };

  const onModalCloseHandler = () => {
    setOpen(false);
    setIsActiveSpanishKeyboard(false);

    const currentCursorLocation = textAreaRef.current?.selectionStart as number;

    setTimeout(() => {
      textAreaRef.current?.focus();
      textAreaRef.current?.setSelectionRange(currentCursorLocation + 1, currentCursorLocation);
    }, 0);
  };

  const keypressEventHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.ctrlKey && !e.metaKey) {
      if (TargetSpanishCharListForInput.includes(e.key)) {
        setOpen(true);
        setIsActiveSpanishKeyboard(false);
        setSpecialChar(e.key as keyof typeof SpanishConvertDict);
      } else if (e.key === SpanishKeyboardActivationKey && open) {
        textAreaRef?.current?.blur();
        setIsActiveSpanishKeyboard(true);
      } else {
        setOpen(false);
        setSpecialChar(null);
      }
    }
  };

  return (
    <section className='flex flex-col items-center w-full h-full'>
      <Input value={noteTitle} placeholder='제목' setValue={setNoteTitle} />
      <div className='flex gap-2 w-4/5 h-full relative'>
        <textarea
          ref={textAreaRef}
          className='w-full h-full rounded-md lg:w-1/2'
          value={note}
          onKeyDown={keypressEventHandler}
          onChange={(e) => setNote(e.target.value)}
        />
        {open && specialChar && (
          <SpanishKeyboard
            specialChar={specialChar}
            inputRef={textAreaRef}
            charClickHandler={charClickHandler}
            onClose={onModalCloseHandler}
            isActiveSpanishKeyboard={isActiveSpanishKeyboard}
          />
        )}
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
