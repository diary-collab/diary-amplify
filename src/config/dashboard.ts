import { DashboardConfig } from '@src/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
      disabled: true,
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  mainNavAuth: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Documentation',
      href: '/docs',
      disabled: true,
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      category: 'Pages',
      catdesc:
        'Manage your posts here by select each category or type of the pages.',
      items: [
        {
          title: 'Public for everyone',
          href: '/dashboard',
          icon: 'post',
        },
        {
          title: 'Shared to you',
          href: '/dashboard/shared',
          icon: 'sharedfile',
        },
        {
          title: 'Private for you',
          href: '/dashboard/private',
          icon: 'privatepost',
        },
        {
          title: 'Page requests',
          href: '/dashboard/requests',
          icon: 'notifications',
        },
      ],
    },
    {
      category: 'Diaries (Coming soon)',
      catdesc: 'This page is coming soon, we are still working on it!',
      items: [
        {
          title: 'Public for everyone',
          href: '/dashboard/diary',
          icon: 'post',
          disabled: true,
        },
        {
          title: 'Shared to you',
          href: '/dashboard/diary/shared',
          icon: 'sharedfile',
          disabled: true,
        },
        {
          title: 'Private for you',
          href: '/dashboard/diary/private',
          icon: 'privatepost',
          disabled: true,
        },
        {
          title: 'Page requests',
          href: '/dashboard/diary/requests',
          icon: 'notifications',
          disabled: true,
        },
      ],
    },
  ],
};
