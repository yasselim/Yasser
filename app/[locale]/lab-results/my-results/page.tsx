import { getTranslations } from 'next-intl/server';
import PagePlaceholder from '@/components/PagePlaceholder';

export default async function MyResultsPage() {
  const t = await getTranslations('pages.myResults');
  return <PagePlaceholder title={t('title')} subtitle={t('subtitle')} />;
}
