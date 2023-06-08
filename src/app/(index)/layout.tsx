import { dashboardConfig } from '@src/config/dashboard';
import Link from 'next/link';

import { clsxm } from '@src/lib/utils';

import { MainNav } from '@src/components/layout/navigation/main-nav';

interface IndexPageProps {
  children: React.ReactNode;
}

export default function IndexLayout({ children }: IndexPageProps) {
  return (
    <>
      {/* <Seo
        templateTitle='Dashboard'
        description='Access your diaries here in your dashboard'
      /> */}
      <div className='flex min-w-full flex-col items-center justify-between'>
        <header className='z-40 min-w-full bg-white shadow-md'>
          <div className='mx-8 flex h-20 items-center justify-between py-6 md:mx-10 lg:mx-12'>
            <MainNav items={dashboardConfig.mainNav} />
            <nav>
              <Link href='/login' className={clsxm('')}>
                Login
              </Link>
            </nav>
          </div>
        </header>
        <main className='flex-1'>{children}</main>
        {/* <SiteFooter /> */}
      </div>
    </>
  );
}
