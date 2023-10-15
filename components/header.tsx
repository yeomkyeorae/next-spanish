'use client';

import { useAuthContext } from '@/context/authContext';
import Link from 'next/link';

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className='flex justify-between p-8'>
      <h1 className='text-2xl font-bold'>VamoSpain</h1>
      <nav className='flex gap-4'>
        {user && (
          <>
            <Link href='/word'>Word</Link>
            <Link href='/sentence'>Sentence</Link>
            <Link href='/note'>Note</Link>
            {
              <button className='flex items-start' onClick={logout}>
                로그아웃
              </button>
            }
          </>
        )}
      </nav>
    </header>
  );
}
