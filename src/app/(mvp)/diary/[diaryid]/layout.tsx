/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWithSSRContext } from '@src/contexts/amplifycontext/amplifyssr';
import { getDiary } from '@src/graphql/queries';
import { graphqlOperation } from 'aws-amplify';
import { redirect } from 'next/navigation';

import { provideSessionAttributes } from '@src/hooks/use-auth';

// import { SettingNav } from '@src/components/layout/navigation/sidenav/setting-nav';
import { SettingTopNav } from '@src/components/layout/navigation/topnav/setting-top-nav';
import { SiteFooter } from '@src/components/layout/site-footer';

import { SessionData } from '@src/types/use-session';

interface LayoutDiaryIdProps {
  children: React.ReactNode;
  params: {
    sessionData: SessionData | null;
    data: any;
    diaryid: string;
  };
}

export default async function DiaryPageLayout({
  children,
  params,
}: LayoutDiaryIdProps) {
  const SSR = getWithSSRContext();
  const sessionData = await provideSessionAttributes();

  if (!params.diaryid) {
    redirect('/diary');
  }

  const { data } = await SSR.API.graphql(
    graphqlOperation(getDiary, { diaryId: params.diaryid })
  );

  // params.sessionData = sessionData;
  if (data?.getDiary?.diaryName) {
    params.data = data.getDiary.diaryName;
  }

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      <header className='bg-background border-border sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          {!sessionData || !sessionData.attributes ? (
            <div className='flex flex-row items-center justify-center space-x-2'>
              <p>Diary</p>
            </div>
          ) : (
            <SettingTopNav redirectHref='/diary' redirectTitle='Diaries' />
          )}
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
            Diary
          </div>
        </aside>
        <main className='mx-0 mt-6 flex w-full flex-1 flex-col overflow-hidden md:mx-4'>
          {children}
        </main>
      </div>
      <SiteFooter className='bg-background border-border invisible sticky bottom-0 z-40 mt-8 w-full border-t md:visible' />
    </div>
  );
}
