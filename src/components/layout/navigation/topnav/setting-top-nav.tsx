'use client';

import { useRouter } from 'next/navigation';

import { Icons } from '@src/components/default-icons';

interface SettingTopNavProps {
  redirectTitle: string;
  redirectHref: string;
}

export function SettingTopNav({
  redirectTitle,
  redirectHref,
}: SettingTopNavProps) {
  const router = useRouter();
  return (
    <button
      className='cursor-pointer'
      onClick={() => {
        router.push(redirectHref);
      }}
    >
      <div className='flex flex-row items-center justify-center space-x-2'>
        <Icons.left className='h-5 w-6' />
        <p>{redirectTitle}</p>
      </div>
    </button>
  );
}
