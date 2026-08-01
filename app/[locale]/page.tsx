import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { ensureProfile } from '@/lib/profile';
import ProgressRing from '@/components/ProgressRing';
import WeightChart from '@/components/WeightChart';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('pages.dashboard');

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/sign-in`);

  const profile = await ensureProfile(user);

  const logs = await prisma.dailyLog.findMany({
    where: { userId: user.id, weightKg: { not: null } },
    orderBy: { logDate: 'asc' },
  });

  const startWeight = logs[0]?.weightKg ?? null;
  const currentWeight = logs.at(-1)?.weightKg ?? null;
  const goalWeight = profile.goalWeightKg;

  let progressPct = 0;
  if (
    startWeight != null &&
    currentWeight != null &&
    goalWeight != null &&
    startWeight !== goalWeight
  ) {
    progressPct = ((startWeight - currentWeight) / (startWeight - goalWeight)) * 100;
    progressPct = Math.max(0, Math.min(100, progressPct));
  }

  const chartData = logs.map((log) => ({
    date: log.logDate.toISOString().slice(0, 10),
    weight: log.weightKg,
  }));

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-semibold text-text-primary">{t('title')}</h1>
      <p className="mt-1 text-sm text-text-muted">{t('subtitle')}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-lg border border-divider bg-bg-panel p-6">
          <ProgressRing percent={progressPct} />
          <p className="mt-4 text-center text-sm text-text-muted">
            {currentWeight != null ? `${currentWeight} kg` : '—'}
            {goalWeight != null && (
              <>
                {' '}
                / <span className="font-mono">{goalWeight} kg</span>
              </>
            )}
          </p>
        </div>
        <div className="rounded-lg border border-divider bg-bg-panel p-6 lg:col-span-2">
          <WeightChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
