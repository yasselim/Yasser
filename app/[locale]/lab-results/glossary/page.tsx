import { getTranslations } from 'next-intl/server';
import PagePlaceholder from '@/components/PagePlaceholder';

export default async function LabGlossaryPage() {
  const t = await getTranslations('pages.labGlossary');
  return <PagePlaceholder title={t('title')} subtitle={t('subtitle')} />;
}
