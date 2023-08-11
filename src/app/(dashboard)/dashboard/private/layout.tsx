import { dashboardConfig } from '@src/config/dashboard';
import { redirect } from 'next/navigation';

import { provideSessionData } from '@src/hooks/use-auth';

import { MainNav } from '@src/components/layout/navigation/main-nav';
import { DashboardNav } from '@src/components/layout/navigation/nav';
import { UserAccountNav } from '@src/components/layout/navigation/user-account-nav';
import { SiteFooter } from '@src/components/layout/site-footer';

interface PrivateDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateDashboardLayout({
  children,
}: PrivateDashboardLayoutProps) {
  const sessionData = await provideSessionData();

  if (!sessionData || !sessionData.attributes) {
    redirect('/login');
  }

  if (!sessionData.jwt) {
    //redirect lengkapi profil
  }

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      <header className='bg-background border-border sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: sessionData.attributes.name,
              image: null,
              email: sessionData.attributes.email,
            }}
          />
        </div>
      </header>
      <div className='container grid min-h-screen min-w-full flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='border-border hidden w-[250px] flex-col border-r pr-2 md:flex'>
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
      <SiteFooter className='bg-background border-border sticky bottom-0 z-40 mt-8 w-full border-t' />
    </div>
  );
}
