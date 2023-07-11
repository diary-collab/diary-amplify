import { dashboardConfig } from '@src/config/dashboard';
import { redirect } from 'next/navigation';

import logger from '@src/lib/logger';
import { useamplifyauth } from '@src/hooks/use-auth';

import { MainNav } from '@src/components/layout/navigation/main-nav';
import { DashboardNav } from '@src/components/layout/navigation/nav';
import { UserAccountNav } from '@src/components/layout/navigation/user-account-nav';
import { SiteFooter } from '@src/components/layout/site-footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const userattributes = await useamplifyauth();

  if (!userattributes) {
    redirect('/login');
  }

  logger('authent: ' + JSON.stringify(userattributes, null, 4));

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      <header className='bg-background sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: userattributes.name,
              image: null,
              email: userattributes.email,
            }}
          />
        </div>
      </header>
      <div className='container grid min-h-screen min-w-full flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[250px] flex-col border-r pr-2 md:flex'>
          <div className='mt-6'>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              // prettier-ignore
              <DashboardNav items={dashboardConfig.sidebarNav}/>
            }
          </div>
        </aside>
        <main className='mx-0 mt-6 flex w-full flex-1 flex-col overflow-hidden md:mx-4'>
          {children}
        </main>
      </div>
      <SiteFooter className='bg-background sticky bottom-0 z-40 mt-8 w-full border-t' />
    </div>
  );
}
