'use client';

import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';
import Input from './input';
import Button from './button';
import { enrollSpanish } from '@/service/spanish';
import SpecialKeyboard from './special-keyboard';
import { useAuthContext } from '@/context/authContext';
import { SENTENCE_MAX_LENGTH } from '@/def';
import { EnrollMode } from '@/types';

type Props = {
  type: 'word' | 'sentence';
  callback: () => void;
  spanishLength: number;
  enrollMode: EnrollMode;
  setEnrollMode: Dispatch<SetStateAction<EnrollMode>>;
  modifyInfo?: {
    mId: string;
    mSpanish: string;
    mKorean: string;
  };
};

export default function EnrollSpanish({ type, callback, spanishLength, enrollMode, setEnrollMode, modifyInfo }: Props) {
  const [spanish, setSpanish] = useState(modifyInfo?.mSpanish ?? '');
  const [korean, setKorean] = useState(modifyInfo?.mKorean ?? '');
  const { user } = useAuthContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (enrollMode === 'Modify') {
      if (modifyInfo) {
        setSpanish(modifyInfo.mSpanish);
        setKorean(modifyInfo.mKorean);
      }
    }
  }, [enrollMode, modifyInfo]);

  const enrollHandler = async () => {
    try {
      if (spanishLength === SENTENCE_MAX_LENGTH) {
        alert(`등록할 수 있는 알파벳별 단어 및 전체 문장의 개수는 ${SENTENCE_MAX_LENGTH}개를 넘을 수 없습니다!`);
        return;
      }

      const userId = user?.uid;
      if (userId) {
        await enrollSpanish(userId, type, spanish, korean);

        setSpanish('');
        setKorean('');

        if (callback) {
          callback();
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

  const charClickHandler = (char: string) => {
    const currentCursorLocation = inputRef.current?.selectionStart as number;
    setSpanish(spanish.slice(0, currentCursorLocation) + char + spanish.slice(currentCursorLocation));
    inputRef.current?.focus();
  };

  return (
    <div className='flex flex-col items-center'>
      <Input value={spanish} placeholder='Español' setValue={setSpanish} inputRef={inputRef} />
      <SpecialKeyboard charClickHandler={charClickHandler} />
      <Input value={korean} placeholder='한국어' setValue={setKorean} />
      <div className='flex'>
        {enrollMode === 'Enroll' ? (
          <Button text='추가' onClickHandler={enrollHandler} />
        ) : (
          <div className='flex gap-2'>
            <Button text='수정' btnBgColor='bg-carrot' onClickHandler={() => {}} />
            <Button text='취소' btnBgColor='bg-carrot' onClickHandler={() => cancelHandler()} />
          </div>
        )}
      </div>
    </div>
  );
}
