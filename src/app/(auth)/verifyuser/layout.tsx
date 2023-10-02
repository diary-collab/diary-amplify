import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { provideSessionAttributes } from '@src/hooks/use-auth';

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
  const sessionData = await provideSessionAttributes();

  if (sessionData && sessionData.attributes) {
    redirect('/identities');
  }

  // if (!sessionData.jwt) {
  //   //redirect lengkapi profil
  // }

  return <div className='min-h-screen'>{children}</div>;
}
