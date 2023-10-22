import WordList from '@/components/spanish/word-list';

export default function Word() {
  return (
    <section className='bg-highFever h-full flex flex-col items-center'>
      <span className='text-xl font-bold my-2'>parabra!</span>
      <WordList canSortSpanish={true} />
    </section>
  );
}
