import { MainNav } from '@src/components/layout/navigation/main-nav';
import { DashboardNav } from '@src/components/layout/navigation/nav';
import { UserAccountNav } from '@src/components/layout/navigation/user-account-nav';
import { SiteFooter } from '@src/components/layout/site-footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const dashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Posts',
      href: '/dashboard',
      icon: 'post',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='bg-background sticky top-0 z-40 w-full border-b'>
        <div className='container flex h-16 min-w-full items-center justify-between py-4'>
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: 'Azzam Hensem',
              image: null,
              email: 'azzam@hensem.com',
            }}
          />
        </div>
      </header>
      <div className='container grid min-w-full flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[250px] flex-col border-r pr-2 md:flex'>
          <div className='mt-6'>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              <DashboardNav items={dashboardConfig.sidebarNav} />
            }
          </div>
        </aside>
        <main className='mx-0 mt-6 flex w-full flex-1 flex-col overflow-hidden md:mx-4'>
          {children}
        </main>
      </div>
      <SiteFooter className='border-t' />
    </div>
  );
}
