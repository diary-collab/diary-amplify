import logger from '@src/lib/logger';

import Skeleton from './Skeleton';

interface PostItemProps {
  post: string;
}

export function PostItem({ post }: PostItemProps) {
  logger(post);

  return (
    <div className='flex items-center justify-between p-4'>
      <div className='grid gap-1'>
        {/* <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        > */}
        {/* {post.title} */}
        {/* </Link> */}
        <div>
          <p className='text-muted-foreground text-sm'>
            {/* {formatDate(post.createdAt?.toDateString())} */}
          </p>
        </div>
      </div>
      {/* <PostOperations post={{ id: post.id, title: post.title }} /> */}
    </div>
  );
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-2/5' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    </div>
  );
};
