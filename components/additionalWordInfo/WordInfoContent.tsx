'use client';

import { useCallback, useEffect, useState } from 'react';
import Divider from '../common/Divider';
import EnrollAdditionalWordInfo from './EnrollAdditionalWordInfo';
import AdditionWordInfoList from './AdditionalWordInfoList';
import { deleteWordInfo, getWordInfos, modifyWordInfo } from '@/service/spanish';
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
  const [enrollType, setEnrollType] = useState<'추가' | '수정'>('추가');
  const [spanish, setSpanish] = useState('');
  const [explanation, setExplanation] = useState('');
  const [modifyTargetId, setModifyTargetId] = useState('');
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

  const changeWordInfo = useCallback(
    async (id: string, spanish: string, explanation: string) => {
      if (enrollType === '수정' && spanish && explanation) {
        const ok = confirm('단어 추가 정보를 수정하시겠습니까?');

        if (ok) {
          try {
            await modifyWordInfo(id, spanish, explanation);
            fetchWordInfos();

            alert('단어 추가 정보가 수정되었습니다!');

            initInputs();
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        alert('입력 정보를 확인해 주세요!');
      }
    },
    [enrollType, fetchWordInfos],
  );

  const initInputs = () => {
    setEnrollType('추가');
    setSpanish('');
    setExplanation('');
    setModifyTargetId('');
  };

  const changeEnrollModiType = useCallback(async (spanish: string, explanation: string, id: string) => {
    setEnrollType('수정');
    setSpanish(spanish);
    setExplanation(explanation);
    setModifyTargetId(id);
  }, []);

  const cancelModification = () => {
    initInputs();
  };

  useEffect(() => {
    fetchWordInfos();
  }, [modalWordInfo.wordId, fetchWordInfos]);

  return (
    <section className='flex flex-col w-full overflow-y-auto'>
      <span>
        {modalWordInfo.spanish} - {modalWordInfo.korean}
      </span>
      <Divider />
      <EnrollAdditionalWordInfo
        wordId={modalWordInfo.wordId}
        fetchWordInfos={fetchWordInfos}
        enrollType={enrollType}
        inputs={{ spanish, setSpanish, explanation, setExplanation, modifyTargetId }}
        cancelModification={cancelModification}
        changeWordInfo={changeWordInfo}
      />
      <Divider />
      <AdditionWordInfoList
        data={wordInfos}
        removeWordInfo={removeWordInfo}
        changeEnrollModiType={changeEnrollModiType}
      />
    </section>
  );
}
