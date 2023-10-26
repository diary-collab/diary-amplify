'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// import logger from '@src/lib/logger';
import { useAccount } from '@src/hooks/use-account';

import TextButton from '@src/components/buttons/text-button';
import { Icons } from '@src/components/default-icons';
import UnstyledLink from '@src/components/links/unstyled-link';

import CompleteAccountForm from './completeaccountform';
import CompleteAccountLoading from './loading';

import { SessionData } from '@src/types/use-session';

export default function CompleteAccountPage({
  params,
}: {
  params: {
    sessionData: SessionData;
  };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  // const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);

  const router = useRouter();

  const { data, isLoading, error } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !error && data && data.code >= 200 && data.code <= 299) {
      router.push('/identities');
    } else {
      return;
    }
  }, [isLoading, error, data, router]);

  if (!mounted) {
    return <CompleteAccountLoading />;
  }

  return (
    <div className='bg-background relative flex min-h-max min-w-full flex-row items-center justify-center text-center md:min-h-screen'>
      {/* <section> */}
      <div className='container my-8 flex min-h-max w-screen flex-col items-center justify-center md:my-0'>
        <UnstyledLink href='/identities' className='hidden md:block'>
          <TextButton
            disabled={loading}
            variant={theme === 'dark' ? 'dark' : 'light'}
            className='absolute left-4 top-4 md:left-8 md:top-8'
          >
            <>
              <Icons.chevronLeft className='mr-2 h-4 w-4' />
              Back
            </>
          </TextButton>
        </UnstyledLink>
        <div className='mx-auto flex min-h-screen w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <Icons.secret className='mx-auto h-10 w-10' />
            <h1 className='text-2xl font-semibold tracking-tight'>
              Psst... {' ' + params.sessionData.attributes.name}
            </h1>
            <p className='text-muted-foreground text-sm'>
              Tell us a little about you, it will help you to control your
              account in the future
            </p>
          </div>

          <div className='text-muted-foreground mb-20 px-8 text-center text-sm'>
            <CompleteAccountForm
              loading={loading}
              setLoading={setLoading}
              accountAttributes={params.sessionData.attributes}
            />
            <p className='hover:text-brand mt-4 px-8 text-center text-sm'>
              Don't worry, we won't tell anyone, and neither should you!
            </p>
          </div>
        </div>
      </div>
      {/* </section> */}
      {/* <section> */}
      <footer className='md: absolute bottom-2 hidden text-gray-700 md:block'>
        © {new Date().getFullYear()} By{' '}
        <UnstyledLink href='/'>Azzam</UnstyledLink>
      </footer>
      {/* </section> */}
    </div>
  );
}
