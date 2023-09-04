'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/input';
import { enrollWord, getWords } from '@/service/word';
import { Word } from '@/types';

export default function WordList() {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');
  const [words, setWords] = useState<Word[]>([]);

  const onClickHandler = () => {
    try {
      enrollWord(spanish, korean);

      setWords(words.concat({ spanish, korean }));
      setSpanish('');
      setKorean('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWords()
      .then((words) => setWords(words))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Input value={spanish} setValue={setSpanish} />
      <Input value={korean} setValue={setKorean} />
      <button onClick={onClickHandler}>추가</button>
      {words &&
        words.map((words, index) => (
          <li key={index}>
            {words.spanish} - {words.korean}
          </li>
        ))}
    </div>
  );
}
