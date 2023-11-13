import { redirect } from 'next/navigation';

import { getAccountRequest } from '@src/lib/fetcher/account-fetcher';
import { provideSessionAttributes } from '@src/hooks/use-auth';

// import { SettingTopNav } from '@src/components/layout/navigation/topnav/setting-top-nav';
import { SettingTopNav } from '@src/components/layout/navigation/topnav/setting-top-nav';
// import { PartyNav } from '@src/components/layout/navigation/topnav/party-nav';
import { UserAccountNav } from '@src/components/layout/navigation/topnav/user-account-nav';

// import { SiteFooter } from '@src/components/layout/site-footer';
import { LayoutProps } from '@src/types/props';

export default async function SelfAccountLayout({
  children,
  params,
}: LayoutProps) {
  const sessionData = await provideSessionAttributes();
  const accountdata = await getAccountRequest();

  if (!sessionData || !sessionData.attributes) {
    redirect('/login');
  }

  params.sessionData = sessionData;
  params.accountData = accountdata;

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      <header className='bg-background border-border sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          <SettingTopNav redirectHref='/' redirectTitle='Back' />
          <UserAccountNav
            user={{
              name: sessionData.attributes.name,
              image: null,
              email: sessionData.attributes.email,
            }}
          />
        </div>
      </header>
      {children}
    </div>
  );
}
