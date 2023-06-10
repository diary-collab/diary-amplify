'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlineXCircle } from 'react-icons/hi';

import logger from '@src/lib/logger';
import { clsxm } from '@src/lib/utils';

import Input from '@src/components/forms/Input';
import { Icons } from '@src/components/icons';

import { SidebarNavItem } from '@src/types';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

type DashboardSideNavForm = {
  searchquery?: string | null;
};

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  const methods = useForm<DashboardSideNavForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  async function onSubmit(data: DashboardSideNavForm) {
    logger(data);
    return;
  }

  if (!items?.length) {
    return null;
  }

  return (
    <nav className='grid items-start gap-2'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id='search'
            label='Search'
            placeholder='Search something...'
            validation={{ required: 'Search must be filled' }}
            // helperText='This is a helper text'
            leftIcon={HiOutlineSearch}
            rightNode={
              <button type='button' className='p-1'>
                <HiOutlineXCircle className='text-typo-icons text-xl' />
              </button>
            }
          />
        </form>
      </FormProvider>
      {items.map((item, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={clsxm(
                  'hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                  path === item.href ? 'bg-accent' : 'transparent',
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
    </nav>
  );
}
