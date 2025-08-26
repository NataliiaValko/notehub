'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import css from './EditProfile.module.css';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfileClient() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState(
    'https://ac.goit.global/fullstack/react/default-avatar.jpg'
  );
  const setUser = useAuthStore((state) => state.setUser);

  // const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // await checkSession();
        const fetchedUser = await getMe();
        if (fetchedUser) {
          setUsername(fetchedUser.username);
          setUser(fetchedUser);
          setUserEmail(fetchedUser.email);
          setUserImage(
            fetchedUser.avatar ?? 'https://ac.goit.global/fullstack/react/default-avatar.jpg'
          );
        }
      } catch {}
    };

    fetchUser();
  }, [setUser]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await updateMe({ username });
      // if (user) {
      setUser({ ...user });
      // }
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image src={userImage} alt="User Avatar" width={120} height={120} className={css.avatar} />

        <form onSubmit={handleSave} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className={css.input}
            />
          </div>

          <p>Email: {userEmail}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
