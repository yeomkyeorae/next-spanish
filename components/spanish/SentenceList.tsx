'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish, EnrollMode, ModifyInfo } from '@/types';
import EnrollSpanish from './EnrollSpanish';
import { getFirstSentences, getNextSentences } from '@/service/spanish';
import { useAuthContext } from '@/context/authContext';
import Divider from '../common/Divider';
import Sentence from './Sentence';
import Button from '../common/Button';
import { SENTENCE_PER_PAGE } from '@/def';

const Type = 'sentence';

export default function SentenceList() {
  const [lastSentence, setLastSentence] = useState<any>(null);
  const [sentences, setSentences] = useState<Spanish[]>([]);
  const [enrollMode, setEnrollMode] = useState<EnrollMode>('Enroll');
  const [modifyInfo, setModifyInfo] = useState<ModifyInfo>({ mId: '', mSpanish: '', mKorean: '' });

  const { user } = useAuthContext();

  const modifyClickHandler = (id: string, spanish: string, korean: string) => {
    setModifyInfo({
      mId: id,
      mSpanish: spanish,
      mKorean: korean,
    });
    setEnrollMode('Modify');

    window.scrollTo(0, 0);
  };

  const enrollCallback = (newSentence: Spanish) => {
    setSentences([newSentence, ...sentences]);
  };

  const modifyCallback = (modifiedSentence: Spanish) => {
    const { id } = modifiedSentence;
    setSentences(
      sentences.map((el) => {
        if (el.id === id) {
          return modifiedSentence;
        } else {
          return el;
        }
      }),
    );

    setEnrollMode('Enroll');
  };

  const deleteCallback = (id: string) => {
    setSentences(sentences.filter((el) => el.id !== id));
  };

  const requestFirstNote = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const firstSentences = await getFirstSentences(userId, SENTENCE_PER_PAGE);
      setLastSentence(firstSentences[firstSentences.length - 1]);

      const newSentences: Spanish[] = [];
      firstSentences.forEach((doc) => {
        const data = doc.data();

        newSentences.push({
          id: doc.id,
          spanish: data.spanish,
          korean: data.korean,
        });
      });

      setSentences(sentences.concat(newSentences));
    }
  }, [user, sentences]);

  const requestNextNote = useCallback(async () => {
    const userId = user?.uid;

    if (userId && lastSentence) {
      const nextSentences = await getNextSentences(userId, lastSentence, SENTENCE_PER_PAGE);

      if (nextSentences) {
        setLastSentence(nextSentences[nextSentences.length - 1]);

        const newSentences: Spanish[] = [];
        nextSentences.forEach((doc) => {
          const data = doc.data();

          newSentences.push({
            id: doc.id,
            spanish: data.spanish,
            korean: data.korean,
          });
        });

        setSentences(sentences.concat(newSentences));
      } else {
        alert('다음 문장들이 없습니다!');
      }
    }
  }, [user, sentences, lastSentence]);

  useEffect(() => {
    requestFirstNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className='w-4/5'>
      <EnrollSpanish
        type={Type}
        enrollCallback={enrollCallback}
        modifyCallback={modifyCallback}
        spanishLength={sentences.length}
        enrollMode={enrollMode}
        setEnrollMode={setEnrollMode}
        modifyInfo={modifyInfo}
      />
      <Divider />
      {sentences.length > 0 ? (
        <section className='flex flex-col items-center mb-2'>
          <ul className='w-full md:w-2/3'>
            {sentences.map((word, index) => (
              <Sentence key={index} word={word} modifyCallback={modifyClickHandler} deleteCallback={deleteCallback} />
            ))}
          </ul>
          <Button text='더보기' btnBgColor='bg-orange' onClickHandler={requestNextNote} />
        </section>
      ) : (
        <section className='flex justify-center text-white text-xl p-4'>
          <div>등록된 문장이 없습니다!</div>
        </section>
      )}
    </div>
  );
}
