import axios from 'axios';
import { Note } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  searchText?: string;
  page?: number;
  tag?: string;
}

export const fetchNotes = async ({ searchText, page, tag }: FetchNotesProps) => {
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      ...(searchText !== '' && { search: searchText }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return response.data;
};

interface NewNoteContent {
  title: string;
  content?: string;
  tag: string;
}

export const createNote = async (newNote: NewNoteContent) => {
  const response = await axios.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: number) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: number) => {
  const response = await axios.get<Note>(`/notes/${noteId}`);
  return response.data;
};
