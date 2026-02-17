'use client';

import { useEffect, useState, useCallback } from 'react';

export function useActiveSection(sectionIds: readonly string[], enabled: boolean) {
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = useCallback(() => {
    const current = sectionIds.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100;
      }
      return false;
    });
    setActiveSection(current || '');
  }, [sectionIds]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, handleScroll]);

  return activeSection;
}
