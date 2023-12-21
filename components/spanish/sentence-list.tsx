'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish, EnrollMode, ModifyInfo } from '@/types';
import EnrollSpanish from '../enroll-spanish';
import { getSpanish } from '@/service/spanish';
import { useAuthContext } from '@/context/authContext';
import Divider from '../divider';
import Sentence from './sentence';
import { SENTENCE_MAX_LENGTH } from '@/def';

const Type = 'sentence';

export default function SentenceList() {
  const [sentences, setSentences] = useState<Spanish[]>([]);
  const [enrollMode, setEnrollMode] = useState<EnrollMode>('Enroll');
  const [modifyInfo, setModifyInfo] = useState<ModifyInfo>({ mId: '', mSpanish: '', mKorean: '' });

  const { user } = useAuthContext();

  const requestSpanish = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const spanish = await getSpanish(userId, Type, '', SENTENCE_MAX_LENGTH);
      setSentences(spanish);
    }
  }, [user]);

  const modifyClickHandler = (id: string, spanish: string, korean: string) => {
    setModifyInfo({
      mId: id,
      mSpanish: spanish,
      mKorean: korean,
    });
    setEnrollMode('Modify');

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    requestSpanish();
  }, [requestSpanish]);

  return (
    <div>
      <EnrollSpanish
        type={Type}
        callback={requestSpanish}
        spanishLength={sentences.length}
        enrollMode={enrollMode}
        setEnrollMode={setEnrollMode}
        modifyInfo={modifyInfo}
      />
      <Divider />
      <ul>
        {sentences &&
          sentences.map((word, index) => (
            <Sentence
              key={index}
              spanish={word.spanish}
              korean={word.korean}
              id={word.id}
              modifyCallback={modifyClickHandler}
              deleteCallback={requestSpanish}
            />
          ))}
      </ul>
    </div>
  );
}
