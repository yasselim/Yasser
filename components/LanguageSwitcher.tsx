'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
  en: 'EN',
  ar: 'AR',
};

export default function LanguageSwitcher() {
  const t = useTranslations('topbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1" aria-label={t('language')}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => handleChange(loc)}
          className={`rounded-md px-2 py-1 text-xs font-mono transition-colors ${
            loc === locale
              ? 'bg-bg-panel-raised text-accent-primary'
              : 'text-text-muted hover:bg-bg-panel-raised hover:text-text-primary'
          }`}
        >
          {localeLabels[loc] ?? loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
