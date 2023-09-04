'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/input';
import { enrollSentence, getSentences } from '@/service/sentence';
import { Sentence } from '@/types';

export default function SentenceList() {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');
  const [sentences, setSentences] = useState<Sentence[]>([]);

  const onClickHandler = () => {
    try {
      enrollSentence(spanish, korean);

      setSentences(sentences.concat({ spanish, korean }));
      setSpanish('');
      setKorean('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSentences()
      .then((sentences) => setSentences(sentences))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Input value={spanish} setValue={setSpanish} />
      <Input value={korean} setValue={setKorean} />
      <button onClick={onClickHandler}>추가</button>
      {sentences &&
        sentences.map((sentences, index) => (
          <li key={index}>
            {sentences.spanish} - {sentences.korean}
          </li>
        ))}
    </div>
  );
}
