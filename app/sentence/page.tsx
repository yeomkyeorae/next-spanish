import EnrollSpanish from '@/components/enroll-spanish';
import SpanishList from '@/components/spanish-list';

export default function Sentence() {
  return (
    <div>
      Sentence!
      <EnrollSpanish type='sentences' />
      <SpanishList type='sentences' />
    </div>
  );
}
