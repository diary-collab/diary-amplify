'use client';

import { siteConfig } from '@src/config/site';
// import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

// import { clsxm } from '@src/lib/utils';
import { Icons } from '@src/components/default-icons';
import UnstyledLink from '@src/components/links/unstyled-link';

// import { MobileNav } from '../mobile-nav';

// import { siteConfig } from "@src/config/site"

// interface AuthNavProps {
//   children?: React.ReactNode;
// }

export function AuthNav() {
  // const segment = useSelectedLayoutSegment();
  // const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className='flex gap-6 md:gap-10'>
      <UnstyledLink href='/' className='hidden items-center space-x-2 md:flex'>
        <Icons.logo />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </UnstyledLink>
    </div>
  );
}
