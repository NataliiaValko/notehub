'use client';

import { useEffect, useRef, useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import DropdownPortal from '@/components/DropdownPortal/DropdownPortal';
import { Tag } from '@/types/note';

const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 0,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpenMenu(false);
      }
    };

    if (isOpenMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenMenu]);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton} ref={buttonRef}>
        Notes
        <span className={css.arrow}></span>
      </button>

      {isOpenMenu && (
        <DropdownPortal>
          <ul
            ref={menuRef}
            className={css.menuList}
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              zIndex: 9999,
            }}
          >
            <li className={css.menuItem}>
              <Link href={`/notes/filter/All`} className={css.menuLink}>
                All notes
              </Link>
            </li>
            {tags.map((tag) => (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={`/notes/filter/${tag}`}
                  className={css.menuLink}
                  onClick={() => setIsOpenMenu(false)}
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </DropdownPortal>
      )}
    </div>
  );
}
