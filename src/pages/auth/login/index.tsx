import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import TextButton from '@/components/buttons/TextButton';
import Input from '@/components/forms/Input';
import { Icons } from '@/components/icons';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
type BoilerplateForm = {
  name: string;
};

export default function LoginPage() {
  const router = useRouter();
  function handleGoBack() {
    // 💡 Verify if previous page exists before using router.back
    const hasPreviousPage = window.history.length > 2;

    if (hasPreviousPage) {
      router.back();
    } else {
      // fallback to a meaningful route.
      router.push('/');
    }
  }
  const methods = useForm<BoilerplateForm>({
    mode: 'onTouched',
  });
  const onSubmit: SubmitHandler<BoilerplateForm> = (data) => {
    logger({ data });

    return;
  };
  const { handleSubmit } = methods;
  return (
    <Layout>
      <Seo />
      <main>
        <div className='relative flex min-h-screen flex-row items-center justify-center bg-white text-center'>
          {/* <section> */}
          <div className='container flex h-screen w-screen flex-col items-center justify-center'>
            <TextButton
              variant='basic'
              className='absolute left-4 top-4 md:left-8 md:top-8'
              onClick={() => {
                handleGoBack();
              }}
            >
              <>
                <Icons.chevronLeft className='mr-2 h-4 w-4' />
                Back
              </>
            </TextButton>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
              <div className='flex flex-col space-y-2 text-center'>
                <Icons.logo className='mx-auto h-6 w-6' />
                <h1 className='text-2xl font-semibold tracking-tight'>
                  Welcome back
                </h1>
                <p className='text-muted-foreground text-sm'>
                  Enter your email to sign in to your account
                </p>
              </div>

              <div className='text-muted-foreground px-8 text-center text-sm'>
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='max-w-sm space-y-3'
                  >
                    <Input
                      id='name'
                      label='Nama'
                      validation={{ required: 'Nama harus diisi' }}
                      placeholder='Masukkan nama'
                      helperText='This is a helper text'
                    />

                    <Button type='submit'>Submit</Button>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
          {/* </section> */}
          {/* <section> */}
          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='/'>Azzam</UnderlineLink>
          </footer>
          {/* </section> */}
        </div>
      </main>
    </Layout>
  );
}
