import { Metadata } from 'next';

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return <div className='min-h-screen'>{children}</div>;
}
