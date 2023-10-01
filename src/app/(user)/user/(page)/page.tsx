'use client';

import { formatDate } from '@utils/date-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAccount } from '@src/hooks/use-account';

import { DashboardHeader } from '@src/components/dashboard-header';
// import { DashboardShell } from '@src/components/dashboard-shell';
import Banner from '@src/components/default-banner';
import { IdentityItem } from '@src/components/identity-item';
import Typography from '@src/components/typography/default-typography';
import { UserAvatar } from '@src/components/user-avatar';

// import { IdentityItem } from '@src/components/identity-item';
// import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
// import { PostCreateButton } from '@src/components/post-create-button';
import IdentityLoading from './loading';

// import { IDiariesByIdentity } from '@src/types/apiresponse/diaries';
// import { useAccount } from '@src/hooks/use-account';
import { SessionData } from '@src/types/use-session';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/ButtonLink';
// import clsxm from '@src/lib/clsxm';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function PartyPage({
  params,
}: {
  params: {
    sessionData: SessionData;
  };
}) {
  const router = useRouter();

  const { data, isValidating } = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  const [partyId, setPartyId] = useState<string | null>(null);
  const [fetchingdata, setFetchingData] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  if (!partyId || !setFetchingData) {
    //no action, just to ignore warning
  }

  //mounted, so we can show page loader before everything ready
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isValidating || fetchingdata) {
      setPartyId(null);
      setShowBanner(false);
      return;
    }

    if (!data || !data.isSuccess) {
      //kalau data gak ada partyid, show banner
      setShowBanner(true);
      setPartyId(null);
      return;
    }

    setShowBanner(false);
    setPartyId(data.data.id);
  }, [isValidating, data, fetchingdata, router]);

  if (!mounted) {
    return <IdentityLoading />;
  }

  return (
    <>
      {!isValidating && showBanner && (
        <Banner className='mb-8' variant='alert' />
      )}
      {/* <DashboardShell className='mt-8 max-w-[650px] justify-center'> */}

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
                    name: params.sessionData.attributes.name || null,
                    image: null,
                  }}
                  className='border-muted h-10 w-10 border-2'
                />

                <div className='grid'>
                  <Link
                    href={`/diary/${'diaryId'}`}
                    className='font-semibold hover:underline'
                  >
                    {params.sessionData.attributes.name}
                  </Link>
                  <div>
                    {data?.data.createdAt && (
                      <p className='text-muted-foreground text-sm'>
                        {`Identity created at: ${formatDate(
                          data.data.createdAt.toString() || ''
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
                    You can login to your account with either email or username
                  </Typography>
                </div>

                <div>
                  <Typography variant='s2' color='theme'>
                    Your email is:
                  </Typography>
                  <Typography variant='b3' color='theme'>
                    {params.sessionData.attributes.email}
                  </Typography>
                </div>
                <div>
                  <Typography variant='s2' color='theme'>
                    Your username is:
                  </Typography>
                  <Typography variant='b3' color='theme'>
                    {params.sessionData.attributes.nickname}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* </DashboardShell> */}
    </>
  );
}
