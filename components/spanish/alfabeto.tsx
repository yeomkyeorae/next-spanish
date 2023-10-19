type Props = {
  word: string;
  onClickHandler?: () => void;
};

export default function Alfabeto({ word, onClickHandler }: Props) {
  return (
    <li
      className='w-5 bg-red-400 rounded-md text-center text-xl text-white cursor-pointer hover:bg-red-300 transform transition-transform active:scale-110'
      onClick={onClickHandler}
    >
      {word}
    </li>
  );
}
