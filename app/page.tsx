'use client';

import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const { user, login } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push('/word');
    }
  }, [user, router]);

  return (
    <>
      <button onClick={login}>로그인</button>
    </>
  );
}
