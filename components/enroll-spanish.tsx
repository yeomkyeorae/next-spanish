'use client';

import { useState } from 'react';
import Input from './input';
import { enrollSpanish } from '@/service/spanish';

type Props = {
  type: 'words' | 'sentences';
  callback: () => void;
};

export default function EnrollSpanish({ type, callback }: Props) {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');

  const onClickHandler = async () => {
    try {
      await enrollSpanish(type, spanish, korean);

      setSpanish('');
      setKorean('');

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Input value={spanish} setValue={setSpanish} />
      <Input value={korean} setValue={setKorean} />
      <button onClick={onClickHandler}>추가</button>
    </>
  );
}
