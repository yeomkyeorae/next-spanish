'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish, EnrollMode, ModifyInfo } from '@/types';
import EnrollSpanish from '../enroll-spanish';
import { getSentences } from '@/service/spanish';
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
      const spanish = await getSentences(userId, '', SENTENCE_MAX_LENGTH);
      setSentences(spanish);
      setEnrollMode('Enroll');
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
      {sentences.length > 0 ? (
        <ul>
          {sentences.map((word, index) => (
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
      ) : (
        <section className='flex justify-center text-white text-xl p-4'>
          <div>등록된 문장이 없습니다!</div>
        </section>
      )}
    </div>
  );
}
