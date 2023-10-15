'use client';

import { useState } from 'react';
import { SPECIAL_ALFABETOS, SPECIAL_SIGN } from '@/def';

const keyboardStyle = 'w-8 h-8 border-2 border-gray-500 text-center';

type Props = {
  charClickHandler: (char: string) => void;
  accentClickHandler: () => void;
};

export default function SpecialKeyboard({ charClickHandler, accentClickHandler }: Props) {
  const [charType, setCharType] = useState<'Lowercase' | 'Uppercase'>('Lowercase');

  const changeCharType = () => {
    const newType = charType === 'Lowercase' ? 'Uppercase' : 'Lowercase';
    setCharType(newType);
  };

  return (
    <section>
      <ul className='flex gap-1 mb-1'>
        {SPECIAL_ALFABETOS[charType].map((char) => (
          <li key={char} className={keyboardStyle} onClick={() => charClickHandler(char)}>
            {char}
          </li>
        ))}
      </ul>
      <ul className='flex gap-1'>
        {SPECIAL_SIGN.map((char) => (
          <li key={char} className={keyboardStyle} onClick={() => charClickHandler(char)}>
            {char}
          </li>
        ))}
        <div>
          <button onClick={changeCharType} className='border-2 broder-solid rounded-md border-black mr-1'>
            대소문자 변환
          </button>
          <button className='border-2 broder-solid rounded-md border-black'>강세 주기</button>
        </div>
      </ul>
    </section>
  );
}
