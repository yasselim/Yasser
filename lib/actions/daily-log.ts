'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { ensureProfile } from '@/lib/profile';

export async function upsertDailyLog(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  await ensureProfile(user);

  const logDate = String(formData.get('logDate'));
  const weightRaw = formData.get('weightKg');
  const dietNotes = String(formData.get('dietNotes') ?? '').trim();
  const locale = String(formData.get('locale') ?? 'en');

  const weightKg = weightRaw && String(weightRaw).trim() !== '' ? Number(weightRaw) : null;

  await prisma.dailyLog.upsert({
    where: { userId_logDate: { userId: user.id, logDate: new Date(logDate) } },
    create: {
      userId: user.id,
      logDate: new Date(logDate),
      weightKg,
      dietNotes: dietNotes || null,
    },
    update: {
      weightKg,
      dietNotes: dietNotes || null,
    },
  });

  revalidatePath(`/${locale}/daily-log`);
  revalidatePath(`/${locale}`);
}
