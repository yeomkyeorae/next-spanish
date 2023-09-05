'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish } from '@/types';
import DeleteSpanish from './delete-spanish';
import EnrollSpanish from './enroll-spanish';
import { getSpanish } from '@/service/spanish';

type Props = {
  type: 'words' | 'sentences';
  limitNumber?: number;
  canDeleteSpanish?: boolean;
};

export default function SpanishList({ type, limitNumber, canDeleteSpanish = false }: Props) {
  const [words, setWords] = useState<Spanish[]>([]);

  const requestSpanish = useCallback(async () => {
    const spanish = await getSpanish(type, limitNumber ?? undefined);
    setWords(spanish);
  }, [type, limitNumber]);

  useEffect(() => {
    requestSpanish();
  }, [requestSpanish]);

  return (
    <div>
      <EnrollSpanish type={type} callback={requestSpanish} />
      <ul>
        {words &&
          words.map((word, index) => (
            <li key={index} className='flex'>
              {word.spanish} - {word.korean}{' '}
              {canDeleteSpanish && <DeleteSpanish type={type} id={word.id} callback={requestSpanish} />}
            </li>
          ))}
      </ul>
    </div>
  );
}
