import type { User } from '@supabase/supabase-js';
import { prisma } from './prisma';

export async function ensureProfile(user: User) {
  return prisma.profile.upsert({
    where: { id: user.id },
    create: { id: user.id, email: user.email ?? '' },
    update: {},
  });
}
