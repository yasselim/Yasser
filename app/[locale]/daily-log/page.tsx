import { getTranslations } from 'next-intl/server';
import PagePlaceholder from '@/components/PagePlaceholder';

export default async function DailyLogPage() {
  const t = await getTranslations('pages.dailyLog');
  return <PagePlaceholder title={t('title')} subtitle={t('subtitle')} />;
}
