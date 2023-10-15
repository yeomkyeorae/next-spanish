'use client';

import { useState } from 'react';
import Input from './input';
import Button from './button';
import { enrollSpanish } from '@/service/spanish';
import SpecialKeyboard from './special-keyboard';

type Props = {
  type: 'word' | 'sentence';
  callback: () => void;
};

export default function EnrollSpanish({ type, callback }: Props) {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');

  const onClickHandler = async () => {
    try {
      const userId = 'MKj0cg3e5dZuqA3cKfHGQmdQX2K2';
      await enrollSpanish(userId, type, spanish, korean);

      setSpanish('');
      setKorean('');

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const charClickHandler = (char: string) => {
    setSpanish(spanish + char);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex justify-center'>
        <Input value={spanish} placeholder='Español' setValue={setSpanish} />
        <Input value={korean} placeholder='한국어' setValue={setKorean} />
      </div>
      <SpecialKeyboard charClickHandler={charClickHandler} accentClickHandler={() => {}} />
      <Button text='추가' onClickHandler={onClickHandler} />
    </div>
  );
}
