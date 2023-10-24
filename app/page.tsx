'use client';

import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function Home() {
  const router = useRouter();

  const { user, login } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push('/word');
    }
  }, [user, router]);

  return (
    <section className='bg-midFever h-full flex justify-center items-center shadow-lg'>
      <button
        className='text-xl w-72 h-16 rounded-full flex justify-center items-center bg-lowFever shadow-2xl cursor-pointer'
        onClick={login}
      >
        <span className='flex items-center gap-2 text-gray-600 font-semibold'>
          <FcGoogle className='text-4xl' />
          구글 로그인
        </span>
      </button>
    </section>
  );
}
