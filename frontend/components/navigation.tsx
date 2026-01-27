'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';

  // Handle scroll tracking (only on homepage)
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = ['home', 'work', 'projects', 'mindspace'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigateToSection = (id: string) => {
    if (isHomePage) {
      // On homepage, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to homepage with hash
      router.push(`/#${id}`);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-center">
          <div className="flex items-center gap-6">
            <span className="text-[13px] font-mono uppercase tracking-wider text-muted-foreground">Contact</span>
            <span className="text-[13px] font-mono uppercase tracking-wider text-muted-foreground">Work/Projects</span>
            <span className="text-[13px] font-mono uppercase tracking-wider text-muted-foreground">Mindspace</span>
            <span className="text-[13px] font-mono uppercase tracking-wider text-muted-foreground">Dark</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-center">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigateToSection('home')}
            className={`text-[13px] font-mono uppercase tracking-wider transition-colors ${
              isHomePage && activeSection === 'home'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => navigateToSection('work')}
            className={`text-[13px] font-mono uppercase tracking-wider transition-colors ${
              isHomePage && (activeSection === 'work' || activeSection === 'projects')
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Work/Projects
          </button>
          <button
            onClick={() => navigateToSection('mindspace')}
            className={`text-[13px] font-mono uppercase tracking-wider transition-colors ${
              isHomePage && activeSection === 'mindspace'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Mindspace
          </button>
          <button
            onClick={toggleTheme}
            className="text-[13px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </nav>
  );
}
