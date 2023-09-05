import SpanishList from '@/components/spanish-list';

export default function Home() {
  return (
    <section>
      <SpanishList type='words' limitNumber={10} />
      <SpanishList type='sentences' limitNumber={10} />
    </section>
  );
}
