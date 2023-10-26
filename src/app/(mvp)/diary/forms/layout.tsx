// import { getWithSSRContext } from '@src/contexts/amplifycontext/amplifyssr';
// import { listDiaries } from '@src/graphql/queries';
// import { graphqlOperation } from 'aws-amplify';
import { redirect } from 'next/navigation';

import { provideSessionAttributes } from '@src/hooks/use-auth';

// import { SettingNav } from '@src/components/layout/navigation/sidenav/setting-nav';
import { SettingTopNav } from '@src/components/layout/navigation/topnav/setting-top-nav';
import { UserAccountNav } from '@src/components/layout/navigation/topnav/user-account-nav';

import { LayoutProps } from '@src/types/props';

export default async function DiaryFormLayout({
  children,
  params,
}: LayoutProps) {
  // const SSR = getWithSSRContext();
  const sessionData = await provideSessionAttributes();

  if (!sessionData || !sessionData.attributes) {
    redirect('/login');
  }

  // const { data } = await SSR.API.graphql(graphqlOperation(listDiaries));
  // params.sessionData = sessionData;
  // params.data = data;

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      <header className='bg-background border-border sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          <SettingTopNav redirectHref='/diary' redirectTitle='Diaries' />
          <UserAccountNav
            user={{
              name: sessionData.attributes.name,
              image: null,
              email: sessionData.attributes.email,
            }}
          />
        </div>
      </header>
      <div className='container grid min-h-screen min-w-full flex-1 gap-12 md:grid-cols-[100px_1fr]'>
        <aside className='border-border hidden w-[100px] flex-col border-r pr-2 md:flex'>
          <div className='mt-6'>
            {/* {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              // prettier-ignore
              <SettingNav party={{id: '123', partyType: 'self'}}/>
            } */}
            Admin
          </div>
        </aside>
        <main className='mx-0 mt-6 flex w-full flex-1 flex-col overflow-hidden md:mx-4'>
          {children}
        </main>
      </div>
      {/* <SiteFooter className='bg-background border-border invisible sticky bottom-0 z-40 mt-8 w-full border-t md:visible' /> */}
    </div>
  );
}
