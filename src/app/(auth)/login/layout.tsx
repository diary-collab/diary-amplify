import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { useamplifyauth } from '@src/hooks/use-auth';

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const userattributes = await useamplifyauth();

  if (userattributes) {
    redirect('/dashboard');
  }

  return <div className='min-h-screen'>{children}</div>;
}
