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
