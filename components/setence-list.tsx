'use client';

import { useState, useEffect } from 'react';
import { getSpanish } from '@/service/spanish';
import { Spanish } from '@/types';

type Props = {
  limitNumber?: number;
};

export default function SentenceList({ limitNumber }: Props) {
  const [sentences, setSentences] = useState<Spanish[]>([]);

  useEffect(() => {
    getSpanish('sentences', limitNumber ?? 0)
      .then((sentences) => setSentences(sentences))
      .catch((err) => console.log(err));
  }, [limitNumber]);

  return (
    <div>
      {sentences &&
        sentences.map((sentences, index) => (
          <li key={index}>
            {sentences.spanish} - {sentences.korean}
          </li>
        ))}
    </div>
  );
}
