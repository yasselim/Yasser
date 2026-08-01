'use client';

import { useEffect, useState } from 'react';

export default function ProgressRing({ percent }: { percent: number }) {
  const [animated, setAnimated] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimated(percent));
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  const offset = circumference - (animated / 100) * circumference;

  return (
    <svg width="140" height="140" viewBox="0 0 120 120" className="-rotate-90">
      <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--divider)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="var(--accent-primary)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <text
        x="60"
        y="65"
        textAnchor="middle"
        className="font-mono"
        style={{
          fill: 'var(--text-primary)',
          fontSize: '18px',
          transform: 'rotate(90deg)',
          transformOrigin: '60px 60px',
        }}
      >
        {Math.round(animated)}%
      </text>
    </svg>
  );
}
