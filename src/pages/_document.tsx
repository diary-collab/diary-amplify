import { Head, Html, Main, NextScript } from 'next/document';

import clsxm from '@/lib/clsxm';

export default function Document() {
  return (
    <Html lang='en' suppressHydrationWarning>
      <Head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </Head>
      <body className={clsxm('min-h-screen bg-white font-sans antialiased')}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
