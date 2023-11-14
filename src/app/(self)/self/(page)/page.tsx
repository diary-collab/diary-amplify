'use client';

import { dashboardConfig } from '@src/config/dashboard';
import { formatDate } from '@utils/date-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import logger from '@src/lib/logger';

import { DashboardHeader } from '@src/components/dashboard-header';
import { IdentityItem } from '@src/components/identity-item';
import { DefaultSideNav } from '@src/components/layout/navigation/sidenav/default-side-nav';
import Typography from '@src/components/typography/default-typography';
import { UserAvatar } from '@src/components/user-avatar';

import IdentityLoading from './loading';

import { MiddlewareReturn, SessionData } from '@src/types/use-session';

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
    accountData: MiddlewareReturn | null;
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
                <DashboardHeader
                  heading='Account'
                  text='See and manage your account here'
                  small={true}
                >
                  {/* <PostCreateButton disabled={true} className='cursor-not-allowed' /> */}
                </DashboardHeader>

                <div className='text-foreground bg-background container mb-5 mt-7 flex flex-col justify-center rounded-lg py-10'>
                  <div className='flex flex-row items-start justify-start gap-4'>
                    <UserAvatar
                      user={{
                        name: params.sessionData?.attributes?.name || null,
                        image: null,
                      }}
                      className='border-muted h-10 w-10 border-2'
                    />

                    <div className='grid'>
                      <Link
                        href={`/diary/${'diaryId'}`}
                        className='font-semibold hover:underline'
                      >
                        {params.sessionData?.attributes?.name}
                      </Link>
                      <div>
                        {params.accountData?.body?.createdAt && (
                          <p className='text-muted-foreground text-sm'>
                            {`Identity created at: ${formatDate(
                              params.accountData.body?.createdAt.toString() ||
                                ''
                            )}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* --------------------- divider --------------------- */}
                  <div className='my-4 border-t border-gray-300'></div>
                  {/* --------------------- divider --------------------- */}
                  <div className='flex flex-col items-start justify-start gap-2'>
                    <div>
                      <Typography variant='h2' color='theme'>
                        Login details
                      </Typography>
                      <Typography variant='b3' color='theme'>
                        You can login to your account with either email or
                        username
                      </Typography>
                    </div>

                    <div>
                      <Typography variant='s2' color='theme'>
                        Your email is:
                      </Typography>
                      <Typography variant='b3' color='theme'>
                        {params.sessionData?.attributes?.email}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='s2' color='theme'>
                        Your username is:
                      </Typography>
                      <Typography variant='b3' color='theme'>
                        {params.sessionData?.attributes?.nickname}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
