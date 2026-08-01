import { getTranslations } from 'next-intl/server';
import PagePlaceholder from '@/components/PagePlaceholder';

export default async function DietPlanPage() {
  const t = await getTranslations('pages.dietPlan');
  return <PagePlaceholder title={t('title')} subtitle={t('subtitle')} />;
}
