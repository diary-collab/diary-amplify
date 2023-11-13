import { redirect } from 'next/navigation';

import { provideSessionAttributes } from '@src/hooks/use-auth';

// import { PartyNav } from '@src/components/layout/navigation/topnav/party-nav';
import { UserAccountNav } from '@src/components/layout/navigation/topnav/user-account-nav';

// import { SiteFooter } from '@src/components/layout/site-footer';
import { LayoutProps } from '@src/types/props';

export default async function IdentitiesLayout({
  children,
  params,
}: LayoutProps) {
  const sessionData = await provideSessionAttributes();

  if (!sessionData || !sessionData.attributes) {
    redirect('/login');
  }

  params.sessionData = sessionData;

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      <header className='bg-background border-border sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-end py-4 md:mx-10 lg:mx-12'>
          {/* <PartyNav /> */}
          <UserAccountNav
            user={{
              name: sessionData.attributes.name,
              image: null,
              email: sessionData.attributes.email,
            }}
          />
        </div>
        {children}
      </header>

      {/* <SiteFooter className='bg-background border-border invisible sticky bottom-0 z-40 w-full border-t md:visible' /> */}
    </div>
  );
}
