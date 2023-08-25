import { siteConfig } from '@src/config/site';
import * as React from 'react';

import { clsxm } from '@src/lib/utils';
import { useLockBody } from '@src/hooks/use-lock-body';

import { Icons } from '@src/components/default-icons';
import UnstyledLink from '@src/components/links/unstyled-link';

import { MainNavItem } from '@src/types';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={clsxm(
        'animate-in slide-in-from-bottom-80 fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden'
      )}
    >
      <div className='bg-background text-popover-foreground relative z-20 grid gap-6 rounded-md p-4 shadow-md'>
        <UnstyledLink href='/' className='flex items-center space-x-2'>
          <Icons.logo />
          <span className='font-bold'>{siteConfig.name}</span>
        </UnstyledLink>
        <nav className='grid grid-flow-row auto-rows-max text-sm'>
          {items.map((item, index) => (
            <UnstyledLink
              key={index}
              href={item.disabled ? '#' : item.href}
              className={clsxm(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {item.title}
            </UnstyledLink>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
