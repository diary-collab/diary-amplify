import * as React from 'react';

import { clsxm } from '@src/lib/utils';

import PrimaryLink from '@src/components/links/primary-link';
import Typography from '@src/components/typography/default-typography';

const breadcrumbs = {
  '/': 'Landing Page',
  '/sandbox/breadcrumb': 'Breadcrumb',
};
type BreadcrumbProps = {
  crumbs: Array<keyof typeof breadcrumbs>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Breadcrumb({
  className,
  crumbs: _crumbs,
  ...rest
}: BreadcrumbProps) {
  // split array into the last part and the rest
  const lastCrumb = _crumbs[_crumbs.length - 1];
  const crumbs = _crumbs.slice(0, _crumbs.length - 1);

  return (
    <div className={clsxm('space-x-1', className)} {...rest}>
      {crumbs.map((crumb) => (
        <React.Fragment key={crumb}>
          <PrimaryLink href={crumb} size='sm' className='font-medium'>
            {breadcrumbs[crumb]}
          </PrimaryLink>
          <span className='text-typo text-sm font-medium'>/</span>
        </React.Fragment>
      ))}
      <Typography as='span' variant='s3'>
        {breadcrumbs[lastCrumb]}
      </Typography>
    </div>
  );
}
