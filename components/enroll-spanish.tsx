'use client';

import { useRef, useState } from 'react';
import Input from './input';
import Button from './button';
import { enrollSpanish } from '@/service/spanish';
import SpecialKeyboard from './special-keyboard';
import { useAuthContext } from '@/context/authContext';
import { SENTENCE_MAX_LENGTH } from '@/def';

type Props = {
  type: 'word' | 'sentence';
  callback: () => void;
  spanishLength: number;
};

export default function EnrollSpanish({ type, callback, spanishLength }: Props) {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');
  const { user } = useAuthContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = async () => {
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
      }
    } catch (err) {
      console.log(err);
    }
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
      <Button text='추가' onClickHandler={onClickHandler} />
    </div>
  );
}
