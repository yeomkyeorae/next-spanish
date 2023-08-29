type ButtonProps = {
  text: string;
  btnBgColor?: string;
  btnFontColor?: string;
  onClickHandler: () => void;
};

export default function Button({ text, btnBgColor, btnFontColor, onClickHandler }: ButtonProps) {
  return (
    <button
      onClick={onClickHandler}
      className={`w-20 h-10 rounded-full ${btnBgColor ?? 'bg-sky-500'} ${btnFontColor ?? 'text-white'}`}
    >
      {text}
    </button>
  );
}
