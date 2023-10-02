import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { provideSessionAttributes } from '@src/hooks/use-auth';

import { LayoutProps } from '@src/types/props';
// import { redirect } from 'next/navigation';

// import { provideSessionAttributes } from '@src/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Account Completion',
  description: 'Complete your account to start in project diary',
};

export default async function AuthLayout({ children, params }: LayoutProps) {
  const sessionData = await provideSessionAttributes();

  if (!sessionData || !sessionData.attributes) {
    redirect('/login');
  }
  params.sessionData = sessionData;

  return <div className='min-h-max'>{children}</div>;
}
