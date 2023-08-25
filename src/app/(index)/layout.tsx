import { dashboardConfig } from '@src/config/dashboard';
import { Metadata } from 'next';
import Link from 'next/link';

import { clsxm } from '@src/lib/utils';
import { provideSessionData } from '@src/hooks/use-auth';

import { MainNav } from '@src/components/layout/navigation/topnav/main-nav';
import { UserAccountNav } from '@src/components/layout/navigation/topnav/user-account-nav';
import { SiteFooter } from '@src/components/layout/site-footer';

interface IndexPageProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Home',
  description: "Diary project's home",
};

export default async function IndexLayout({ children }: IndexPageProps) {
  const sessionData = await provideSessionData();

  return (
    <>
      {/* <Seo
        templateTitle='Dashboard'
        description='Access your diaries here in your dashboard'
      /> */}
      <div className='flex min-w-full flex-col items-center justify-between'>
        <header className='bg-background z-40 min-w-full shadow-md'>
          <div className='mx-8 flex h-20 items-center justify-between py-6 md:mx-10 lg:mx-12'>
            <MainNav
              items={
                sessionData && sessionData.attributes
                  ? dashboardConfig.mainNavAuth
                  : dashboardConfig.mainNav
              }
            />
            {sessionData && sessionData.attributes ? (
              <>
                <UserAccountNav
                  user={{
                    name: sessionData.attributes.name,
                    image: null,
                    email: sessionData.attributes.email,
                  }}
                />
              </>
            ) : (
              <nav>
                <Link href='/login' className={clsxm('')}>
                  Login
                </Link>
              </nav>
            )}
          </div>
        </header>
        <main className='flex-1'>{children}</main>
        <SiteFooter className='border-t' />
      </div>
    </>
  );
}
