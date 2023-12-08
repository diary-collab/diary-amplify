import Link from 'next/link';

import { EmptyPlaceholder } from '@src/components/empty-placeholder';
import { buttonVariants } from '@src/components/ui/default-ui-button';

export default function NotFound() {
  return (
    <EmptyPlaceholder className='mx-auto max-w-[800px]'>
      <EmptyPlaceholder.Icon name='warning' />
      <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        This post cound not be found. Please try again.
      </EmptyPlaceholder.Description>
      <Link href='/timeline' className={buttonVariants({ variant: 'ghost' })}>
        Go to your timeline
      </Link>
    </EmptyPlaceholder>
  );
}
