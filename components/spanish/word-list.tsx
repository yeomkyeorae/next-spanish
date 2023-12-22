'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish, EnrollMode, ModifyInfo } from '@/types';
import EnrollSpanish from '../enroll-spanish';
import { getSpanish } from '@/service/spanish';
import Alfabeto from './alfabeto';
import { WORD_REPRESENTS } from '@/def';
import { useAuthContext } from '@/context/authContext';
import Word from './word';
import Divider from '../divider';
import { WORD_MAX_LENGTH } from '@/def';

type Props = {
  canSortSpanish?: boolean;
};

const Type = 'word';

export default function WordList({ canSortSpanish = false }: Props) {
  const [words, setWords] = useState<Spanish[]>([]);
  const [startAtChar, setStartAtChar] = useState(canSortSpanish ? WORD_REPRESENTS[0] : '');
  const [enrollMode, setEnrollMode] = useState<EnrollMode>('Enroll');
  const [modifyInfo, setModifyInfo] = useState<ModifyInfo>({ mId: '', mSpanish: '', mKorean: '' });

  const { user } = useAuthContext();

  const requestSpanish = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      const spanish = await getSpanish(userId, Type, startAtChar, WORD_MAX_LENGTH);
      setWords(spanish);
      setEnrollMode('Enroll');
    }
  }, [startAtChar, user]);

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
        spanishLength={words.length}
        enrollMode={enrollMode}
        setEnrollMode={setEnrollMode}
        modifyInfo={modifyInfo}
      />
      <Divider />
      {canSortSpanish && (
        <ul className='flex flex-wrap justify-center gap-2 my-4 px-4'>
          {WORD_REPRESENTS.map((word, index) => (
            <Alfabeto key={index} word={word} onClickHandler={() => setStartAtChar(word)} />
          ))}
        </ul>
      )}
      <ul className='flex flex-col items-center'>
        {words &&
          words.map((word, index) => (
            <Word
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
