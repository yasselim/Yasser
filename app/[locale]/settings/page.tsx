import { getTranslations } from 'next-intl/server';
import PagePlaceholder from '@/components/PagePlaceholder';

export default async function SettingsPage() {
  const t = await getTranslations('pages.settings');
  return <PagePlaceholder title={t('title')} subtitle={t('subtitle')} />;
}
