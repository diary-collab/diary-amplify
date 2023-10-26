import { Metadata } from 'next';

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return <div className='min-h-screen'>{children}</div>;
}
