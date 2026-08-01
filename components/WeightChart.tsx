'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useTranslations } from 'next-intl';

type Point = { date: string; weight: number | null };

export default function WeightChart({ data }: { data: Point[] }) {
  const t = useTranslations('dashboard');

  if (data.length === 0) {
    return <p className="text-sm text-text-muted">{t('noData')}</p>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="var(--divider)" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
          <YAxis
            stroke="var(--text-muted)"
            fontSize={12}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-panel-raised)',
              border: '1px solid var(--divider)',
              borderRadius: 8,
            }}
          />
          <Line type="monotone" dataKey="weight" stroke="var(--accent-primary)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
