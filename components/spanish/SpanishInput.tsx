import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';
import { TargetSpanishCharListForInput, SpanishConvertDict, SpanishKeyboardActivationKey } from '@/def';

interface ISpanishInput {
  value: string;
  placeholder: string;
  setValue?: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSpecialChar: Dispatch<SetStateAction<keyof typeof SpanishConvertDict | null>>;
  setIsActiveSpanishKeyboard: Dispatch<SetStateAction<boolean>>;
}

export default function SpanishInput({
  value,
  placeholder,
  setValue,
  disabled,
  inputRef,
  open,
  setOpen,
  setSpecialChar,
  setIsActiveSpanishKeyboard,
}: ISpanishInput) {
  const keypressEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.ctrlKey && !e.metaKey) {
      if (TargetSpanishCharListForInput.includes(e.key)) {
        setOpen(true);
        setIsActiveSpanishKeyboard(false);
        setSpecialChar(e.key as keyof typeof SpanishConvertDict);
      } else if (e.key === SpanishKeyboardActivationKey && open) {
        inputRef?.current?.blur();
        setIsActiveSpanishKeyboard(true);
      } else {
        setOpen(false);
        setSpecialChar(null);
      }
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
        'w-72 h-10 m-1 pl-4 rounded-full border-1 border-black ' +
        (disabled ? 'bg-gray-600 text-stone-100' : 'bg-zinc-200 text-stone-900')
      }
      ref={inputRef}
    />
  );
}
