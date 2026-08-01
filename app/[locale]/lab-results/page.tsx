import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function LabResultsIndexPage() {
  const t = await getTranslations();

  const links = [
    { href: '/lab-results/my-results', label: t('nav.myResults'), desc: t('pages.myResults.subtitle') },
    { href: '/lab-results/glossary', label: t('nav.labGlossary'), desc: t('pages.labGlossary.subtitle') },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-semibold text-text-primary">{t('nav.labResults')}</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-divider bg-bg-panel p-6 hover:bg-bg-panel-raised transition-colors"
          >
            <p className="font-display text-lg text-accent-primary">{link.label}</p>
            <p className="mt-1 text-sm text-text-muted">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
