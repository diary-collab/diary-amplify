// import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { IdentityItem } from '@src/components/identity-item';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import clsxm from '@src/lib/clsxm';

export default function IdentityDetailLoading() {
  return (
    <>
      <header className='bg-background border-border sticky top-0 z-40 min-w-full border-b shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          {/* <SettingTopNav
            redirectHref={`/identities/${params.identitiesid}/diaries`}
            redirectTitle='Diaries'
          />
          <UserAccountNav
            user={{
              name: params.sessionData.attributes.name,
              image: null,
              email: params.sessionData.attributes.email,
            }}
          /> */}
        </div>
      </header>
      <div className='container grid min-h-screen min-w-full flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='border-border hidden w-[250px] flex-col border-r pr-2 md:flex'>
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
      </div>
    </>
  );
}
