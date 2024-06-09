'use client';

import { useAuthContext } from '@/context/authContext';
import { MdLogout } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthContext();

  return (
    <header className='flex justify-between items-center p-4'>
      <div className='flex items-center gap-2 cursor-pointer hover:text-midFever' onClick={() => router.push('/word')}>
        <Image src='/spain-flag.png' width={48} height={18} alt='spain-flag' />
        <h1 className='text-2xl font-bold hidden sm:block'>바모스페인</h1>
      </div>
      <nav className='flex gap-5'>
        {user && (
          <>
            <Link className='text-xl font-bold hover:text-midFever' href='/word'>
              단어
            </Link>
            <Link className='text-xl font-bold hover:text-midFever' href='/sentence'>
              문장
            </Link>
            <Link className='text-xl font-bold hover:text-midFever' href='/note'>
              노트
            </Link>
            {
              <button className='text-md font-bold hover:text-midFever flex items-center' onClick={logout}>
                <MdLogout />
                <span className='text-midFever'>{user.displayName ?? ''}</span>
                {user.displayName ? '님 ' : ''} 로그아웃
              </button>
            }
          </>
        )}
      </nav>
    </header>
  );
}
