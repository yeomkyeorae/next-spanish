'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish, EnrollMode, ModifyInfo } from '@/types';
import EnrollSpanish from './EnrollSpanish';
import { getWords } from '@/service/spanish';
import Alfabeto from './Alfabeto';
import { WORD_REPRESENTS } from '@/def';
import { useAuthContext } from '@/context/authContext';
import Word from './Word';
import Divider from '../common/Divider';
import { WORD_MAX_LENGTH } from '@/def';

type Props = {
  canSortSpanish?: boolean;
};

const Type = 'word';

export default function WordList({ canSortSpanish = false }: Props) {
  const [words, setWords] = useState<Spanish[]>([]);
  const [startAtChar, setStartAtChar] = useState(canSortSpanish ? [WORD_REPRESENTS[0]] : []);
  const [enrollMode, setEnrollMode] = useState<EnrollMode>('Enroll');
  const [modifyInfo, setModifyInfo] = useState<ModifyInfo>({ mId: '', mSpanish: '', mKorean: '' });

  const { user } = useAuthContext();

  const requestSpanish = useCallback(async () => {
    const userId = user?.uid;

    if (userId) {
      let spanishList: Spanish[] = [];
      for (let i = 0; i < startAtChar.length; i++) {
        const spanish = await getWords(userId, startAtChar[i], WORD_MAX_LENGTH);

        spanishList = spanishList.concat(spanish);
      }

      setWords(spanishList);
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
    <div className='w-4/5'>
      <EnrollSpanish
        type={Type}
        enrollCallback={requestSpanish}
        modifyCallback={requestSpanish}
        spanishLength={words.length}
        enrollMode={enrollMode}
        setEnrollMode={setEnrollMode}
        modifyInfo={modifyInfo}
      />
      <Divider />
      {canSortSpanish && (
        <ul className='flex flex-wrap justify-center gap-2 my-4 px-4'>
          {WORD_REPRESENTS.map((word, index) => {
            const startAtChars: string[] = [word];

            if (word === 'a') {
              startAtChars.push('á');
            } else if (word === 'e') {
              startAtChars.push('é');
            } else if (word === 'i') {
              startAtChars.push('í');
            } else if (word === 'o') {
              startAtChars.push('ó');
            } else if (word === 'u') {
              startAtChars.push('ú');
            }

            return <Alfabeto key={index} word={word} onClickHandler={() => setStartAtChar(startAtChars)} />;
          })}
        </ul>
      )}
      {words.length > 0 ? (
        <section className='flex flex-col items-center'>
          <ul className='w-1/3'>
            {words.map((word, index) => (
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
        </section>
      ) : (
        <section className='flex justify-center text-white text-xl p-4'>
          <div>등록된 단어가 없습니다!</div>
        </section>
      )}
    </div>
  );
}
