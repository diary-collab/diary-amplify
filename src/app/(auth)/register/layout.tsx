import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { provideSessionData } from '@src/hooks/use-auth';

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'Register',
  description: 'Register your account',
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const sessionData = await provideSessionData();

  if (sessionData && sessionData.attributes) {
    redirect('/dashboard');
  }

  return <div className='min-h-screen'>{children}</div>;
}
