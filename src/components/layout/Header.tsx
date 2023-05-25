import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

import Logo from '~/images/logo.svg';

// const links = [
//   { href: '/', label: 'Route 1' },
//   { href: '/', label: 'Route 2' },
// ];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-center'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          <Logo className='h-48 w-48' />
        </UnstyledLink>
        {/* <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  );
}
