import SpanishList from '@/components/spanish-list';

export default function Home() {
  return (
    <section>
      <SpanishList type='words' limitNumber={2} />
      <SpanishList type='sentences' limitNumber={2} />
    </section>
  );
}
