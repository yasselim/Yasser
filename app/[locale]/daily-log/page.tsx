import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { ensureProfile } from '@/lib/profile';
import DailyLogAccordion from '@/components/DailyLogAccordion';

const DAYS_SHOWN = 14;

export default async function DailyLogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('pages.dailyLog');

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/sign-in`);

  await ensureProfile(user);

  const since = new Date();
  since.setDate(since.getDate() - (DAYS_SHOWN - 1));
  since.setHours(0, 0, 0, 0);

  const logs = await prisma.dailyLog.findMany({
    where: { userId: user.id, logDate: { gte: since } },
  });

  const logsByDate = new Map(logs.map((log) => [log.logDate.toISOString().slice(0, 10), log]));

  const days = Array.from({ length: DAYS_SHOWN }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    const log = logsByDate.get(key);
    return {
      date: key,
      weightKg: log?.weightKg ?? null,
      dietNotes: log?.dietNotes ?? '',
    };
  });

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-semibold text-text-primary">{t('title')}</h1>
      <p className="mt-1 text-sm text-text-muted">{t('subtitle')}</p>
      <div className="mt-6">
        <DailyLogAccordion days={days} locale={locale} />
      </div>
    </div>
  );
}
