import * as React from 'react';

import { clsxm } from '@src/lib/utils';

type DashboardShellProps = React.HTMLAttributes<HTMLDivElement>;

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={clsxm('grid items-start gap-8', className)} {...props}>
      {children}
    </div>
  );
}
