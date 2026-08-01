import { getTranslations } from 'next-intl/server';
import PagePlaceholder from '@/components/PagePlaceholder';

export default async function DashboardPage() {
  const t = await getTranslations('pages.dashboard');
  return <PagePlaceholder title={t('title')} subtitle={t('subtitle')} />;
}
