import Logo from '~/images/logo.svg';

export default function LoadingComponent() {
  return (
    <div className='font-bold hover:text-gray-600'>
      <Logo className='h-48 w-48' />
    </div>
  );
}
