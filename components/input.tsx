import { Dispatch, RefObject, SetStateAction } from 'react';

export default function Input({
  value,
  placeholder,
  setValue,
  disabled,
  inputRef,
}: {
  value: string;
  placeholder: string;
  setValue?: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <input
      value={value}
      onChange={(e) => {
        if (setValue) {
          setValue(e.target.value);
        }
      }}
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
