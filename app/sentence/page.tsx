import SpanishList from '@/components/spanish-list';

export default function Sentence() {
  return (
    <section className='flex flex-col items-center'>
      <span className='text-xl font-bold my-2'>oración!</span>
      <SpanishList type='sentences' limitNumber={2} canDeleteSpanish={true} canAddSpanish={true} />
    </section>
  );
}
