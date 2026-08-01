'use client';

import { useTranslations } from 'next-intl';
import { signOut } from '@/lib/actions/auth';

export default function SignOutButton() {
  const t = useTranslations('topbar');

  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-md px-3 py-2 text-sm text-text-muted hover:text-text-primary"
      >
        {t('signOut')}
      </button>
    </form>
  );
}
