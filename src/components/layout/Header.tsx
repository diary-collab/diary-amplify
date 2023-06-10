import { useUser } from '@src/contexts/AuthContext';
import * as React from 'react';

import LoadingComponent from './headercomponent/LoadingComponent';
import UnauthenticatedHeaderComponent from './headercomponent/rightheadercomponent/UnauthenticatedHeaderComponent';

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
