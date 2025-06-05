import { fetchNotes } from '@/lib/api';

import NotesClient from './Notes.client';
import { Tag } from '@/types/note.js';

export default async function NotesPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag: Tag | string = slug[0];

  const data = await fetchNotes({
    searchText: '',
    page: 1,
    ...(tag && tag !== 'All' && { tag }),
  });

  return <NotesClient initialData={data} tag={tag} />;
}
