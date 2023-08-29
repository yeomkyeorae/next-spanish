'use client';

import { useState } from 'react';
import Input from './input';
import Button from './button';
import axios from 'axios';

const ToggleSourceContent: { [key: string]: string } = {
  ko: 'es',
  es: 'ko',
};

const DisplaySourceTarget: { [key: string]: any } = {
  ko: '🇰🇷',
  es: '🇪🇸',
};

export default function Papago() {
  const [toggleSource, setToggleSource] = useState('ko');
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');

  const toggleHandler = () => {
    setToggleSource(ToggleSourceContent[toggleSource]);
    setSourceText('');
    setTargetText('');
  };

  const translateHandler = async () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const clientKey = process.env.NEXT_PUBLIC_NAVER_CLIENT_KEY;

    if (clientId && clientKey) {
      const headers = {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': clientKey,
      };

      try {
        const response = await axios.post(
          '/nmt/v1/translation',
          {
            source: toggleSource,
            target: ToggleSourceContent[toggleSource],
            text: sourceText,
          },
          {
            headers,
          },
        );

        if (response.data.message.result.translatedText) {
          const result = response.data.message.result.translatedText;
          if (result) {
            setTargetText(result);
          } else {
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <span>
        from {DisplaySourceTarget[toggleSource]} to {DisplaySourceTarget[ToggleSourceContent[toggleSource]]}
      </span>
      <div>
        <Button text='바꾸기' onClickHandler={toggleHandler} />
      </div>
      <div className='flex flex-col w-3/4'>
        <Input value={sourceText} setValue={setSourceText} title='입력' />
        <Input value={targetText} disabled={true} title='출력' />
      </div>
      <div>
        <Button text='번역' onClickHandler={translateHandler} />
      </div>
    </div>
  );
}
