import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';

type generateMetadataProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: generateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const tag: Tag | string = slug[0];

  return {
    title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
    description: `Browse notes tagged with ${
      tag === 'All' ? 'all tags' : tag
    }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
    openGraph: {
      title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
      description: `Browse notes tagged with ${
        tag === 'All' ? 'all tags' : tag
      }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes - ${tag === 'All' ? 'All Tags' : tag} | NoteHub`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: generateMetadataProps) {
  const { slug } = await params;
  const tag: Tag | string = slug[0];
  const parsedTag = tag && tag !== 'All' && { tag };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, tag: parsedTag }],
    queryFn: () =>
      fetchNotes({
        search: '',
        page: 1,
        ...parsedTag,
      }),
  });

  // return <NotesClient initialData={data} tag={tag} />;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
