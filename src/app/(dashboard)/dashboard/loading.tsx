import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { PostItem } from '@src/components/post-item';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading='Posts' text='Create and manage posts.'>
        {/* <PostCreateButton /> */}
        Add Post
      </DashboardHeader>
      <div className='divide-border-200 divide-y rounded-md border'>
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        {/* skeleton */}
      </div>
    </DashboardShell>
  );
}
