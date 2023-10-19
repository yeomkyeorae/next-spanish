'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish } from '@/types';
import DeleteSpanish from '../delete-spanish';
import EnrollSpanish from '../enroll-spanish';
import { getSpanish } from '@/service/spanish';
import Alfabeto from './alfabeto';
import { WORD_REPRESENTS } from '@/def';
import { useAuthContext } from '@/context/authContext';

type Props = {
  limitNumber?: number;
  canDeleteSpanish?: boolean;
  canAddSpanish?: boolean;
  canSortSpanish?: boolean;
};

const Type = 'word';

export default function WordList({
  limitNumber,
  canDeleteSpanish = false,
  canAddSpanish = false,
  canSortSpanish = false,
}: Props) {
  const [words, setWords] = useState<Spanish[]>([]);
  const [startAtChar, setStartAtChar] = useState(canSortSpanish ? WORD_REPRESENTS[0] : '');
  const { user } = useAuthContext();

  const requestSpanish = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const spanish = await getSpanish(userId, Type, startAtChar, limitNumber ?? undefined);
      setWords(spanish);
    }
  }, [limitNumber, startAtChar, user]);

  useEffect(() => {
    requestSpanish();
  }, [requestSpanish]);

  return (
    <div>
      {canAddSpanish && <EnrollSpanish type={Type} callback={requestSpanish} />}
      {canSortSpanish && (
        <ul className='flex gap-2 my-4'>
          {WORD_REPRESENTS.map((word, index) => (
            <Alfabeto key={index} word={word} onClickHandler={() => setStartAtChar(word)} />
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
