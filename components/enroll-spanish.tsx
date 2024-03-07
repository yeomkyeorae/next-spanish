'use client';

import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';
import Input from './input';
import Button from './button';
import { enrollSpanish, modifySpanish } from '@/service/spanish';
import SpecialKeyboard from './special-keyboard';
import { useAuthContext } from '@/context/authContext';
import { SENTENCE_MAX_LENGTH } from '@/def';
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
  const { user } = useAuthContext();

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

      const userId = user?.uid;
      if (userId) {
        const id = await enrollSpanish(userId, type, spanish, korean);

        setSpanish('');
        setKorean('');

        if (enrollCallback) {
          enrollCallback({ id, spanish, korean });
        }

        alert(`${type === 'sentence' ? '문장' : '단어'} 등록이 완료되었습니다!`);
      }
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
    setSpanish(spanish.slice(0, currentCursorLocation) + char + spanish.slice(currentCursorLocation));

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(currentCursorLocation + 1, currentCursorLocation + 1);
    }, 0);
  };

  return (
    <div className='flex flex-col items-center'>
      <Input value={spanish} placeholder='Español' setValue={setSpanish} inputRef={inputRef} />
      <SpecialKeyboard charClickHandler={charClickHandler} />
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
