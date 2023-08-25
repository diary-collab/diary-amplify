'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@src/components/icons';
import { ButtonProps, buttonVariants } from '@src/components/ui/button';
import { toast } from '@src/components/ui/use-toast';

type DiaryCreateButtonProps = ButtonProps;

export function DiaryCreateButton({
  className,
  variant,
  ...props
}: DiaryCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Untitled Post',
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: 'Limit of 3 posts reached.',
          description: 'Please upgrade to the PRO plan.',
          variant: 'destructive',
        });
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not created. Please try again.',
        variant: 'destructive',
      });
    }

    const post = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/editor/${post.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={clsx(
        buttonVariants({ variant }),
        {
          'cursor-not-allowed opacity-60': isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Icons.add className='mr-2 h-4 w-4' />
      )}
      New diary
    </button>
  );
}