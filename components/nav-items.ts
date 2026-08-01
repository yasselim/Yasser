export type NavItem = {
  href: string;
  icon: string;
  labelKey: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  { href: '/', icon: '🏠', labelKey: 'nav.dashboard' },
  { href: '/daily-log', icon: '📅', labelKey: 'nav.dailyLog' },
  {
    href: '/lab-results',
    icon: '🧪',
    labelKey: 'nav.labResults',
    children: [
      { href: '/lab-results/my-results', icon: '', labelKey: 'nav.myResults' },
      { href: '/lab-results/glossary', icon: '', labelKey: 'nav.labGlossary' },
    ],
  },
  { href: '/diet-plan', icon: '🍽️', labelKey: 'nav.dietPlan' },
  { href: '/health-library', icon: '📚', labelKey: 'nav.healthLibrary' },
  { href: '/settings', icon: '⚙️', labelKey: 'nav.settings' },
];

export const bottomTabItems: NavItem[] = [
  { href: '/', icon: '🏠', labelKey: 'nav.dashboard' },
  { href: '/daily-log', icon: '📅', labelKey: 'nav.dailyLog' },
  { href: '/lab-results/my-results', icon: '🧪', labelKey: 'nav.labResults' },
  { href: '/diet-plan', icon: '🍽️', labelKey: 'nav.dietPlan' },
  { href: '/settings', icon: '⚙️', labelKey: 'nav.settings' },
];
