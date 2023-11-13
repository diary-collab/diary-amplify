// import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { IdentityItem } from '@src/components/identity-item';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import clsxm from '@src/lib/clsxm';

export default function SelfAccountLoading() {
  return (
    <>
      <aside className='border-border -ml-8 hidden w-[250px] flex-col border-r pr-2 md:flex'>
        <div className='mt-6'>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // prettier-ignore
            // <SettingNav party={{id: '123', partyType: 'self'}}/>
          }
        </div>
      </aside>
      <main className='mx-0 mt-6 flex w-full flex-1 flex-col overflow-hidden md:mx-4'>
        <DashboardShell>
          {/* <DashboardHeader heading='Diaries' text='List your identities here'> */}
          {/* <PostCreateButton /> */}
          {/* </DashboardHeader> */}
          <div className='divide-border-200 divide-y rounded-md border'>
            <IdentityItem.Skeleton />
            <IdentityItem.Skeleton />
            <IdentityItem.Skeleton />
            <IdentityItem.Skeleton />
            <IdentityItem.Skeleton />
            {/* skeleton */}
          </div>
        </DashboardShell>
      </main>
    </>
  );
}
