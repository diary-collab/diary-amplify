'use client';

import { dashboardConfig } from '@src/config/dashboard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAccount } from '@src/hooks/use-account';

import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import Banner from '@src/components/default-banner';
import { EmptyPlaceholder } from '@src/components/empty-placeholder';
import { IdentityItem } from '@src/components/identity-item';
import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
import { PostCreateButton } from '@src/components/post-create-button';

// import { IdentityItem } from '@src/components/identity-item';
// import { IdentitiesNav } from '@src/components/layout/navigation/sidenav/identities-nav';
// import { PostCreateButton } from '@src/components/post-create-button';
import IdentityLoading from './loading';

import { IDiariesByIdentity } from '@src/types/apiresponse/diaries';
// import { useAccount } from '@src/hooks/use-account';
import { SessionData } from '@src/types/use-session';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/ButtonLink';
// import clsxm from '@src/lib/clsxm';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function DiaryPage({
  params,
}: {
  params: {
    sessionData: SessionData;
  };
}) {
  const router = useRouter();
  const [diariesByIdentity, setDiariesByIdentity] =
    useState<IDiariesByIdentity | null>(null);
  const { data, isValidating } = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  const [partyId, setPartyId] = useState<string | null>(null);
  const [fetchingdata, setFetchingData] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  if (!partyId || !setFetchingData || !setDiariesByIdentity || !params) {
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
      <aside className='border-border hidden h-screen w-[220px] flex-col border-r pr-2 md:flex'>
        <div className='mt-6'>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // prettier-ignore
            <IdentitiesNav items={dashboardConfig.diariesNav}/>
          }
        </div>
      </aside>
      <main className='mx-auto mt-6 flex w-full max-w-[1960px] flex-1 flex-col overflow-hidden p-4 md:mx-4'>
        {!isValidating && showBanner && (
          <Banner className='mb-8' variant='alert' />
        )}
        <DashboardShell>
          <DashboardHeader heading='Diaries' text='Select your diaries here.'>
            {/* <PostCreateButton disabled={true} className='cursor-not-allowed' /> */}
          </DashboardHeader>
          <div>
            {!mounted && fetchingdata ? (
              <>
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
                <IdentityItem.Skeleton />
              </>
            ) : (
              <div className='columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4'>
                <div className='after:content shadow-highlight after:shadow-highlight text-foreground/85 bg-foreground/10 relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg px-6 pb-16 pt-64 text-center after:pointer-events-none after:absolute after:inset-0 after:rounded-lg lg:pt-0'>
                  <div className='bg-foreground/10 absolute inset-0 flex items-center justify-center'>
                    <span className='flex max-h-full max-w-full items-center justify-center'>
                      {/* <Bridge /> */}
                    </span>
                    <span className='from-foreground/0 via-foreground to-foreground absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b opacity-20'></span>
                  </div>
                  {/* <Logo /> */}
                  <EmptyPlaceholder.Icon name='post' />
                  <h1 className='mb-4 mt-8 text-base font-bold uppercase tracking-widest'>
                    {diariesByIdentity?.diaries?.length ?? 0 > 0
                      ? 'Ada diary'
                      : `No Diaries Found!`}
                  </h1>
                  <p className='text-foreground/75 max-w-[40ch] sm:max-w-[32ch]'>
                    {diariesByIdentity?.diaries?.length ?? 0 > 0
                      ? 'Select or create your new diary. Start collaborate to whoever you wanted to, or you can keep your secret by yourself.'
                      : `Create your first diary now. Your diary will be private to you by default unless you want to share it to another Party.`}
                  </p>
                  <PostCreateButton variant='invertdefault' className='z-40' />
                </div>
                {/* {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))} */}
              </div>
            )}
          </div>
        </DashboardShell>
      </main>
    </>
  );
}
