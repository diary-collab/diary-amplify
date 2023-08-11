'use client';

// import logger from '@src/lib/logger';
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import logger from '@src/lib/logger';
import { useAccount } from '@src/hooks/use-account';

import Banner from '@src/components/Banner';
import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { EmptyPlaceholder } from '@src/components/empty-placeholder';
import { PostCreateButton } from '@src/components/post-create-button';

import { SessionData } from '@src/types/use-session';

export default function Dashboard({
  params,
}: {
  params: {
    sessionData: SessionData;
  };
}) {
  // const router = useRouter();
  const content = false;
  const { data, isLoading, error } = useAccount(params.sessionData.jwt);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <>
      {(error || (data && data.code && (data.code < 200 || data.code > 200))) &&
        !isLoading && <Banner className='mb-8' variant='alert' />}

      <DashboardShell>
        <DashboardHeader heading='Pages' text='Create and manage diary page.'>
          <PostCreateButton />
          {/* Add Page */}
        </DashboardHeader>
        <div>
          {content ? (
            <div className='divide-border divide-y rounded-md border'>
              Content here
            </div>
          ) : (
            <div className='divide-border divide-y rounded-md border'>
              <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name='post' />
                <EmptyPlaceholder.Title>
                  No posts created
                </EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  You don&apos;t have any posts yet. Start creating content.
                </EmptyPlaceholder.Description>
                <PostCreateButton variant='outline' />
                {/* Add post */}
              </EmptyPlaceholder>
            </div>
          )}
        </div>
      </DashboardShell>
    </>
  );
}
