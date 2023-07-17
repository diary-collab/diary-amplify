'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import logger from '@src/lib/logger';

import TextButton from '@src/components/buttons/TextButton';
import { Icons } from '@src/components/icons';
import UnstyledLink from '@src/components/links/UnstyledLink';

import ConfirmForgotPasswordForm from './confirmforgotpasswordrequestform';
import ForgotPasswordRequestForm from './forgotpasswordrequestform';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const { theme } = useTheme();

  useEffect(() => {
    logger('request sent: ' + requestSent);
  }, [requestSent]);

  return (
    <div className='bg-background relative flex min-h-screen flex-row items-center justify-center text-center'>
      {/* <section> */}
      <div className='container flex h-screen w-screen flex-col items-center justify-center'>
        <UnstyledLink href='/'>
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
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            {requestSent ? (
              <Icons.footprint className='mx-auto h-10 w-10' />
            ) : (
              <Icons.frown className='mx-auto h-10 w-10' />
            )}

            <h1 className='text-2xl font-semibold tracking-tight'>
              {requestSent ? 'One more step...' : 'Sorry for your lost...'}
            </h1>
            <p className='text-muted-foreground text-sm'>
              {requestSent
                ? 'Finish your request and get your account back!'
                : 'Let us help you recover your account'}
            </p>
          </div>

          <div className='text-muted-foreground px-8 text-center text-sm'>
            {requestSent ? (
              <ConfirmForgotPasswordForm
                loading={loading}
                setLoading={setLoading}
                username={username}
                setRequestSent={setRequestSent}
              />
            ) : (
              <ForgotPasswordRequestForm
                setUsername={setUsername}
                loading={loading}
                setLoading={setLoading}
                setRequestSent={setRequestSent}
              />
            )}

            <p className='text-muted-foreground mt-4 px-8 text-center text-sm'>
              <UnstyledLink
                href='/login'
                className='hover:text-brand underline underline-offset-4'
              >
                Back to Login
              </UnstyledLink>
              <p className='my-2'></p>
              <UnstyledLink
                href='/register'
                className='hover:text-brand underline underline-offset-4'
              >
                Don&apos;t have an account? Sign Up!
              </UnstyledLink>
            </p>
          </div>
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
