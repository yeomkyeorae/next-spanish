import EnrollSpanish from '@/components/enroll-spanish';
import SpanishList from '@/components/spanish-list';

export default function Sentence() {
  return (
    <div>
      Sentence!
      <SpanishList type='sentences' canDeleteSpanish={true} canAddSpanish={true} />
    </div>
  );
}
