import NoteMarkdown from './note-markdown';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
  content: string;
  requestBeforeNote: () => void;
  requestNextNote: () => void;
};

export default function MyNote({ content, requestBeforeNote, requestNextNote }: Props) {
  return (
    <section className='flex flex-col items-center w-full h-full'>
      <div className='flex items-center w-7/12 h-full mb-5'>
        <div className='mr-3 text-white text-2xl cursor-pointer hover:text-highFever' onClick={requestBeforeNote}>
          <FaArrowLeft />
        </div>
        <NoteMarkdown markdown={content} width='full' />
        <div className='ml-3 text-white text-2xl cursor-pointer hover:text-highFever' onClick={requestNextNote}>
          <FaArrowRight />
        </div>
      </div>
    </section>
  );
}
