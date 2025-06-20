'use client';

import { useMutation } from '@tanstack/react-query';
import { createNote, CreateNoteData } from '@/lib/api';
import css from './NoteForm.module.css';
import { Tag } from '@/types/note';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const data: CreateNoteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as Tag,
    };

    mutate(data);
  };

  const handleClose = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.wrapper}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={draft?.title}
            onChange={handleChange}
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows={8}
            name="content"
            defaultValue={draft?.content}
            onChange={handleChange}
            className={css.textarea}
          />
        </div>

        <div className={`${css.formGroup} ${css.selectGroup}`}>
          <label htmlFor="tag">Tag</label>
          <span className={css.arrow}></span>
          <select
            id="tag"
            name="tag"
            defaultValue={draft?.tag || 'Todo'}
            onChange={handleChange}
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleClose}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
