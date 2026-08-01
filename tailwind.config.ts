import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-panel': 'var(--bg-panel)',
        'bg-panel-raised': 'var(--bg-panel-raised)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-tertiary': 'var(--accent-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        divider: 'var(--divider)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'var(--font-plex-arabic)', 'sans-serif'],
        arabic: ['var(--font-plex-arabic)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
