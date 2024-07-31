import { useCallback, useEffect, useState } from 'react';
import Divider from '../common/Divider';
import EnrollAdditionalWordInfo from './EnrollAdditionalWordInfo';
import AdditionWordInfoList from './AdditionalWordInfoList';
import { getWordInfos } from '@/service/spanish';
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

  useEffect(() => {
    fetchWordInfos();
  }, [modalWordInfo.wordId, fetchWordInfos]);

  return (
    <section className='flex flex-col w-full overflow-y-auto'>
      <span>
        {modalWordInfo.spanish} - {modalWordInfo.korean}
      </span>
      <Divider />
      <EnrollAdditionalWordInfo wordId={modalWordInfo.wordId} />
      <Divider />
      <AdditionWordInfoList data={wordInfos} />
    </section>
  );
}
