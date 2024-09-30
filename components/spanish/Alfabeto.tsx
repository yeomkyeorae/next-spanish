type Props = {
  word: string;
  isCurrentWordSelected: boolean;
  onClickHandler?: () => void;
};

export default function Alfabeto({ word, isCurrentWordSelected = false, onClickHandler }: Props) {
  return (
    <li
      className={`w-5 rounded-md text-center text-xl text-white cursor-pointer hover:bg-red-300 transform transition-transform active:scale-110 ${
        isCurrentWordSelected ? 'bg-highFever' : 'bg-red-400'
      }`}
      onClick={onClickHandler}
    >
      {word}
    </li>
  );
}
