'use client';

import { useState, useEffect } from 'react';
import { getSpanish } from '@/service/spanish';
import { Spanish } from '@/types';

type Props = {
  type: 'words' | 'sentences';
  limitNumber?: number;
};

export default function SpanishList({ type, limitNumber }: Props) {
  const [words, setWords] = useState<Spanish[]>([]);

  useEffect(() => {
    getSpanish(type, limitNumber ?? undefined)
      .then((words) => setWords(words))
      .catch((err) => console.log(err));
  }, [type, limitNumber]);

  return (
    <div>
      {words &&
        words.map((words, index) => (
          <li key={index}>
            {words.spanish} - {words.korean}
          </li>
        ))}
    </div>
  );
}
