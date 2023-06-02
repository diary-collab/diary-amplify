import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@/styles/nprogress.css';

import AuthContext, { ProtectRoute } from '@/contexts/AuthContext';

// EXPANSION CHANGES: 3 lines below
Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

type NextPageWithLayout = NextPage & {
  authenticate?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const authProps = Component.authenticate;

  // eslint-disable-next-line no-extra-boolean-cast
  return Boolean(authProps) ? (
    <AuthContext>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthContext>
  ) : (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  );
}

export default MyApp;
