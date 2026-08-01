'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const locale = String(formData.get('locale') ?? 'en');

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/${locale}/sign-in?error=1`);
  }

  redirect(`/${locale}`);
}

export async function signUpWithPassword(formData: FormData) {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const locale = String(formData.get('locale') ?? 'en');

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/${locale}/sign-up?error=1`);
  }

  redirect(`/${locale}/sign-in?message=check-email`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
