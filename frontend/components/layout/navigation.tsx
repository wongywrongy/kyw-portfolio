'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/use-theme';

export function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isMindspace = pathname.startsWith('/mindspace');

  const { theme, toggleTheme, mounted } = useTheme();

  const linkStyle = "text-[12px] font-sans uppercase tracking-wider transition-colors duration-200";
  const inactiveStyle = `${linkStyle} text-[var(--text-tertiary)] hover:text-[var(--text-primary)]`;
  const activeStyle = `${linkStyle} text-[var(--text-primary)]`;
  const separatorStyle = "w-px h-3 bg-[var(--border)]";

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="flex items-center justify-center py-3">
          <div className="flex items-center gap-4">
            <span className={inactiveStyle}>Home</span>
            <span className={separatorStyle} />
            <span className={inactiveStyle}>Mindspace</span>
            <span className={separatorStyle} />
            <span className={inactiveStyle}>Dark</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
      <div className="flex items-center justify-center py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={isHomePage ? activeStyle : inactiveStyle}
          >
            Home
          </Link>
          <span className={separatorStyle} />
          <Link
            href="/mindspace/all"
            className={isMindspace ? activeStyle : inactiveStyle}
          >
            Mindspace
          </Link>
          <span className={separatorStyle} />
          <button
            onClick={toggleTheme}
            className={inactiveStyle}
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </nav>
  );
}
