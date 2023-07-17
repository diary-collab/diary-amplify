// import awsExports from '@src/aws-exports';
import { siteConfig } from '@src/config/site';
// import { Amplify, Auth } from 'aws-amplify';
import '@amplify/amplifyconfigure';

import '@src/styles/globals.css';

import { clsxm } from '@src/lib/utils';

import { Analytics } from '@src/components/analytics';
import { ThemeProvider } from '@src/components/theme-provider';
// import { ThemeProvider } from '@src/components/theme-provider';
import { Toaster } from '@src/components/ui/toaster';

// const fontSans = FontSans({
//   subsets: ['latin'],
//   variable: '--font-sans',
// });

// Font files can be colocated inside of `pages`
// const fontHeading = localFont({
//   src: '../assets/fonts/CalSans-SemiBold.woff2',
//   variable: '--font-heading',
// });

// Amplify.configure({ ...awsExports, ssr: true });

interface RootLayoutProps {
  children: React.ReactNode;
  needauthenticate: boolean;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
  ],
  authors: [
    {
      name: 'Scarlett_13',
      url: 'localhost',
    },
  ],
  creator: 'shadclsxm',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   images: [`${siteConfig.url}/og.jpg`],
  //   creator: "",
  // },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={clsxm(
          'bg-background min-h-screen font-sans antialiased'
          // fontSans.variable
          // fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={true}
        >
          {children}
          <Analytics />
          <Toaster />
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
