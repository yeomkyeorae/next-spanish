import EnrollSpanish from '@/components/enroll-spanish';
import SpanishList from '@/components/spanish-list';

export default function Word() {
  return (
    <div>
      Word!
      <SpanishList type='words' canDeleteSpanish={true} />
    </div>
  );
}
