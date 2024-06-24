import WordList from '@/components/spanish/WordList';

export default function Word() {
  return (
    <section className='bg-midFever h-full flex flex-col items-center'>
      <span className='text-2xl font-bold my-2 text-white'>parabra!</span>
      <WordList canSortSpanish={true} />
    </section>
  );
}
