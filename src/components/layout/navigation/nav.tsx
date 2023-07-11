'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@src/lib/logger';
import { clsxm } from '@src/lib/utils';

import DatePicker from '@src/components/forms/DatePicker';
import { Icons } from '@src/components/icons';

import { SidebarNavItem } from '@src/types';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

type DashboardSideNavForm = {
  datequery?: Date | null;
};

export function DashboardNav({ items }: DashboardNavProps) {
  const [datequerystate, setDateQueryState] = useState<Date | null>(new Date());

  useEffect(() => {
    // if (!datequery) {
    //   logger('null');
    // }
    logger(datequerystate);
  }, [datequerystate]);

  const path = usePathname();

  const methods = useForm<DashboardSideNavForm>({
    mode: 'onTouched',
  });
  const { setValue, handleSubmit } = methods;

  async function onSubmit(data: DashboardSideNavForm) {
    logger(data);
    return;
  }

  if (!items?.length) {
    return null;
  }

  return (
    <nav className='fixed z-10 grid items-start gap-2 overflow-auto'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DatePicker
            id='datequery'
            name='datequery'
            placeholder='Select date'
            label='Search diary based on date..'
            withPortal
            defaultValue={new Date().toISOString()}
            todayButton='Today'
            customState={setDateQueryState}
            rightNode={
              <button
                onClick={() => {
                  datequerystate && new Date();
                  setValue('datequery', new Date());
                }}
              >
                <Icons.today className='h-4 w-4' />
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
