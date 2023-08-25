'use client';

import { dashboardConfig } from '@src/config/dashboard';
import { formatDate } from '@utils/date-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getIdentitiesById } from '@src/lib/fetcher/identity-fetcher';
import { useAccount } from '@src/hooks/use-account';

import { DashboardShell } from '@src/components/dashboard-shell';
import Banner from '@src/components/default-banner';
import { EmptyPlaceholder } from '@src/components/empty-placeholder';
import { IdentityItem } from '@src/components/identity-item';
// import { IdentityItem } from '@src/components/identity-item';
import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
import { SettingTopNav } from '@src/components/layout/navigation/topnav/setting-top-nav';
import { UserAccountNav } from '@src/components/layout/navigation/topnav/user-account-nav';
import ButtonLink from '@src/components/links/button-link';
import Typography from '@src/components/typography/default-typography';

import IdentityLoading from './loading';

import { IGetIdentityByID } from '@src/types/apiresponse/identities';
// import { useAccount } from '@src/hooks/use-account';
import { SessionData } from '@src/types/use-session';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/ButtonLink';
// import clsxm from '@src/lib/clsxm';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function IdentityDetailPage({
  params,
}: {
  params: {
    sessionData: SessionData;
    identitiesid: string;
  };
}) {
  const router = useRouter();

  const jwt = params?.sessionData?.jwt ?? '-';
  const { data, isValidating } = useAccount(jwt);
  const [mounted, setMounted] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [identity, setIdentity] = useState<IGetIdentityByID | null>(null);
  const [fetchingdata, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (jwt === '-') {
      setFetchingData(true);
      router.refresh();
    }
  }, [jwt, router]);

  useEffect(() => {
    if (isValidating || fetchingdata) {
      setShowBanner(false);
      return;
    }

    if (data.partyid) {
      //kalau ada data party id, dan gak expired, dan partyid masih kosong, set partyid
      setShowBanner(false);
      return;
    }

    if (
      data.message &&
      (data.message === 'TokenExpiredError: jwt expired' ||
        data.message === 'JsonWebTokenError: jwt malformed')
    ) {
      setShowBanner(false);
      // router.refresh();
      return;
    }

    if (!data || !data.partyid) {
      //kalau data gak ada partyid, show banner
      setShowBanner(true);
      return;
    }
  }, [isValidating, data, fetchingdata, router]);

  useEffect(() => {
    async function getIdentityByIdHook(id: string) {
      setFetchingData(true);
      const getIdResult = await getIdentitiesById(jwt, id);
      const getIdJson = await getIdResult.json();

      setFetchingData(false);
      if (!getIdResult.ok || !getIdJson || !getIdJson.id) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
        setIdentity(getIdJson);
        // router.push(`/identities/${listIdentitiesJson.partyIdProvided[0].id}`);
      }
    }

    if (params.identitiesid && jwt) {
      getIdentityByIdHook(params.identitiesid);
    }
  }, [jwt, params.identitiesid, router]);

  if (!mounted || isValidating || jwt === '-') {
    return <IdentityLoading />;
  }

  return (
    <>
      <header className='bg-background border-border sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          <SettingTopNav
            redirectHref={
              identity
                ? `/identities/${params.identitiesid}/diaries`
                : '/identities'
            }
            redirectTitle={identity ? 'Diaries' : 'Identities'}
          />
          <UserAccountNav
            user={{
              name: params.sessionData.attributes.name,
              image: null,
              email: params.sessionData.attributes.email,
            }}
          />
        </div>
      </header>
      <div className='container grid min-h-screen min-w-full flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='border-border hidden w-[220px] flex-col border-r pr-2 md:flex'>
          <div className='mt-6'>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              // prettier-ignore
              <IdentitiesNav items={dashboardConfig.identitiesIdNav}/>
            }
          </div>
        </aside>
        <main className='mx-0 mt-6 flex w-full flex-1 flex-col overflow-hidden md:mx-4'>
          {showBanner && <Banner className='mb-8' variant='alert' />}
          <DashboardShell>
            <div>
              {fetchingdata ? (
                <>
                  <IdentityItem.Skeleton />
                  <IdentityItem.Skeleton />
                  <IdentityItem.Skeleton />
                  <IdentityItem.Skeleton />
                  <IdentityItem.Skeleton />
                </>
              ) : identity ? (
                <div className='flex flex-col items-start justify-start gap-4 rounded-md border p-4'>
                  <div>
                    <Typography variant='h3'>Identity detail</Typography>
                    <Typography variant='s2'>{`Last updated at: ${formatDate(
                      identity.updatedAt.toString()
                    )}`}</Typography>
                  </div>
                  <div>
                    <Link href='/identities'>
                      <Typography variant='h4'>Identity</Typography>
                    </Link>
                    <div className='px-4 py-2'>
                      {Object.entries(identity.identity).map(
                        ([key, value]) =>
                          key !== 'identityType' &&
                          key !== 'providerName' && (
                            <div key={key}>
                              <Typography variant='s3'>
                                {key}: {value}
                              </Typography>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <div>
                    <Typography variant='h4'>Identity Provider</Typography>
                    <div className='px-4 py-2'>
                      {Object.entries(identity.provider).map(
                        ([key, value]) =>
                          key !== 'identityType' &&
                          key !== 'providerName' && (
                            <div key={key}>
                              <Typography variant='s3'>
                                {key}: {value.toString()}
                              </Typography>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='divide-border divide-y rounded-md border'>
                  <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name='userx' />
                    <EmptyPlaceholder.Title>
                      Something&apos;s missing...
                    </EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                      Seems like we can&apos;t find any identity you are looking
                      for...
                    </EmptyPlaceholder.Description>
                    <ButtonLink href='/identities'>Back to Identity</ButtonLink>
                  </EmptyPlaceholder>
                </div>
              )}
            </div>
          </DashboardShell>
        </main>
      </div>
    </>
  );
}
