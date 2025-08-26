// 'use client';

// import Link from 'next/link';
// import { useAuthStore } from '@/lib/store/authStore';
// import { logout } from '@/lib/api/clientApi';
// import { useRouter } from 'next/navigation';

// import css from './AuthNavigation.module.css';
// import { useEffect, useState } from 'react';

// export default function AuthNavigation() {
//   const { isAuthenticated, user } = useAuthStore();
//   const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
//   const [mounted, setMounted] = useState(false);
//   const router = useRouter();

//   const handleLogout = async () => {
//     await logout();
//     clearIsAuthenticated();
//     router.push('/sign-in');
//   };
//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;
//   return isAuthenticated ? (
//     <>
//       <li className={css.navigationItem}>
//         <Link href="/profile" className={css.navigationLink}>
//           Profile
//         </Link>
//       </li>

//       <li className={css.navigationItem}>
//         <p className={css.userEmail}>{user?.email}</p>
//         <button onClick={handleLogout} className={css.logoutButton}>
//           Logout
//         </button>
//       </li>
//     </>
//   ) : (
//     <>
//       <li className={css.navigationItem}>
//         <Link href="/sign-in" className={css.navigationLink}>
//           Sign in
//         </Link>
//       </li>
//       <li className={css.navigationItem}>
//         <Link href="/sign-up" className={css.navigationLink}>
//           Sign up
//         </Link>
//       </li>
//     </>
//   );
// }

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" className={css.navigationLink} prefetch={false}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink} prefetch={false}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink} prefetch={false}>
          Sign up
        </Link>
      </li>
    </>
  );
}
