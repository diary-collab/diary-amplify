import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { EmptyPlaceholder } from '@src/components/empty-placeholder';
import UnderlineLink from '@src/components/links/UnderlineLink';

export default function Dashboard() {
  const content = false;
  return (
    <DashboardShell>
      <DashboardHeader heading='Posts' text='Create and manage posts.'>
        {/* <PostCreateButton /> */}
        Add Post
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
      <footer className='absolute bottom-2 text-gray-700'>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='/'>Azzam</UnderlineLink>
      </footer>
    </DashboardShell>
  );
}
