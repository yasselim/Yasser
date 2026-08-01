import { getTranslations } from 'next-intl/server';
import PagePlaceholder from '@/components/PagePlaceholder';

export default async function HealthLibraryPage() {
  const t = await getTranslations('pages.healthLibrary');
  return <PagePlaceholder title={t('title')} subtitle={t('subtitle')} />;
}
