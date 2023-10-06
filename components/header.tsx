'use client';

import { useAuthContext } from '@/context/authContext';
import Link from 'next/link';

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className='flex justify-between p-8'>
      <Link href='/'>
        <h1 className='text-2xl font-bold'>VamoSpain</h1>
      </Link>
      <nav className='flex gap-4'>
        {user && (
          <>
            <Link href='/word'>Word</Link>
            <Link href='/sentence'>Sentence</Link>
            <Link href='/note'>Note</Link>
          </>
        )}
        {!user && <button onClick={login}>로그인</button>}
        {user && <button onClick={logout}>로그아웃</button>}
      </nav>
    </header>
  );
}
