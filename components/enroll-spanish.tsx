'use client';

import { useState } from 'react';
import Input from './input';
import { enrollSpanish } from '@/service/spanish';

type Props = {
  type: 'words' | 'sentences';
};

export default function EnrollSpanish({ type }: Props) {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');

  const onClickHandler = () => {
    enrollSpanish(type, spanish, korean)
      .then(() => {
        setSpanish('');
        setKorean('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Input value={spanish} setValue={setSpanish} />
      <Input value={korean} setValue={setKorean} />
      <button onClick={onClickHandler}>추가</button>
    </>
  );
}
