import SentenceList from '@/components/spanish/SentenceList';

export default function Sentence() {
  return (
    <section className='bg-midFever h-full flex flex-col items-center'>
      <span className='text-2xl font-bold my-2 text-white'>oración!</span>
      <SentenceList />
    </section>
  );
}
