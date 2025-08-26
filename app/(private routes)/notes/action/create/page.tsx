import { Metadata } from 'next';

import NoteForm from '@/components/NoteForm/NoteForm';

import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create New Note | NoteHub',
  description:
    'Quickly create a new note in NoteHub — the efficient app for organizing your thoughts and ideas.',
  openGraph: {
    title: 'Create New Note | NoteHub',
    description:
      'Quickly create a new note in NoteHub — the efficient app for organizing your thoughts and ideas.',
    url: 'https://notehub-tukd.vercel.app',
    images: [
      {
        url: '/Cover.png',
        width: 1200,
        height: 630,
        alt: 'Create New Note | NoteHub',
      },
    ],
  },
};

export default async function CreateNote() {
  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          <NoteForm />
        </div>
      </main>
    </>
  );
}
