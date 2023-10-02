'use client';

import { siteConfig } from '@src/config/site';
import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

import { clsxm } from '@src/lib/utils';

import { Icons } from '@src/components/default-icons';
import UnstyledLink from '@src/components/links/unstyled-link';

import { MobileNav } from '../mobilenav/mobile-nav';

// import { siteConfig } from "@src/config/site"
import { MainNavItem } from '@src/types';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className='flex gap-6 md:gap-10'>
      <UnstyledLink href='/' className='hidden items-center space-x-2 md:flex'>
        <Icons.logo />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </UnstyledLink>
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
            <UnstyledLink
              key={index}
              href={item.disabled ? '#' : item.href}
              className={clsxm(
                'hover:text-foreground/80 flex items-center text-lg font-medium transition-colors sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </UnstyledLink>
          ))}
        </nav>
      ) : null}
      <button
        className='flex items-center space-x-2 md:hidden'
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className='font-bold'>Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
