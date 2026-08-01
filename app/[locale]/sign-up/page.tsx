import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { signUpWithPassword } from '@/lib/actions/auth';
import { Link } from '@/i18n/navigation';

export default async function SignUpPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale } = await params;
  const { error } = await searchParams;
  const t = await getTranslations('auth');

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(`/${locale}`);

  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-lg border border-divider bg-bg-panel p-8">
        <h1 className="font-display text-2xl font-semibold text-text-primary">
          {t('signUp.title')}
        </h1>
        <p className="mt-1 text-sm text-text-muted">{t('signUp.subtitle')}</p>

        {error && (
          <p className="mt-4 rounded-md bg-accent-secondary/10 p-3 text-sm text-accent-secondary">
            {t('genericError')}
          </p>
        )}

        <form action={signUpWithPassword} className="mt-6 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div>
            <label className="block text-sm text-text-muted" htmlFor="email">
              {t('email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-divider bg-bg-panel-raised px-3 py-2 text-sm text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-text-muted" htmlFor="password">
              {t('password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-md border border-divider bg-bg-panel-raised px-3 py-2 text-sm text-text-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-accent-primary px-3 py-2 text-sm font-medium text-bg-base hover:opacity-90"
          >
            {t('signUp.cta')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          {t('haveAccount')}{' '}
          <Link href="/sign-in" className="text-accent-primary hover:underline">
            {t('signIn.cta')}
          </Link>
        </p>
      </div>
    </div>
  );
}
