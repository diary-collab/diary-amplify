import { Icons } from '@src/components/default-icons';
// import clsxm from '@src/lib/clsxm';

export default function DiaryFormNotFound() {
  return (
    <div className='bg-background relative flex min-h-screen min-w-full flex-row items-center justify-center text-center'>
      {/* <section> */}
      <div className='container flex h-screen w-screen flex-col items-center justify-center'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <Icons.folderSearch className='mx-auto h-6 w-6' />
            <h1 className='text-2xl font-semibold tracking-tight'>Uh oh...</h1>
            <p className='text-muted-foreground text-sm'>
              We couldn't find what you looking for
            </p>
          </div>

          <div className='text-muted-foreground px-8 text-center text-sm'></div>
        </div>
      </div>
      {/* <footer className='absolute bottom-2 text-gray-700'>
        © {new Date().getFullYear()} By{' '}
        <UnstyledLink href='#'>Azzam</UnstyledLink>
      </footer> */}
    </div>
  );
}
