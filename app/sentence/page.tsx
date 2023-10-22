import SentenceList from '@/components/spanish/sentence-list';

export default function Sentence() {
  return (
    <section className='bg-highFever h-full flex flex-col items-center'>
      <span className='text-xl font-bold my-2'>oración!</span>
      <SentenceList limitNumber={6} canDeleteSpanish={true} canAddSpanish={true} />
    </section>
  );
}
