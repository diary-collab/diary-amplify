import * as React from 'react';

import { clsxm } from '@src/lib/utils';

type PageLoadingProps = React.ComponentPropsWithoutRef<'div'>;

export default function PageLoading({ className, ...rest }: PageLoadingProps) {
  return (
    <div
      className={clsxm('animate-shimmer bg-[#f6f7f8]', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, #959798 0%, #959798 20%, #959798 40%, #959798 100%)',
        backgroundSize: '200px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    >
      Loading...
    </div>
  );
}
