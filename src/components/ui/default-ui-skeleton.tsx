import { clsxm } from '@src/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsxm('animate-pulse rounded-md bg-gray-300', className)}
      {...props}
    />
  );
}

export { Skeleton };
