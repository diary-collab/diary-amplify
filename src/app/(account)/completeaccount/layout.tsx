import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { provideSessionData } from '@src/hooks/use-auth';

import { LayoutProps } from '@src/types/props';
// import { redirect } from 'next/navigation';

// import { provideSessionData } from '@src/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Account Completion',
  description: 'Complete your account to start in project diary',
};

export default async function AuthLayout({ children, params }: LayoutProps) {
  const sessionData = await provideSessionData();

  if (!sessionData || !sessionData.attributes || !sessionData.jwt) {
    redirect('/login');
  }
  params.sessionData = sessionData;

  return <div className='min-h-max'>{children}</div>;
}
