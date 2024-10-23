'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spanish, EnrollMode, ModifyInfo } from '@/types';
import EnrollSpanish from './EnrollSpanish';
import { changeStarChecked, getWords } from '@/service/spanish';
import Alfabeto from './Alfabeto';
import { WORD_REPRESENTS } from '@/def';
import { useAuthContext } from '@/context/authContext';
import Word from './Word';
import Divider from '../common/Divider';
import { WORD_MAX_LENGTH } from '@/def';
import Modal from '../common/Modal';
import WordInfoContent from '../additionalWordInfo/WordInfoContent';
import Star from '../common/icons/Star';

type Props = {
  canSortSpanish?: boolean;
};

const Type = 'word';

export default function WordList({ canSortSpanish = false }: Props) {
  const [words, setWords] = useState<Spanish[]>([]);
  const [startAtChar, setStartAtChar] = useState(canSortSpanish ? [WORD_REPRESENTS[0]] : []);
  const [enrollMode, setEnrollMode] = useState<EnrollMode>('Enroll');
  const [modifyInfo, setModifyInfo] = useState<ModifyInfo>({ mId: '', mSpanish: '', mKorean: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalWordInfo, setModalWordInfo] = useState({ wordId: '', spanish: '', korean: '' });
  const [onlyStarChecked, setOnlyStarChekced] = useState(true);
  const { user } = useAuthContext();
  const userId = user!.uid;

  const requestSpanish = useCallback(async () => {
    let spanishList: Spanish[] = [];
    for (let i = 0; i < startAtChar.length; i++) {
      const spanish = await getWords(userId, startAtChar[i], WORD_MAX_LENGTH, onlyStarChecked);

      spanishList = spanishList.concat(spanish);
    }

    setWords(spanishList);
    setEnrollMode('Enroll');
  }, [startAtChar, userId, onlyStarChecked]);

  const modifyClickHandler = (id: string, spanish: string, korean: string) => {
    setModifyInfo({
      mId: id,
      mSpanish: spanish,
      mKorean: korean,
    });
    setEnrollMode('Modify');

    window.scrollTo(0, 0);
  };

  const openModal = (wordId: string, spanish: string, korean: string) => {
    setModalOpen(true);
    setModalWordInfo({ wordId, spanish, korean });
  };

  const changeStarState = async (id: string, starChecked: boolean) => {
    try {
      await changeStarChecked('word', id, starChecked);

      let newWords = words.map((word) => {
        if (word.id === id) {
          return { ...word, starChecked };
        }
        return word;
      });

      if (onlyStarChecked) {
        newWords = newWords.filter((word) => word.starChecked);
      }

      setWords(newWords);
    } catch (err) {
      console.log(err);
    }
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

            const isCurrentWordSelected = startAtChar.some((el) => startAtChars.includes(el));

            return (
              <Alfabeto
                key={index}
                word={word}
                isCurrentWordSelected={isCurrentWordSelected}
                onClickHandler={() => setStartAtChar(startAtChars)}
              />
            );
          })}
        </ul>
      )}
      <div className='flex justify-center my-2'>
        <div
          className={`flex items-center gap-1 cursor-pointer hover:text-yellow-400 hover:font-bold ${
            onlyStarChecked ? 'text-yellow-400' : 'text-slate-400'
          }`}
          onClick={() => setOnlyStarChekced(!onlyStarChecked)}
        >
          <Star />
          <span>별표만 보이기</span>
        </div>
      </div>
      {words.length > 0 ? (
        <section className='flex flex-col items-center'>
          <ul className='w-full md:w-1/2'>
            {words.map((word, index) => (
              <Word
                key={index}
                word={word}
                starChecked={word.starChecked ?? false}
                modifyCallback={modifyClickHandler}
                deleteCallback={requestSpanish}
                changeStarState={changeStarState}
                openModal={() => openModal(word.id, word.spanish, word.korean)}
              />
            ))}
          </ul>
        </section>
      ) : (
        <section className='flex justify-center text-white text-xl p-4'>
          <div>등록된 단어가 없습니다!</div>
        </section>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <WordInfoContent modalWordInfo={modalWordInfo} />
      </Modal>
    </div>
  );
}
