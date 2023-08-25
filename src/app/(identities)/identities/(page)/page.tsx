'use client';

import { dashboardConfig } from '@src/config/dashboard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { identitiesByParty } from '@src/lib/fetcher/identity-fetcher';
import logger from '@src/lib/logger';
import { useAccount } from '@src/hooks/use-account';

import Banner from '@src/components/Banner';
import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { EmptyPlaceholder } from '@src/components/empty-placeholder';
import { IdentityItem } from '@src/components/identity-item';
import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
import { UserAvatar } from '@src/components/user-avatar';

// import { IdentityItem } from '@src/components/identity-item';
// import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
// import { PostCreateButton } from '@src/components/post-create-button';
import IdentityLoading from './loading';

import { IIdentitiesByParty } from '@src/types/apiresponse/identities';
// import { useAccount } from '@src/hooks/use-account';
import { SessionData } from '@src/types/use-session';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/ButtonLink';
// import clsxm from '@src/lib/clsxm';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function IdentityPage({
  params,
}: {
  params: {
    sessionData: SessionData;
  };
}) {
  const router = useRouter();
  const [listIdentities, setListIdentities] =
    useState<IIdentitiesByParty | null>(null);
  const jwt = params?.sessionData?.jwt ?? '-';
  const { data, isValidating } = useAccount(jwt);
  const [mounted, setMounted] = useState<boolean>(false);
  const [partyId, setPartyId] = useState<string | null>(null);
  const [fetchingdata, setFetchingData] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

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
      setPartyId(data.partyid);
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
    logger('triggered get list identities' + partyId);
    async function getListIdentities(id: string) {
      setFetchingData(true);
      const listIdentitiesResult = await identitiesByParty(jwt, id);
      const listIdentitiesJson = await listIdentitiesResult.json();

      setFetchingData(false);
      if (
        !listIdentitiesResult.ok ||
        !listIdentitiesJson ||
        !listIdentitiesJson.id ||
        !listIdentitiesJson.partyIdProvided ||
        listIdentitiesJson.partyIdProvided.length < 1
      ) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
        setListIdentities(listIdentitiesJson);
        // router.push(`/identities/${listIdentitiesJson.partyIdProvided[0].id}`);
      }
    }

    if (partyId && jwt) {
      logger('triggered true get list identities');
      getListIdentities(partyId);
    }
  }, [partyId, jwt, router]);

  if (!mounted || isValidating || jwt === '-') {
    return <IdentityLoading />;
  }

  return (
    <>
      <aside className='border-border hidden h-screen w-[220px] flex-col border-r pr-2 md:flex'>
        <div className='mt-6'>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // prettier-ignore
            <IdentitiesNav items={dashboardConfig.identitiesNav}/>
          }
        </div>
      </aside>
      <main className='mx-0 mt-6 flex w-full flex-1 flex-col overflow-hidden md:mx-4'>
        {!isValidating && showBanner && jwt !== '-' && (
          <Banner className='mb-8' variant='alert' />
        )}
        <DashboardShell>
          <DashboardHeader
            heading='Identities'
            text='Select your identities here.'
          >
            {/* <PostCreateButton disabled={true} className='cursor-not-allowed' /> */}
          </DashboardHeader>
          <div>
            {fetchingdata ? (
              <>
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
              </>
            ) : listIdentities?.partyIdProvided ? (
              <div className='divide-border divide-y rounded-md border'>
                {listIdentities.partyIdProvided.map((identity) => {
                  return (
                    <section key={identity.id}>
                      <div className='flex items-start justify-between p-4'>
                        <div className='flex flex-row items-start justify-start gap-4'>
                          <UserAvatar
                            user={{
                              name: identity.identity.fullname || null,
                              image: null,
                            }}
                            className='border-muted h-10 w-10 border-2'
                          />

                          <div className='grid'>
                            <Link
                              href={`/identities/${identity.id}`}
                              className='font-semibold hover:underline'
                            >
                              {identity.identity.fullname}
                            </Link>
                            <div>
                              <p className='text-muted-foreground text-sm'>
                                {identity.provider.partyName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className='divide-border divide-y rounded-md border'>
                <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon name='post' />
                  <EmptyPlaceholder.Title>
                    No identities created
                  </EmptyPlaceholder.Title>
                  <EmptyPlaceholder.Description>
                    You don&apos;t have any identities yet.
                  </EmptyPlaceholder.Description>
                  {/* <PostCreateButton variant='outline' /> */}
                  {/* Add post */}
                </EmptyPlaceholder>
              </div>
            )}
          </div>
        </DashboardShell>
      </main>
    </>
  );
}
