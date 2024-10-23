'use client';

import Input from '../common/Input';
import { SetStateAction, Dispatch, useRef, useState } from 'react';
import SpanishInput from '../spanish/SpanishInput';
import SpanishKeyboard from '../keyboard/SpanishKeyboard';
import { SpanishConvertDict } from '@/def';
import Button from '../common/Button';
import { useAuthContext } from '@/context/authContext';
import { enrollWordInfo } from '@/service/spanish';

interface Props {
  wordId: string;
  fetchWordInfos: () => void;
  enrollType?: '추가' | '수정';
  inputs: {
    spanish: string;
    setSpanish: Dispatch<SetStateAction<string>>;
    explanation: string;
    setExplanation: Dispatch<SetStateAction<string>>;
    modifyTargetId: string;
  };
  cancelModification: () => void;
  changeWordInfo: (modifyTargetId: string, spanish: string, explanation: string) => void;
}

export default function EnrollAdditionalWordInfo({
  wordId,
  fetchWordInfos,
  enrollType = '추가',
  inputs,
  cancelModification,
  changeWordInfo,
}: Props) {
  const { spanish, setSpanish, explanation, setExplanation, modifyTargetId } = inputs;
  const [open, setOpen] = useState(false);
  const [specialChar, setSpecialChar] = useState<keyof typeof SpanishConvertDict | null>(null);
  const [isActiveSpanishKeyboard, setIsActiveSpanishKeyboard] = useState(false);
  const { user } = useAuthContext();
  const userId = user!.uid;

  const inputRef = useRef<HTMLInputElement>(null);

  const charClickHandler = (char: string) => {
    const currentCursorLocation = inputRef.current?.selectionStart as number;
    setSpanish(spanish.slice(0, currentCursorLocation - 1) + char + spanish.slice(currentCursorLocation));

    setOpen(false);
    setIsActiveSpanishKeyboard(false);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(currentCursorLocation + 1, currentCursorLocation);
    }, 0);
  };

  const onModalCloseHandler = () => {
    setOpen(false);
    setIsActiveSpanishKeyboard(false);

    const currentCursorLocation = inputRef.current?.selectionStart as number;

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(currentCursorLocation + 1, currentCursorLocation);
    }, 0);
  };

  const enrollAdditionWordInfo = async () => {
    try {
      if (spanish && explanation && wordId) {
        await enrollWordInfo(userId, wordId, spanish, explanation);
        setSpanish('');
        setExplanation('');
        fetchWordInfos();

        alert('단어 추가 정보가 등록되었습니다!');
      } else {
        alert('입력 정보를 확인해 주세요!');
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex flex-col items-center'>
        <Input value={explanation} placeholder='변화형 구분' setValue={setExplanation} />
        <div className='relative'>
          <SpanishInput
            value={spanish}
            placeholder='Español'
            setValue={setSpanish}
            inputRef={inputRef}
            open={open}
            setOpen={(isOpen) => setOpen(isOpen)}
            setSpecialChar={setSpecialChar}
            setIsActiveSpanishKeyboard={setIsActiveSpanishKeyboard}
          />
          {open && specialChar && (
            <SpanishKeyboard
              specialChar={specialChar}
              inputRef={inputRef}
              charClickHandler={charClickHandler}
              onClose={onModalCloseHandler}
              isActiveSpanishKeyboard={isActiveSpanishKeyboard}
            />
          )}
        </div>
        <div className='flex gap-2'>
          {enrollType === '추가' ? (
            <Button text='추가' btnBgColor='bg-orange' onClickHandler={enrollAdditionWordInfo} />
          ) : (
            <>
              <Button
                text='수정'
                btnBgColor='bg-carrot'
                onClickHandler={() => changeWordInfo(modifyTargetId, spanish, explanation)}
              />
              <Button text='취소' onClickHandler={cancelModification} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
