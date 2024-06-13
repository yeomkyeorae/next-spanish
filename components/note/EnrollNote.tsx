'use client';

import { Dispatch, SetStateAction, useCallback, useState, useRef, KeyboardEvent } from 'react';
import NoteMarkdown from './NoteMarkdown';
import { enrollNote, modifyNote } from '@/service/note';
import { useAuthContext } from '@/context/authContext';
import { NoteStateType } from '@/types';
import { NoteState, SpanishConvertDict, TargetSpanishCharListForInput, SpanishKeyboardActivationKey } from '@/def';
import Button from '../common/Button';
import SpanishKeyboard from '../keyboard/SpanishKeyboard';

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
  const [open, setOpen] = useState(false);
  const [specialChar, setSpecialChar] = useState<keyof typeof SpanishConvertDict | null>(null);
  const [isActiveSpanishKeyboard, setIsActiveSpanishKeyboard] = useState(false);
  const { user } = useAuthContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
    textAreaRef.current?.focus();
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
