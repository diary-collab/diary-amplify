/* eslint-disable @typescript-eslint/no-explicit-any */

import Typography from '../typography/default-typography';

export interface IPrivateRoute {
  success: boolean;
  user: any;
}

export default function PrivateRoute({ success }: IPrivateRoute) {
  return (
    // <PrimaryLayout user={user}>
    <main
      className={`flex  h-screen flex-col items-center justify-center ${'bg-background'}`}
    >
      {success ? (
        <div>
          <Typography variant='h2' color='custom_success'>
            Kamu sudah login,{' '}
            <button
              type='button'
              className='group relative mt-10 flex w-full justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('fas');
              }}
              disabled={false}
            >
              silahkan ke dashboard untuk memulai...
            </button>
          </Typography>
        </div>
      ) : (
        <div>
          <Typography variant='h2' color='danger'>
            Kamu tidak memiliki akses ke halaman ini,{' '}
            <button
              type='button'
              className='group relative mt-10 flex w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('fas');
              }}
              disabled={false}
            >
              silahkan Login terlebih dahulu!
            </button>
          </Typography>
        </div>
      )}
    </main>
    // </PrimaryLayout>
  );
}

PrivateRoute.authenticate = false;
