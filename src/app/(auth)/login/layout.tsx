import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginPageLayout({ children }: LoginLayoutProps) {
  return <div>{children}</div>;
}
