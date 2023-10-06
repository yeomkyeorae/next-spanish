'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish } from '@/types';
import DeleteSpanish from '../delete-spanish';
import EnrollSpanish from '../enroll-spanish';
import { getSpanish } from '@/service/spanish';
import { WORD_REPRESENTS } from '@/def';

type Props = {
  limitNumber?: number;
  canDeleteSpanish?: boolean;
  canAddSpanish?: boolean;
  canSortSpanish?: boolean;
};

const Type = 'sentences';

export default function SentenceList({
  limitNumber,
  canDeleteSpanish = false,
  canAddSpanish = false,
  canSortSpanish = false,
}: Props) {
  const [words, setWords] = useState<Spanish[]>([]);
  const [startAtChar, setStartAtChar] = useState(canSortSpanish ? WORD_REPRESENTS[0] : '');

  const requestSpanish = useCallback(async () => {
    const spanish = await getSpanish(Type, startAtChar, limitNumber ?? undefined);
    setWords(spanish);
  }, [limitNumber, startAtChar]);

  useEffect(() => {
    requestSpanish();
  }, [requestSpanish]);

  return (
    <div>
      {canAddSpanish && <EnrollSpanish type={Type} callback={requestSpanish} />}
      {canSortSpanish && (
        <ul style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
          {WORD_REPRESENTS.map((word, index) => (
            <li key={index} onClick={() => setStartAtChar(word)}>
              {word}
            </li>
          ))}
        </ul>
      )}
      <ul>
        {words &&
          words.map((word, index) => (
            <li key={index} className='flex items-center'>
              {word.spanish} - {word.korean}{' '}
              {canDeleteSpanish && <DeleteSpanish type={Type} id={word.id} callback={requestSpanish} />}
            </li>
          ))}
      </ul>
    </div>
  );
}
