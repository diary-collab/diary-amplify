'use client';

import { verifyUser } from '@utils/auth-utils';
import { notFound, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import logger from '@src/lib/logger';

import TextButton from '@src/components/buttons/text-button';
import { Icons } from '@src/components/default-icons';
import UnstyledLink from '@src/components/links/unstyled-link';

type VerifyUsageState = {
  success: boolean;
  message?: string | null;
  loading: boolean;
};

type ExternalFunctionProps = {
  content: string;
};

const ErrorVerifyUser = ({ content }: ExternalFunctionProps) => {
  return (
    <>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.userx className='mx-auto h-12 w-12' />
        <h1 className='text-danger text-2xl font-semibold tracking-tight'>
          Something bad happened,
        </h1>
        <p className='text-foreground mt-4 text-2xl'>{content}</p>
      </div>

      <div className='text-muted-foreground px-8 text-center text-sm'>
        <p className='text-muted-foreground mt-4 px-8 text-center text-sm'>
          <p className='hover:text-brand underline underline-offset-4'>
            If you think this isn't right, please contact our support team!
          </p>
        </p>
      </div>
    </>
  );
};

const SuccessVerifyUser = ({ content }: ExternalFunctionProps) => {
  return (
    <>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.usercheck className='mx-auto h-12 w-12' />
        <h1 className='text-primary-500 text-2xl font-semibold tracking-tight'>
          Welcome aboard, {content}!
        </h1>
        <p className='text-foreground mt-4 text-2xl'>
          Please wait while we <p />
          redirecting you...
        </p>
      </div>

      <div className='text-muted-foreground px-8 text-center text-sm'>
        <p className='text-muted-foreground mt-4 px-8 text-center text-sm'>
          <UnstyledLink
            href='/login'
            className='hover:text-brand underline underline-offset-4'
          >
            Its taking too long? Click here to manually log your account in!
          </UnstyledLink>
        </p>
      </div>
    </>
  );
};

const LoadingVerifyUser = () => {
  return (
    <>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.loading className='mx-auto h-12 w-12' />
        <h1 className='text-foreground text-2xl font-semibold tracking-tight'>
          Verifying...
        </h1>
        <p className='text-foreground mt-4 text-2xl'></p>
      </div>

      <div className='text-muted-foreground px-8 text-center text-sm'>
        <p className='text-muted-foreground mt-4 px-8 text-center text-sm'>
          {/* <UnstyledLink
                href='/login'
                className='hover:text-brand underline underline-offset-4'
              >
                Its taking too long? Click here to manually log your account in!
              </UnstyledLink> */}
        </p>
      </div>
    </>
  );
};

export default function VerifyUserPage() {
  const [pageState, setPageState] = useState<VerifyUsageState>({
    success: false,
    message: 'initial',
    loading: true,
  });

  const queryParams = useSearchParams();

  const router = useRouter();

  const { theme } = useTheme();

  const username = queryParams.get('username');
  const code = queryParams.get('code');

  logger('username: ' + username);
  logger('code: ' + code);

  if (!username || !code) {
    notFound();
  }

  useEffect(() => {
    async function verifyUserEffect(uname: string, verCode: string) {
      setPageState({
        loading: true,
        success: pageState.success,
        message: pageState.message,
      });

      const result = await verifyUser(uname, verCode);

      setPageState({
        loading: false,
        success: result.success,
        message: result.message,
      });

      if (result.success) {
        router.refresh();
        router.push('/login');
      }
    }

    if (!username || !code) {
      return;
    }

    verifyUserEffect(username, code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, code]);

  return (
    <div className='bg-background relative flex min-h-screen min-w-full flex-row items-center justify-center text-center'>
      {/* <section> */}
      <div className='container flex h-screen w-screen flex-col items-center justify-center'>
        <UnstyledLink href='/'>
          <TextButton
            disabled={pageState.loading}
            variant={theme === 'dark' ? 'dark' : 'light'}
            className='absolute left-4 top-4 md:left-8 md:top-8'
          >
            <>
              <Icons.chevronLeft className='mr-2 h-4 w-4' />
              Back
            </>
          </TextButton>
        </UnstyledLink>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px]'>
          {(() => {
            if (pageState.loading) {
              return <LoadingVerifyUser />;
            }

            if (pageState.success) {
              return <SuccessVerifyUser content={username as string} />;
            }

            return (
              <ErrorVerifyUser
                content={
                  pageState.message
                    ? pageState.message
                    : 'Unknown error occurred.'
                }
              />
            );
          })()}
        </div>
      </div>
      {/* </section> */}
      {/* <section> */}
      <footer className='absolute bottom-2 text-gray-700'>
        © {new Date().getFullYear()} By{' '}
        <UnstyledLink href='/'>Azzam</UnstyledLink>
      </footer>
      {/* </section> */}
    </div>
  );
}
