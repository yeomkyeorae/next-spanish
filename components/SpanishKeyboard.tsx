'use client';

import { useEffect, useCallback, RefObject, useState } from 'react';
import { SpanishConvertDict } from '@/def';

type Props = {
  specialChar: keyof typeof SpanishConvertDict;
  inputRef: RefObject<HTMLInputElement>;
  charClickHandler: (char: string) => void;
  onClose: () => void;
  isActiveSpanishKeyboard: boolean;
};

export default function SpanishKeyboard({ specialChar, onClose, charClickHandler, isActiveSpanishKeyboard }: Props) {
  const [current, setCurrent] = useState(-1);

  const escKeydownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (isActiveSpanishKeyboard) {
        if (e.key === 'ArrowRight') {
          if (0 <= current && current < SpanishConvertDict[specialChar].length - 1) {
            setCurrent(current + 1);
          }
        } else if (e.key === 'ArrowLeft') {
          if (0 < current) {
            setCurrent(current - 1);
          }
        } else if (e.key === 'Enter') {
          charClickHandler(SpanishConvertDict[specialChar][current]);
        } else if (e.key === 'Escape') {
          onClose();
        }
      }
    },
    [isActiveSpanishKeyboard, onClose, current, setCurrent, specialChar, charClickHandler],
  );

  useEffect(() => {
    if (isActiveSpanishKeyboard) {
      setCurrent(0);
    } else {
      setCurrent(-1);
    }
    return () => setCurrent(-1);
  }, [isActiveSpanishKeyboard]);

  useEffect(() => {
    window.addEventListener('keydown', escKeydownHandler);
    return () => window.removeEventListener('keydown', escKeydownHandler);
  }, [escKeydownHandler]);

  return (
    <div className='absolute z-10 bottom-12 h-12 w-20 rounded-lg'>
      <div className='flex justify-center items-center bg-gray-500 opacity-80 text-white rounded-lg h-full'>
        <div className='w-full h-full flex'>
          {SpanishConvertDict[specialChar].map((ch, index) => {
            const style =
              'w-full h-full flex justify-center items-center cursor-pointer hover:bg-highFever ' +
              (index === current ? 'bg-highFever' : 'bg-gray-500');

            return (
              <div key={`specialKeyboard` + ch} className={style} onClick={() => charClickHandler(ch)}>
                {ch}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
