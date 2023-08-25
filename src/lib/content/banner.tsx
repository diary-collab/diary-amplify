import * as React from 'react';

import UnstyledLink from '@src/components/links/unstyled-link';

export const BANNER_CONTENT: (() => React.ReactNode)[] = [
  () => (
    <span>
      You dont have any active account yet! Complete your account registration{' '}
      <UnstyledLink className='text-red-600' href='/completeaccount'>
        Click here
      </UnstyledLink>
    </span>
  ),
];

export const BANNER_DELAY_MS = 5000;
