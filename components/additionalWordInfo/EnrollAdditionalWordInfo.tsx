'use client';

import { FaPlus } from 'react-icons/fa';
import Input from '../common/Input';
import { useRef, useState } from 'react';
import SpanishInput from '../spanish/SpanishInput';
import SpanishKeyboard from '../keyboard/SpanishKeyboard';
import { SpanishConvertDict } from '@/def';
import Button from '../common/Button';
import { useAuthContext } from '@/context/authContext';
import { enrollWordInfo } from '@/service/spanish';

interface Props {
  wordId: string;
}

export default function EnrollAdditionalWordInfo({ wordId }: Props) {
  const [openInputs, setOpenInputs] = useState(false);
  const [spanish, setSpanish] = useState('');
  const [explanation, setExplanation] = useState('');
  const [open, setOpen] = useState(false);
  const [specialChar, setSpecialChar] = useState<keyof typeof SpanishConvertDict | null>(null);
  const [isActiveSpanishKeyboard, setIsActiveSpanishKeyboard] = useState(false);
  const { user } = useAuthContext();

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
      const userId = user?.uid;
      if (userId && wordId) {
        await enrollWordInfo(userId, wordId, spanish, explanation);
        setSpanish('');
        setExplanation('');
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div className='flex flex-col justify-center'>
      {!openInputs && (
        <div className='flex hover:text-carrot cursor-pointer' onClick={() => setOpenInputs(!openInputs)}>
          <span>변화형 추가하기</span>
          <div className='flex items-center'>
            <FaPlus className='text-yellow-400' />
          </div>
        </div>
      )}
      {openInputs && (
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
            <Button text='추가' btnBgColor='bg-orange' onClickHandler={enrollAdditionWordInfo} />
            <Button text='닫기' onClickHandler={() => setOpenInputs(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
