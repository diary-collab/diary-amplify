import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { EmptyPlaceholder } from '@src/components/empty-placeholder';
import { PostCreateButton } from '@src/components/post-create-button';

export default async function TimelinePage() {
  const content = false;

  return (
    <DashboardShell>
      <DashboardHeader heading='Timeline' text='Create and manage diary page.'>
        <PostCreateButton className='px-6' />
        {/* Add Page */}
      </DashboardHeader>
      <div>
        {content ? (
          <div className='divide-border divide-y rounded-md border'>
            Content here
          </div>
        ) : (
          <div className='divide-border divide-y rounded-md border'>
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name='post' />
              <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any posts yet. Start creating content.
              </EmptyPlaceholder.Description>
              <PostCreateButton variant='outline' />
              {/* Add post */}
            </EmptyPlaceholder>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
