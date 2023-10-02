import { siteConfig } from '@src/config/site';
import * as React from 'react';

import { clsxm } from '@src/lib/utils';

import { Icons } from '@src/components/default-icons';

import { ModeToggle } from '../mode-toggle';
// import { ModeToggle } from '@src/components/mode-toggle';

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={clsxm(className)}>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          <Icons.logo />
          <p className='text-center text-sm leading-loose md:text-left'>
            Built by{' '}
            <a
              href={siteConfig.links.twitter}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              Scarlett13
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
