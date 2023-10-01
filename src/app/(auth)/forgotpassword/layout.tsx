import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { provideSessionAttributes } from '@src/hooks/use-auth';

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const sessionData = await provideSessionAttributes();

  if (sessionData && sessionData.attributes) {
    redirect('/identities');
  }

  return <div className='min-h-screen'>{children}</div>;
}
