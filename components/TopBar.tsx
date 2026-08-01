import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import SignOutButton from './SignOutButton';

export default async function TopBar() {
  const t = await getTranslations('topbar');
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="h-16 shrink-0 border-b border-divider bg-bg-panel flex items-center justify-end gap-3 px-4 lg:px-6">
      {user ? (
        <>
          <span className="hidden sm:inline text-sm text-text-muted">{user.email}</span>
          <SignOutButton />
        </>
      ) : (
        <Link
          href="/sign-in"
          className="rounded-md px-3 py-2 text-sm text-text-muted hover:text-text-primary"
        >
          {t('signIn')}
        </Link>
      )}
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
