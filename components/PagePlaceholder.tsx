import { useTranslations } from 'next-intl';

export default function PagePlaceholder({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const t = useTranslations('common');

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-semibold text-text-primary">{title}</h1>
      <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
      <div className="mt-6 rounded-lg border border-dashed border-divider bg-bg-panel p-8 text-center">
        <p className="font-display text-accent-tertiary">{t('comingSoon')}</p>
        <p className="mt-2 text-sm text-text-muted">{t('comingSoonBody')}</p>
      </div>
    </div>
  );
}
