'use client';

import { createPage } from '@utils/dynamic-rendering';
import mockResponse from '@utils/dynamic-rendering/dynamic-rendering.mock';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/button-link';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function IndexPage() {
  // const { theme } = useTheme();

  return (
    <div className='container'>
      <div className='mx-auto max-w-screen-lg px-3 py-32'>
        <h1 className='text-foreground -mt-24'>Project Diary</h1>
        <p className='text-accent-foreground mt-2 text-sm'>
          Proudly presented to you by Visi Global Teknologi{' '}
        </p>
      </div>
      <div className='mx-auto max-w-screen-lg px-3 py-16'>
        {/* {createPage(mockResponse)} */}
      </div>
    </div>
  );
}
