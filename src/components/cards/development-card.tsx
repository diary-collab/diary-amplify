import * as React from 'react';

import { clsxm } from '@src/lib/utils';

import SimpleCard from '@src/components/cards/simple-card';
import Typography from '@src/components/typography/default-typography';

type DevelopmentCardProps = React.ComponentPropsWithoutRef<'div'>;

export default function DevelopmentCard({
  className,
  children,
  ...rest
}: DevelopmentCardProps) {
  const envFlag = process.env.NEXT_PUBLIC_SHOW_DEVELOPMENT_CARD === 'true';
  const shouldShow = envFlag || process.env.NODE_ENV !== 'production';

  return shouldShow ? (
    <SimpleCard
      className={clsxm([
        'border-secondary-500 bg-secondary-50 border-2 border-dashed',
        'pt-2',
        className,
      ])}
      size='sm'
      {...rest}
    >
      <Typography className='text-secondary-700 mb-2 text-center' variant='c1'>
        Development Only
      </Typography>
      {children}
    </SimpleCard>
  ) : null;
}
