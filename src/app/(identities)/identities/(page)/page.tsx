'use client';

// import { dashboardConfig } from '@src/config/dashboard';
import { dashboardConfig } from '@src/config/dashboard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { identitiesByParty } from '@src/lib/fetcher/identity-fetcher';
import logger from '@src/lib/logger';
import { useAccount } from '@src/hooks/use-account';

import { DashboardHeader } from '@src/components/dashboard-header';
import Banner from '@src/components/default-banner';
import { EmptyPlaceholder } from '@src/components/empty-placeholder';
import { IdentityItem } from '@src/components/identity-item';
import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
import Typography from '@src/components/typography/default-typography';

// import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
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
  const { data, isValidating } = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  const [partyId, setPartyId] = useState<string | null>(null);
  const [fetchingdata, setFetchingData] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  if (!params) {
    //no action, just to ignore warning
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isValidating || fetchingdata) {
      setShowBanner(false);
      return;
    }

    if (data.data?.id) {
      //kalau ada data party id, dan gak expired, dan partyid masih kosong, set partyid
      setPartyId(data.data.id);
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

    if (!data || !data.isSuccess) {
      //kalau data gak ada partyid, show banner
      setShowBanner(true);
      return;
    }
  }, [isValidating, data, fetchingdata, router]);

  useEffect(() => {
    logger('triggered get list identities' + partyId);
    async function getListIdentities(id: string) {
      setFetchingData(true);
      const listIdentitiesResult = await identitiesByParty(id);
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
        //di comment karena biar user pilih aja dulu identity yang mau dia pilih
        // router.push(`/identities/${listIdentitiesJson.partyIdProvided[0].id}`);
      }
    }

    if (partyId) {
      logger('triggered true get list identities');
      getListIdentities(partyId);
    }
  }, [partyId, router]);

  if (!mounted) {
    return <IdentityLoading />;
  }

  return (
    <>
      {!isValidating && showBanner && (
        <Banner className='w-full' variant='alert' />
      )}
      <div className='bg-accent container grid min-w-full flex-1 gap-12 md:grid-cols-[230px_1fr]'>
        <aside className='border-border -ml-8 hidden h-screen w-[250px] flex-col border-r bg-white px-2 pl-[-2rem] md:flex'>
          <div className='mt-6'>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              // prettier-ignore
              <IdentitiesNav items={dashboardConfig.identitiesNav}/>
            }
          </div>
        </aside>
        <main className='-ml-8 flex w-full flex-col overflow-hidden'>
          <div className='mt-8 flex max-w-[650px] flex-col justify-center'>
            <DashboardHeader
              heading='Identities'
              text='List identities provided to you'
              small={true}
            >
              {/* <PostCreateButton disabled={true} className='cursor-not-allowed' /> */}
            </DashboardHeader>
            <div className='text-foreground bg-background container mb-5 mt-7 flex flex-col justify-center rounded-lg py-10'>
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
                  <div className='px-4 py-4'>
                    <Typography
                      variant='h4'
                      color='theme'
                    >{`${data.data.partyAttributes.name}'s identities from...`}</Typography>
                  </div>

                  {listIdentities.partyIdProvided.map((identity, index) => {
                    return (
                      <section key={identity.id}>
                        <div className='flex items-start justify-between p-4'>
                          <div className='flex flex-row items-start justify-start gap-4'>
                            <div className='grid'>
                              <Link
                                href={`/identities/${identity.id}`}
                                className='font-semibold hover:underline'
                              >
                                {`${index + 1}. ${identity.provider.partyName}`}
                              </Link>
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
          </div>
        </main>
      </div>
      {/* {!isValidating && showBanner && (
        <Banner className='z-10 mb-8 w-full' variant='alert' />
      )} */}
    </>
  );
}
