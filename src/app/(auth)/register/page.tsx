'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';

import TextButton from '@src/components/buttons/text-button';
import { Icons } from '@src/components/default-icons';
import UnstyledLink from '@src/components/links/unstyled-link';

import RegisterForm from './authregisterform';

export default function RegisterPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();
  return (
    <div className='bg-background relative flex min-h-screen min-w-full flex-row items-center justify-center text-center'>
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
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <Icons.logo className='mx-auto h-6 w-6' />
            <h1 className='text-2xl font-semibold tracking-tight'>
              Start your journey here
            </h1>
            <p className='text-muted-foreground text-sm'>
              Make your account first, discover us later
            </p>
          </div>

          <div className='text-muted-foreground px-8 text-center text-sm'>
            <RegisterForm loading={loading} setLoading={setLoading} />
            <p className='text-muted-foreground mt-4 px-8 text-center text-sm'>
              <UnstyledLink
                href='/login'
                className='hover:text-brand underline underline-offset-4'
              >
                Have an account? Login
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
