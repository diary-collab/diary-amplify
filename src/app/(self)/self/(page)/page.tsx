/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { dashboardConfig } from '@src/config/dashboard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import logger from '@src/lib/logger';

import { IdentityItem } from '@src/components/identity-item';
import { DefaultSideNav } from '@src/components/layout/navigation/sidenav/default-side-nav';

import IdentityLoading from './loading';

import { SessionData } from '@src/types/use-session';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/ButtonLink';
// import clsxm from '@src/lib/clsxm';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function SelfPage({
  params,
}: {
  params: {
    sessionData: SessionData;
    partyData: any | null;
  };
}) {
  const router = useRouter();

  // const { data, isValidating } = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  const [fetchingdata, setFetchingData] = useState<boolean>(false);

  //mounted, so we can show page loader before everything ready
  useEffect(() => {
    if (!params.sessionData) {
      router.refresh();
    }
    setMounted(true);
    setFetchingData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return <IdentityLoading />;
  }

  logger(params);

  return (
    <>
      {/* {!isValidating && showBanner && (
        <Banner className='sticky top-12 w-full' variant='alert' />
      )} */}
      <div className='bg-accent container grid min-w-full flex-1 gap-12 md:grid-cols-[230px_1fr]'>
        <aside className='border-border bg-background -ml-8 hidden h-screen w-[250px] flex-col border-r px-2 pl-[-2rem] md:flex'>
          <div className='mt-6'>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              // prettier-ignore
              <DefaultSideNav items={dashboardConfig.userNav}/>
            }
          </div>
        </aside>

        <main className='-ml-8 flex w-full flex-col overflow-hidden'>
          <div>
            {fetchingdata ? (
              <>
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
              </>
            ) : (
              <div className='mt-8 flex max-w-[650px] flex-col justify-center'>
                identities
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
