'use client';

// import { logout } from '@utils/AuthUtils';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Skeleton from '@src/components/default-skeleton';
import { PartyAvatar } from '@src/components/party-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';

export function PartyNav() {
  // const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [party, setParty] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open && !party) {
      // console.log('should trigger fetch data');
      setTimeout(() => {
        setParty({
          name: 'Diary org',
          image: null,
        });
      }, 3000);
      // console.log('should get return data');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect;
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DropdownMenuTrigger>
        <PartyAvatar
          party={{
            name: (party && party.name) || null,
            image: (party && party.image) || null,
          }}
          className='h-9 w-9'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-60'>
        {party ? (
          <>
            <div className='z-40 flex items-center justify-start gap-2 p-2'>
              <div className='flex flex-col space-y-1 leading-none'>
                {party.name && <p className='font-medium'>Organisation Menu</p>}
              </div>
            </div>
            <DropdownMenuItem asChild>
              <Link className='cursor-pointer' href='/dashboard'>
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link className='cursor-pointer' href='/dashboard/billing'>
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link className='cursor-pointer' href='/dashboard/settings'>
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Your organisation</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <div className='cursor-pointer'>
                <div className='flex flex-row space-x-2'>
                  <PartyAvatar
                    party={{
                      name: (party && party.name) || null,
                      image: (party && party.image) || null,
                    }}
                    className='h-12 w-12'
                  />
                  <div className='grid grid-rows-2'>
                    <p>{party.name}</p>
                    <p className='text-xs'>Private - Only for members</p>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <div className='flex flex-row space-x-2'>
            <Skeleton className='h-12 w-12' />
            <div className='grid grid-rows-2'>
              <Skeleton className='h-4 w-40' />
              <Skeleton className='mt-1 h-4 w-40' />
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
