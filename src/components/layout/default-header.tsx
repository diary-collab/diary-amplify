import { useUser } from '@src/contexts/auth-context';
import * as React from 'react';

import LoadingComponent from './headercomponent/loading-component';
import UnauthenticatedHeaderComponent from './headercomponent/rightheadercomponent/unauthenticated-header-component';

interface Props {
  children?: React.ReactElement | null;
}

export default function Header({ children }: Props) {
  const { loading, setLoading, authenticated } = useUser();
  setLoading(false);

  return (
    <>
      {authenticated ? (
        <header className='bg-background sticky top-0 z-50 w-full border-gray-100 shadow-sm'>
          <section className='mx-4 flex h-14 min-w-max items-center justify-between'>
            {loading ? <LoadingComponent /> : children}
          </section>
        </header>
      ) : (
        <UnauthenticatedHeaderComponent />
      )}
    </>
  );
}
