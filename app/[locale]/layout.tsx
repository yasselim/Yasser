import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Space_Grotesk, Inter, IBM_Plex_Sans_Arabic, JetBrains_Mono } from 'next/font/google';
import { routing, rtlLocales } from '@/i18n/routing';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import BottomTabBar from '@/components/BottomTabBar';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Health & Labs',
  description: 'Track your weight, diet, and lab results — understand what they mean.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as (typeof rtlLocales)[number]) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} data-theme="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexArabic.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex h-dvh overflow-hidden bg-bg-base">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <TopBar />
              <main className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</main>
            </div>
          </div>
          <BottomTabBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
