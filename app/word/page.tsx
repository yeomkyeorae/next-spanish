import SpanishList from '@/components/spanish-list';

export default function Word() {
  return (
    <section className='flex flex-col items-center'>
      <span className='text-xl font-bold my-2'>parabra!</span>
      <SpanishList type='words' canDeleteSpanish={true} canAddSpanish={true} canSortSpanish={true} />
    </section>
  );
}
