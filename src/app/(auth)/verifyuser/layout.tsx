import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { useamplifyauth } from '@src/hooks/use-auth';

interface VerifyUserLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'Verify User',
  description: 'Verify User',
};

export default async function VerifyUserLayout({
  children,
}: VerifyUserLayoutProps) {
  const userattributes = await useamplifyauth();

  if (userattributes) {
    redirect('/dashboard');
  }

  return <div className='min-h-screen'>{children}</div>;
}
