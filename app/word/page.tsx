import EnrollSpanish from '@/components/enroll-spanish';
import SpanishList from '@/components/spanish-list';

export default function Word() {
  return (
    <div>
      Word!
      <EnrollSpanish type='words' />
      <SpanishList type='words' />
    </div>
  );
}
