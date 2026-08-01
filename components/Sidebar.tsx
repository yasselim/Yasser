'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { navItems } from './nav-items';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-16 lg:w-64 shrink-0 border-e border-divider bg-bg-panel">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6">
        <span className="hidden lg:inline font-display text-lg font-semibold text-text-primary">
          {t('app.name')}
        </span>
        <span className="lg:hidden text-xl">🧬</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 lg:px-4 py-2 space-y-1">
        {navItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive(pathname, item.href)
                  ? 'bg-bg-panel-raised text-accent-primary'
                  : 'text-text-muted hover:bg-bg-panel-raised hover:text-text-primary'
              }`}
            >
              <span className="text-lg" aria-hidden>
                {item.icon}
              </span>
              <span className="hidden lg:inline">{t(item.labelKey)}</span>
            </Link>
            {item.children && (
              <div className="hidden lg:block ms-9 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      isActive(pathname, child.href)
                        ? 'text-accent-primary'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {t(child.labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
