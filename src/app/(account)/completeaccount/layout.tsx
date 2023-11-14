import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getAccountRequestServer } from '@src/lib/fetcher/server/account-fetcher-server';
import { provideSessionAttributes } from '@src/hooks/use-auth';

import { LayoutProps } from '@src/types/props';
// import logger from '@src/lib/logger';
// import { redirect } from 'next/navigation';

// import { provideSessionAttributes } from '@src/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Account Completion',
  description: 'Complete your account to start in project diary',
};

export default async function AuthLayout({ children, params }: LayoutProps) {
  const sessionData = await provideSessionAttributes();
  const accountdata = await getAccountRequestServer();

  // logger(accountdata);

  if (!sessionData || !sessionData.attributes) {
    redirect('/login');
  }

  if (accountdata && accountdata.isSuccess) {
    // logger('harusnya redirect ke complete account');
    redirect('/self');
  }

  params.sessionData = sessionData;
  params.accountData = accountdata;

  return <div className='min-h-max'>{children}</div>;
}
