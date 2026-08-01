'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Theme = 'dark' | 'light';

export default function ThemeToggle() {
  const t = useTranslations('topbar');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem('theme') as Theme | null;
    const initial = stored ?? 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    window.localStorage.setItem('theme', next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('toggleTheme')}
      title={t('toggleTheme')}
      className="flex h-9 w-9 items-center justify-center rounded-md text-text-muted hover:bg-bg-panel-raised hover:text-text-primary transition-colors"
    >
      <span aria-hidden>{theme === 'dark' ? '🌙' : '☀️'}</span>
    </button>
  );
}
