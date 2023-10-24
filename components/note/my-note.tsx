import NoteMarkdown from './note-markdown';

export default function MyNote() {
  const note = `
  # 1. Spanish?
  `;

  return (
    <section className='flex flex-col items-center'>
      <div className='flex gap-2'>
        <NoteMarkdown markdown={note} />
      </div>
      <button className='w-32 h-8 bg-red-300 text-white rounded-md mt-6'>수정</button>
    </section>
  );
}
