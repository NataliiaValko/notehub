import { Metadata } from 'next';
import EditProfileClient from './EditProfile.client';

export const metadata: Metadata = {
  title: 'Edit Profile | NoteHub',
  description: 'Update your personal information and manage your profile settings on NoteHub.',
  openGraph: {
    title: 'Edit Profile | NoteHub',
    description: 'Update your personal information and manage your profile settings on NoteHub.',
    url: `https://react-v3-hw-solutions.vercel.app/profile/edit`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Edit your profile and manage your account.',
      },
    ],
  },
};

export default function EditProfilePage() {
  return <EditProfileClient />;
}
