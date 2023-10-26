import { Metadata } from 'next';

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
  return <div className='min-h-screen'>{children}</div>;
}
