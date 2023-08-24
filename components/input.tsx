import { Dispatch, SetStateAction } from "react";

export default function Input({ value, setValue, disabled }: { value: string, setValue?: Dispatch<SetStateAction<string>>, disabled?: boolean}) {
  return (
    <input 
      value={value} 
      onChange={e => {
        if(setValue) {
          setValue(e.target.value)
        }
      }} 
      disabled={disabled ?? false} 
    />
  );
}