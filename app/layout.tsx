import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import './globals.css';
import { AuthContextProvider } from '@/context/authContext';

export const metadata: Metadata = {
  title: 'VamoSpain',
  description: 'lets study spanish!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='flex flex-col w-full max-w-screen-2xl mx-auto'>
        <AuthContextProvider>
          <Header />
          <main className='grow'>{children}</main>
        </AuthContextProvider>
        <Footer />
      </body>
    </html>
  );
}
