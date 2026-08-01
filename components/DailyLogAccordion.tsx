'use client';

import { useState } from 'react';
import { useTranslations, useFormatter } from 'next-intl';
import { upsertDailyLog } from '@/lib/actions/daily-log';

type Day = { date: string; weightKg: number | null; dietNotes: string };

export default function DailyLogAccordion({ days, locale }: { days: Day[]; locale: string }) {
  const t = useTranslations('dailyLog');
  const format = useFormatter();
  const [openDate, setOpenDate] = useState<string | null>(days[0]?.date ?? null);

  return (
    <div className="space-y-2">
      {days.map((day) => {
        const isOpen = openDate === day.date;
        const dateObj = new Date(`${day.date}T00:00:00`);

        return (
          <div
            key={day.date}
            className="overflow-hidden rounded-lg border border-divider bg-bg-panel"
          >
            <button
              type="button"
              onClick={() => setOpenDate(isOpen ? null : day.date)}
              className="flex w-full items-center justify-between px-4 py-3 text-start"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-text-primary">
                {format.dateTime(dateObj, { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-3">
                {day.weightKg != null && (
                  <span className="font-mono text-sm text-accent-primary">{day.weightKg} kg</span>
                )}
                <span className="text-text-muted" aria-hidden>
                  {isOpen ? '−' : '+'}
                </span>
              </span>
            </button>

            {isOpen && (
              <form action={upsertDailyLog} className="space-y-3 border-t border-divider px-4 py-4">
                <input type="hidden" name="logDate" value={day.date} />
                <input type="hidden" name="locale" value={locale} />
                <div>
                  <label className="block text-xs text-text-muted">{t('weightLabel')}</label>
                  <input
                    type="number"
                    step="0.1"
                    name="weightKg"
                    defaultValue={day.weightKg ?? ''}
                    className="mt-1 w-full rounded-md border border-divider bg-bg-panel-raised px-3 py-2 text-sm font-mono text-text-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted">{t('dietLabel')}</label>
                  <textarea
                    name="dietNotes"
                    defaultValue={day.dietNotes}
                    rows={3}
                    className="mt-1 w-full rounded-md border border-divider bg-bg-panel-raised px-3 py-2 text-sm text-text-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-accent-primary px-3 py-1.5 text-sm font-medium text-bg-base hover:opacity-90"
                >
                  {t('save')}
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}
