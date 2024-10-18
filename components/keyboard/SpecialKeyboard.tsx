// 'use client';

// import { useState } from 'react';
// import { SPECIAL_ALFABETOS, SPECIAL_SIGN } from '@/def';

// const keyboardStyle =
//   'w-8 h-8 border-2 border-black rounded-md text-center text-white bg-highFever cursor-pointer shadow-lg';

// type Props = {
//   charClickHandler: (char: string) => void;
// };

// export default function SpecialKeyboard({ charClickHandler }: Props) {
//   const [charType, setCharType] = useState<'Lowercase' | 'Uppercase'>('Lowercase');

//   const changeCharType = () => {
//     const newType = charType === 'Lowercase' ? 'Uppercase' : 'Lowercase';
//     setCharType(newType);
//   };

//   return (
//     <section>
//       <ul className='flex flex-wrap gap-1 mb-1 px-4'>
//         {SPECIAL_ALFABETOS[charType].map((char) => (
//           <li key={char} className={keyboardStyle} onClick={() => charClickHandler(char)}>
//             {char}
//           </li>
//         ))}
//         {SPECIAL_SIGN.map((char) => (
//           <li key={char} className={keyboardStyle} onClick={() => charClickHandler(char)}>
//             {char}
//           </li>
//         ))}
//         <button onClick={changeCharType} className='border-2 border-black rounded-md mr-1 px-2 text-white bg-highFever'>
//           대소문자 변환
//         </button>
//       </ul>
//     </section>
//   );
// }
