export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}
