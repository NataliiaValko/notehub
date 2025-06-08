import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'This page does not exist or has been moved.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'This page does not exist or has been moved.',
    url: `https://notehub-tukd.vercel.app/`,
    images: [
      {
        url: '/Cover.png',
        width: 1200,
        height: 630,
        alt: '404 - Page not found | NoteHub',
      },
    ],
  },
};

export default function NotFoundPage() {
  return <p>404 | Page Not Page</p>;
}
