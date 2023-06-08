import { MainNav } from '@src/components/layout/navigation/main-nav';
import { DashboardNav } from '@src/components/layout/navigation/nav';

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
    <div className='flex min-h-screen flex-col space-y-6'>
      <header className='bg-background sticky top-0 z-40 border-b'>
        <div className='container flex h-16 items-center justify-between py-4'>
          <MainNav items={dashboardConfig.mainNav} />
          {/* <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          /> */}
        </div>
      </header>
      <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[200px] flex-col md:flex'>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <DashboardNav items={dashboardConfig.sidebarNav} />
          }
        </aside>
        <main className='flex w-full flex-1 flex-col overflow-hidden'>
          {children}
        </main>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  );
}
