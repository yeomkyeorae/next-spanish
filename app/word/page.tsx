import WordList from '@/components/spanish/word-list';

export default function Word() {
  return (
    <section className='flex flex-col items-center'>
      <span className='text-xl font-bold my-2'>parabra!</span>
      <WordList canDeleteSpanish={true} canAddSpanish={true} canSortSpanish={true} />
    </section>
  );
}
