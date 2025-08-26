import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api/clientApi';
import { Metadata } from 'next';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const parsedId = Number(id);
  const note = await fetchNoteById(parsedId);

  return {
    title: note.title,
    description: `${note.content.slice(0, 30)}...`,
    openGraph: {
      title: note.title,
      description: `${note.content.slice(0, 30)}...`,
      url: `https://notehub-tukd.vercel.app/notes/${id}`,
      images: [
        {
          url: '/Cover.png',
          width: 1200,
          height: 630,
          alt: `${note.title} | NoteHub`,
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;

  const parsedId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', parsedId],
    queryFn: () => fetchNoteById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
