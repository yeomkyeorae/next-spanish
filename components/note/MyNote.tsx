import NoteMarkdown from './NoteMarkdown';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useEffect } from 'react';

type Props = {
  content: string;
  requestBeforeNote: () => void;
  requestNextNote: () => void;
};

export default function MyNote({ content, requestBeforeNote, requestNextNote }: Props) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        requestBeforeNote();
      } else if (event.key === 'ArrowRight') {
        requestNextNote();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [requestBeforeNote, requestNextNote]);

  return (
    <section className='flex flex-col items-center w-full h-full'>
      <div className='flex items-center w-full md:w-7/12 h-full'>
        <div className='mx-2 text-white text-2xl cursor-pointer hover:text-highFever' onClick={requestBeforeNote}>
          <FaArrowLeft />
        </div>
        <NoteMarkdown markdown={content} width='full' />
        <div className='mx-2 text-white text-2xl cursor-pointer hover:text-highFever' onClick={requestNextNote}>
          <FaArrowRight />
        </div>
      </div>
    </section>
  );
}
