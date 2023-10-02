'use client';

import { replaceWildcards } from '@utils/params-wildcard-utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { clsxm } from '@src/lib/utils';

import { Icons } from '@src/components/default-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@src/components/default-tooltip';
import Typography from '@src/components/typography/default-typography';

import { CustomSidebarNavItem, SidebarNavItem } from '@src/types';

interface IdentitiesNavProps {
  items: CustomSidebarNavItem[];
}

export function IdentitiesNav({ items }: IdentitiesNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!items?.length) {
    return null;
  }

  if (!mounted) {
    return <></>;
  }

  return (
    <nav className='fixed z-10 flex min-h-screen w-[190px] flex-col items-start justify-between overflow-auto'>
      <div className='w-full'>
        {items.map((item, index) => {
          return (
            <section key={index}>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Typography
                      variant='b2'
                      className={clsxm(
                        'text-md group flex items-center rounded-md px-3 py-2 font-bold',
                        'transparent',
                        'opacity-80'
                      )}
                    >
                      {item.category}
                    </Typography>
                  </TooltipTrigger>
                  <TooltipContent side='bottom'>
                    <Typography variant='b2'>{item.catdesc}</Typography>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {item.items ? (
                <>
                  <DashboardSideNavItems items={item.items} />
                </>
              ) : null}
            </section>
          );
        })}
      </div>
    </nav>
  );
}

interface DashboardNavItemsProps {
  items: SidebarNavItem[];
}

export function DashboardSideNavItems({ items }: DashboardNavItemsProps) {
  const path = usePathname();
  const params = useParams();
  return (
    <>
      {items.map((item, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const Icon = Icons[item.icon || 'arrowRight'];
        const href = replaceWildcards(item, params);
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '#' : href}>
              <span
                className={clsxm(
                  'hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                  path === href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                <Icon className='mr-2 h-4 w-4' />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </>
  );
}
