'use client';

import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';
import Input from '../common/Input';
import SpanishInput from './SpanishInput';
import Button from '../common/Button';
import SpanishKeyboard from '../keyboard/SpanishKeyboard';
import { enrollSpanish, modifySpanish } from '@/service/spanish';
import { useAuthContext } from '@/context/authContext';
import { SENTENCE_MAX_LENGTH, SpanishConvertDict } from '@/def';
import { EnrollMode, Spanish } from '@/types';

type Props = {
  type: 'word' | 'sentence';
  enrollCallback: (input: Spanish) => void;
  modifyCallback: (input: Spanish) => void;
  spanishLength: number;
  enrollMode: EnrollMode;
  setEnrollMode: Dispatch<SetStateAction<EnrollMode>>;
  modifyInfo?: {
    mId: string;
    mSpanish: string;
    mKorean: string;
  };
};

export default function EnrollSpanish({
  type,
  enrollCallback,
  modifyCallback,
  spanishLength,
  enrollMode,
  setEnrollMode,
  modifyInfo,
}: Props) {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');
  const [open, setOpen] = useState(false);
  const [specialChar, setSpecialChar] = useState<keyof typeof SpanishConvertDict | null>(null);
  const [isActiveSpanishKeyboard, setIsActiveSpanishKeyboard] = useState(false);
  const { user } = useAuthContext();
  const userId = user!.uid;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (enrollMode === 'Modify') {
      if (modifyInfo) {
        setSpanish(modifyInfo.mSpanish);
        setKorean(modifyInfo.mKorean);
      }
    } else {
      setSpanish('');
      setKorean('');
    }
  }, [enrollMode, modifyInfo]);

  const checkInvalidInput = () => {
    if (spanish.trim() === '' || korean.trim() === '') {
      alert('단어를 입력해 주세요!');
      return false;
    }
    return true;
  };

  const enrollHandler = async () => {
    try {
      if (!checkInvalidInput()) {
        return;
      }

      if (spanishLength === SENTENCE_MAX_LENGTH) {
        alert(`등록할 수 있는 알파벳별 단어 및 전체 문장의 개수는 ${SENTENCE_MAX_LENGTH}개를 넘을 수 없습니다!`);
        return;
      }

      const id = await enrollSpanish(userId, type, spanish, korean);

      setSpanish('');
      setKorean('');

      if (enrollCallback) {
        enrollCallback({ id, spanish, korean });
      }

      alert(`${type === 'sentence' ? '문장' : '단어'} 등록이 완료되었습니다!`);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelHandler = () => {
    setSpanish('');
    setKorean('');
    setEnrollMode('Enroll');
  };

  const modifyHandler = async () => {
    if (!checkInvalidInput()) {
      return;
    }

    if (enrollMode === 'Modify' && modifyInfo) {
      const { mId } = modifyInfo;
      try {
        await modifySpanish(type, mId, spanish, korean);

        if (modifyCallback) {
          modifyCallback({ id: mId, spanish, korean });
        }

        alert(`${type === 'sentence' ? '문장' : '단어'} 수정이 완료되었습니다!`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const charClickHandler = (char: string) => {
    const currentCursorLocation = inputRef.current?.selectionStart as number;
    setSpanish(spanish.slice(0, currentCursorLocation - 1) + char + spanish.slice(currentCursorLocation));

    setOpen(false);
    setIsActiveSpanishKeyboard(false);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(currentCursorLocation + 1, currentCursorLocation);
    }, 0);
  };

  const onModalCloseHandler = () => {
    setOpen(false);
    setIsActiveSpanishKeyboard(false);

    const currentCursorLocation = inputRef.current?.selectionStart as number;

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(currentCursorLocation + 1, currentCursorLocation);
    }, 0);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='relative'>
        <SpanishInput
          value={spanish}
          placeholder='Español'
          setValue={setSpanish}
          inputRef={inputRef}
          open={open}
          setOpen={(isOpen) => setOpen(isOpen)}
          setSpecialChar={setSpecialChar}
          setIsActiveSpanishKeyboard={setIsActiveSpanishKeyboard}
        />
        {open && specialChar && (
          <SpanishKeyboard
            specialChar={specialChar}
            inputRef={inputRef}
            charClickHandler={charClickHandler}
            onClose={onModalCloseHandler}
            isActiveSpanishKeyboard={isActiveSpanishKeyboard}
          />
        )}
      </div>
      <Input value={korean} placeholder='한국어' setValue={setKorean} />
      <div className='flex'>
        {enrollMode === 'Enroll' ? (
          <Button text='추가' btnBgColor='bg-orange' onClickHandler={enrollHandler} />
        ) : (
          <div className='flex gap-2'>
            <Button text='수정' btnBgColor='bg-carrot' onClickHandler={modifyHandler} />
            <Button text='취소' onClickHandler={() => cancelHandler()} />
          </div>
        )}
      </div>
    </div>
  );
}
