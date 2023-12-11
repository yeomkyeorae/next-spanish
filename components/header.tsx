'use client';

import { useAuthContext } from '@/context/authContext';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className='flex justify-between items-center p-4'>
      <div className='flex items-center gap-2'>
        <Image src='/spain-flag.png' width={48} height={18} alt='spain-flag' />
        <h1 className='text-2xl hidden sm:block'>바모스페인</h1>
      </div>
      <nav className='flex gap-4'>
        {user && (
          <>
            <Link href='/word'>단어</Link>
            <Link href='/sentence'>문장</Link>
            <Link href='/note'>노트</Link>
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
