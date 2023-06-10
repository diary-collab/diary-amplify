import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { EmptyPlaceholder } from '@src/components/empty-placeholder';

export default function Dashboard() {
  const content = false;
  return (
    <DashboardShell>
      <DashboardHeader heading='Pages' text='Create and manage diary page.'>
        {/* <PostCreateButton /> */}
        Add Page
      </DashboardHeader>
      <div>
        {content ? (
          <div className='divide-border divide-y rounded-md border'>
            Content here
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='post' />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            {/* <PostCreateButton variant="outline" /> */}
            Add post
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
