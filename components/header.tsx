import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex justify-between p-8'>
      <Link href='/'>
        <h1 className='text-2xl font-bold'>VamoSpain</h1>
      </Link>
      <nav className='flex gap-4'>
        <Link href='/word'>Word</Link>
        <Link href='/sentence'>Sentence</Link>
      </nav>
    </header>
  );
}
