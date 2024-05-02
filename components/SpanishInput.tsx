import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';
import { TargetSpanishCharListForInput, SpanishConvertDict } from '@/def';

interface ISpanishInput {
  value: string;
  placeholder: string;
  setValue?: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSpecialChar: Dispatch<SetStateAction<keyof typeof SpanishConvertDict | null>>;
  setIsActiveSpanishKeyboard: Dispatch<SetStateAction<boolean>>;
}

const PossibleOtherKeys = ['ArrowUp'];

export default function SpanishInput({
  value,
  placeholder,
  setValue,
  disabled,
  inputRef,
  setOpen,
  setSpecialChar,
  setIsActiveSpanishKeyboard,
}: ISpanishInput) {
  const keypressEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.ctrlKey && !e.metaKey) {
      if (TargetSpanishCharListForInput.includes(e.key) || PossibleOtherKeys.includes(e.key)) {
        if (PossibleOtherKeys.includes(e.key)) {
          inputRef?.current?.blur();
          setIsActiveSpanishKeyboard(true);
        } else {
          setOpen(true);
          setIsActiveSpanishKeyboard(false);
          setSpecialChar(e.key as keyof typeof SpanishConvertDict);
        }
      } else {
        setOpen(false);
        setSpecialChar(null);
      }
    } else {
      setOpen(false);
      setSpecialChar(null);
    }
  };

  return (
    <input
      value={value}
      onChange={(e) => {
        if (setValue) {
          setValue(e.target.value);
        }
      }}
      onKeyDown={keypressEventHandler}
      placeholder={placeholder}
      disabled={disabled ?? false}
      className={
        'w-72 m-1 pl-2 rounded-full border-1 border-black ' +
        (disabled ? 'bg-gray-600 text-stone-100' : 'bg-zinc-200 text-stone-900')
      }
      ref={inputRef}
    />
  );
}
