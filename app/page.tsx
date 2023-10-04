import WordList from '@/components/spanish/word-list';
import SentenceList from '@/components/spanish/sentence-list';

export default function Home() {
  return (
    <section>
      <WordList limitNumber={2} />
      <SentenceList limitNumber={2} />
    </section>
  );
}
