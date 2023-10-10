'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { login, logout, onUserStateChange } from '../firebase/firebase';
import { User } from 'firebase/auth';

const AuthContext = createContext({ user: {} as User | null, login, logout });

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 최초 사용자 상태에 따른 user state 업데이트
    onUserStateChange((user: User | null) => {
      setUser(user);

      if (!user && pathname !== '/') {
        router.push('/');
      }
    });
  }, [pathname, router]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
