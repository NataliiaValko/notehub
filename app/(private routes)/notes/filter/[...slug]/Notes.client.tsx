'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api/clientApi';
import Link from 'next/link';

import css from './page.module.css';
import { useParams } from 'next/navigation';
import { Note, Tag } from '@/types/note';

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [notes, setNotes] = useState([] as Note[]);

  const { slug } = useParams<{ slug: string }>();
  const tag: Tag | string = slug[0];
  const parsedTag = (tag && tag !== 'All' && tag) || '';

  const { data, isLoading } = useQuery({
    queryKey: ['notes', { search: searchQuery, page: currentPage, tag }],
    queryFn: () =>
      fetchNotes({
        search: searchQuery,
        page: currentPage,
        tag: parsedTag,
      }),
    refetchOnMount: false,
  });

  const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  }, 300);

  useEffect(() => {
    if (!data) return;

    setTotalPages(data?.totalPages ?? 0);
    setNotes(data?.notes);

    if ((data.notes?.length ?? 0) === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [data, currentPage]);

  return (
    <div className={css.app}>
      <main className={css.main}>
        <section>
          <header className={css.toolbar}>
            <SearchBox onSearch={changeSearchQuery} />
            {totalPages > 0 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}

            <Link className={css.button} href={'/notes/action/create'}>
              Create note +
            </Link>
          </header>

          {isLoading ? (
            <p className={css.text}>Loading ...</p>
          ) : notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <p className={css.text}>Nothing here yet. Create your first note!</p>
          )}
        </section>
      </main>
    </div>
  );
}
