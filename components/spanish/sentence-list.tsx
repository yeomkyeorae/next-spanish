'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish } from '@/types';
import EnrollSpanish from '../enroll-spanish';
import { getSpanish } from '@/service/spanish';
import { useAuthContext } from '@/context/authContext';
import Divider from '../divider';
import Sentence from './sentence';
import { SENTENCE_MAX_LENGTH } from '@/def';

const Type = 'sentence';

export default function SentenceList() {
  const [sentences, setSentences] = useState<Spanish[]>([]);
  const { user } = useAuthContext();

  const requestSpanish = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const spanish = await getSpanish(userId, Type, '', SENTENCE_MAX_LENGTH);
      setSentences(spanish);
    }
  }, [user]);

  useEffect(() => {
    requestSpanish();
  }, [requestSpanish]);

  return (
    <div>
      <EnrollSpanish type={Type} callback={requestSpanish} spanishLength={sentences.length} />
      <Divider />
      <ul>
        {sentences &&
          sentences.map((word, index) => (
            <Sentence key={index} spanish={word.spanish} korean={word.korean} id={word.id} callback={requestSpanish} />
          ))}
      </ul>
    </div>
  );
}
