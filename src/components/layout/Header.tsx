import * as React from 'react';

import { useUser } from '@/contexts/AuthContext';

import LoadingComponent from './headercomponent/LoadingComponent';

interface Props {
  children?: React.ReactElement | null;
}

export default function Header({ children }: Props) {
  const { loading, setLoading } = useUser();
  setLoading(false);

  return (
    <header className='sticky top-0 z-50 w-full border-gray-100 bg-white shadow-sm'>
      <section className='layout flex h-14  items-center justify-between'>
        {loading ? <LoadingComponent /> : children}
      </section>
    </header>
  );
}
