'use client';

import { useState } from "react";
import Input from "./input";
import axios from "axios";

const ToggleSourceContent: {[key: string]: string} = {
  'ko': 'es',
  'es': 'ko'
};

export default function Papago() {
  const [toggleSource, setToggleSource] = useState('ko');
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  
  const toggleHandler = () => {
    setToggleSource(ToggleSourceContent[toggleSource]);
  }

  const translateHandler = async () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const clientKey = process.env.NEXT_PUBLIC_NAVER_CLIENT_KEY;

    if(clientId && clientKey) {
      const headers = {
        "Content-Type": "application/json",
        "X-NCP-APIGW-API-KEY-ID": clientId,
        "X-NCP-APIGW-API-KEY": clientKey,
      };

      try {
        const response = await axios.post('/nmt/v1/translation', {
          source: toggleSource,
          target: ToggleSourceContent[toggleSource],
          text: sourceText
        }, {
          headers
        });

        if(response.data.message.result.translatedText) {
          const result = response.data.message.result.translatedText;
          if(result) {
            setTargetText(result);
          } else {

          }
        }        

      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      papago!
      <button onClick={toggleHandler}>toggle {toggleSource} -- {ToggleSourceContent[toggleSource]}</button>
      <Input value={sourceText} setValue={setSourceText} />
      <Input value={targetText} disabled={true} />
      <button onClick={translateHandler}>번역</button>
    </div>
  );
}