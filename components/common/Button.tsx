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
      className={`w-20 h-10 rounded-full my-1 shadow-lg transition duration-200 hover:scale-110 ${
        btnBgColor ?? 'bg-highFever'
      } ${btnFontColor ?? 'text-white'}`}
    >
      {text}
    </button>
  );
}
