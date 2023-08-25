import { Icons } from '@src/components/icons';
import UnstyledLink from '@src/components/links/unstyled-link';
import Skeleton from '@src/components/skeleton';

export default function CompleteAccountLoading() {
  return (
    <div className='bg-background relative flex min-h-max min-w-full flex-row items-center justify-center text-center md:min-h-screen'>
      {/* <section> */}
      <div className='container my-8 flex min-h-max w-screen flex-col items-center justify-center md:my-0'>
        <div className='mx-auto flex min-h-screen w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <Icons.secret className='mx-auto h-10 w-10' />
            <h1 className='text-2xl font-semibold tracking-tight'>
              <div className='flex flex-row'>
                Psst... <Skeleton className='mx-8 h-8 w-full' />
              </div>
            </h1>
            <p className='text-muted-foreground text-sm'>
              Tell us a little about you, it will help you to control your
              account in the future
            </p>
          </div>

          <div className='text-muted-foreground mb-20 px-8 text-center text-sm'>
            <>
              <Skeleton className='my-2 h-8 max-w-sm' />
              <Skeleton className='my-2 h-8 max-w-sm' />
              <Skeleton className='my-2 h-8 max-w-sm' />
              <Skeleton className='mb-8 mt-2 h-8 max-w-sm' />
            </>
            <p className='hover:text-brand mt-4 px-8 text-center text-sm'>
              Don't worry, we won't tell anyone, and neither should you!
            </p>
          </div>
        </div>
      </div>
      {/* </section> */}
      {/* <section> */}
      <footer className='md: absolute bottom-2 hidden text-gray-700 md:block'>
        © {new Date().getFullYear()} By{' '}
        <UnstyledLink href='/'>Azzam</UnstyledLink>
      </footer>
      {/* </section> */}
    </div>
  );
}
