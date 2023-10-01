import { dashboardConfig } from '@src/config/dashboard';
import { redirect } from 'next/navigation';

import { provideSessionAttributes } from '@src/hooks/use-auth';

// import { SettingTopNav } from '@src/components/layout/navigation/topnav/setting-top-nav';
import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
import { SettingTopNav } from '@src/components/layout/navigation/topnav/setting-top-nav';
// import { PartyNav } from '@src/components/layout/navigation/topnav/party-nav';
import { UserAccountNav } from '@src/components/layout/navigation/topnav/user-account-nav';

// import { SiteFooter } from '@src/components/layout/site-footer';
import { LayoutProps } from '@src/types/props';

export default async function DiaryLayout({ children, params }: LayoutProps) {
  const sessionData = await provideSessionAttributes();

  if (!sessionData || !sessionData.attributes) {
    redirect('/login');
  }

  params.sessionData = sessionData;

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      <header className='bg-background border-border sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          <SettingTopNav
            redirectHref='/identities'
            redirectTitle='Your identities'
          />
          <UserAccountNav
            user={{
              name: sessionData.attributes.name,
              image: null,
              email: sessionData.attributes.email,
            }}
          />
        </div>
      </header>
      <div className='bg-accent container grid min-w-full flex-1 gap-12 md:grid-cols-[230px_1fr]'>
        <aside className='border-border -ml-8 hidden h-screen w-[250px] flex-col border-r bg-white px-2 pl-[-2rem] md:flex'>
          <div className='mt-6'>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              // prettier-ignore
              <IdentitiesNav items={dashboardConfig.userNav}/>
            }
          </div>
        </aside>
        <main className='-ml-8 flex w-full flex-col overflow-hidden'>
          {children}
        </main>
      </div>
      {/* <SiteFooter className='bg-background border-border invisible sticky bottom-0 z-40 w-full border-t md:visible' /> */}
    </div>
  );
}
