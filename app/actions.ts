'use server';

import { auth } from 'lib/auth';
import { type Session } from 'next-auth';

import { revalidatePath } from 'next/cache';

async function getSession(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}
