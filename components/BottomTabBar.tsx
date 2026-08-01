'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { bottomTabItems } from './nav-items';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BottomTabBar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 border-t border-divider bg-bg-panel flex">
      {bottomTabItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] ${
            isActive(pathname, item.href) ? 'text-accent-primary' : 'text-text-muted'
          }`}
        >
          <span className="text-lg" aria-hidden>
            {item.icon}
          </span>
          {t(item.labelKey)}
        </Link>
      ))}
    </nav>
  );
}
