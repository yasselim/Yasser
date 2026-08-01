import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function TopBar() {
  const t = useTranslations('topbar');

  return (
    <header className="h-16 shrink-0 border-b border-divider bg-bg-panel flex items-center justify-end gap-3 px-4 lg:px-6">
      <LanguageSwitcher />
      <ThemeToggle />
      <Link
        href="/daily-log"
        className="rounded-md bg-accent-primary px-3 py-2 text-sm font-medium text-bg-base hover:opacity-90 transition-opacity"
      >
        + {t('addEntry')}
      </Link>
    </header>
  );
}
