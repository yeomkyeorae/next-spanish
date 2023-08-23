import { Dispatch, SetStateAction } from "react";

export default function Input({ value, setValue }: { value: string, setValue: Dispatch<SetStateAction<string>>}) {
  return <input value={value} onChange={e => setValue(e.target.value)} />
}