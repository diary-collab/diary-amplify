'use client';

import { useTheme } from 'next-themes';

import ButtonLink from '@src/components/links/ButtonLink';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function IndexPage() {
  const { theme } = useTheme();
  return (
    <section className='bg-background'>
      <div className='layout relative flex min-h-screen flex-col items-center justify-center text-center'>
        {/* <Logo className='text-5xl' /> */}
        <h1 className='text-foreground -mt-24'>Diary Project</h1>
        <p className='text-accent-foreground mt-2 text-sm'>
          Proudly presented to you by Visi Global Teknologi{' '}
        </p>
        <p className='mt-2 text-sm text-gray-700'>
          {/* <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
                See the repository
              </ArrowLink> */}
        </p>

        <ButtonLink
          className='mt-6'
          href='/'
          variant={theme === 'dark' ? 'dark' : 'light'}
        >
          See our progress
        </ButtonLink>

        {/* <UnstyledLink
              href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
              className='mt-4'
            > */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
                width='92'
                height='32'
                src='https://vercel.com/button'
                alt='Deploy with Vercel'
              /> */}
        {/* </UnstyledLink> */}

        {/* <footer className='absolute bottom-2 text-gray-700'>
          © {new Date().getFullYear()} By{' '}
          <UnstyledLink href='/'>Azzam</UnstyledLink>
        </footer> */}
      </div>
    </section>
  );
}
