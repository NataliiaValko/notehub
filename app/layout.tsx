import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Knewave, Open_Sans } from 'next/font/google';

import 'modern-normalize';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple and efficient app for creating and organizing your notes.',
  openGraph: {
    title: 'NoteHub',
    description: 'A simple and efficient app for creating and organizing your notes.',
    url: `https://notehub-tukd.vercel.app/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - A simple and efficient app for creating and organizing your notes.',
      },
    ],
  },
};

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['500', '600', '700'],
//   variable: '--font-roboto',
//   display: 'swap',
// });

const knewave = Knewave({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-knewave',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${knewave.variable} ${openSans.variable} body`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
