import { Dispatch, SetStateAction } from 'react';

export default function Input({
  value,
  setValue,
  disabled,
  title,
}: {
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <>
      <h2 className='text-2xl'>{title ?? ''}</h2>
      <input
        value={value}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        disabled={disabled ?? false}
        className={'px-2 rounded-full ' + (disabled ? 'bg-gray-600 text-stone-100' : 'bg-zinc-200 text-stone-900')}
      />
    </>
  );
}
