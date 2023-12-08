import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { IdentityItem } from '@src/components/identity-item';

export default function TimelineLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading='Posts' text='Create and manage posts.'>
        {/* <PostCreateButton /> */}
        Add Post
      </DashboardHeader>
      <div className='divide-border-200 divide-y rounded-md border'>
        <IdentityItem.Skeleton />
        <IdentityItem.Skeleton />
        <IdentityItem.Skeleton />
        <IdentityItem.Skeleton />
        <IdentityItem.Skeleton />
        {/* skeleton */}
      </div>
    </DashboardShell>
  );
}
