'use client';

import { useCallback, useEffect, useState } from 'react';
import Divider from '../common/Divider';
import EnrollAdditionalWordInfo from './EnrollAdditionalWordInfo';
import AdditionWordInfoList from './AdditionalWordInfoList';
import { deleteWordInfo, getWordInfos } from '@/service/spanish';
import { useAuthContext } from '@/context/authContext';
import { WordInfo } from '@/types';

interface Props {
  modalWordInfo: {
    wordId: string;
    spanish: string;
    korean: string;
  };
}

export default function WordInfoContent({ modalWordInfo }: Props) {
  const [wordInfos, setWordInfos] = useState<WordInfo[]>([]);
  const { user } = useAuthContext();

  const fetchWordInfos = useCallback(async () => {
    const userId = user?.uid;

    const { wordId } = modalWordInfo;

    if (userId && wordId) {
      const response = await getWordInfos(userId, wordId);
      const newWordInfos: WordInfo[] = [];

      response.forEach((doc) => {
        const data = doc.data();

        newWordInfos.push({
          id: doc.id,
          spanish: data.spanish,
          explanation: data.explanation,
        });
      });

      setWordInfos(newWordInfos);
    }
  }, [modalWordInfo, user]);

  const removeWordInfo = useCallback(
    async (wordId: string) => {
      if (wordId) {
        const ok = confirm('단어 추가 정보를 삭제하시겠습니까?');

        if (ok) {
          try {
            await deleteWordInfo(wordId);
            fetchWordInfos();

            alert('단어 추가 정보가 삭제되었습니다!');
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
    [fetchWordInfos],
  );

  useEffect(() => {
    fetchWordInfos();
  }, [modalWordInfo.wordId, fetchWordInfos]);

  return (
    <section className='flex flex-col w-full overflow-y-auto'>
      <span>
        {modalWordInfo.spanish} - {modalWordInfo.korean}
      </span>
      <Divider />
      <EnrollAdditionalWordInfo wordId={modalWordInfo.wordId} fetchWordInfos={fetchWordInfos} />
      <Divider />
      <AdditionWordInfoList data={wordInfos} removeWordInfo={removeWordInfo} />
    </section>
  );
}
