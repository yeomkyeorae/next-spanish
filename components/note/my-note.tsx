import NoteMarkdown from './note-markdown';

export default function MyNote({ content }: { content: string }) {
  return (
    <section className='flex flex-col items-center w-full h-full'>
      <div className='flex w-3/5 h-full mb-5'>
        <NoteMarkdown markdown={content} width='full' />
      </div>
    </section>
  );
}
