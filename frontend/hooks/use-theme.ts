'use client';

import { useEffect, useState, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // The inline script in the root layout has already applied the class, so
    // read back from the DOM rather than re-deriving it — otherwise a stored
    // value the script rejected would leave the label out of sync with the page.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== 'light' && savedTheme !== 'dark') {
      localStorage.setItem('theme', 'dark');
    }
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme, mounted };
}
