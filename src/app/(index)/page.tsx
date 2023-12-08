'use client';

// import Button from '@src/components/buttons/default-button';
// import Input from '@src/components/forms/default-input';
// import PasswordInput from '@src/components/forms/password-input';
// import SearchableSelectInput from '@src/components/forms/searchable-select-input';
// import logger from '@src/lib/logger';
// import { createPage } from '@src/lib/schema-builder/forms';
// import { schemaToForm } from '@src/lib/schema-builder/schema-to-form';
// import { FormFields } from '@src/types';
// import { SignInWithEmailAndPassword } from '@src/types/user-auth';
// import { useState } from 'react';
// import { FormProvider, useForm } from 'react-hook-form';

export default function IndexPage() {
  // const { theme } = useTheme()

  // const exampleschema = {
  //   $schema: 'https://json-schema.org/draft/2020-12/schema',
  //   $id: 'https://schema.projectdiary.id/complete-account.schema.json',
  //   title: 'Project Diary Account Completion Form',
  //   description:
  //     'A form for completing account registration at ProjectDiary.id',
  //   type: 'object',
  //   properties: {
  //     accountEmail: {
  //       title: 'Personal / Organisation Email',
  //       type: 'string',
  //       description:
  //         "User's email. Email of the user based on the account provider. Can't be changed and follow the provider's given email",
  //       format: 'email',
  //     },
  //     accountType: {
  //       title: 'Account Type',
  //       description:
  //         'Type of the account. The user can choose between self and organisation account',
  //       enum: ['self', 'organisation'],
  //     },
  //     fullName: {
  //       title: 'Account Fullname',
  //       type: 'string',
  //       description:
  //         'Fullname without salutation. (if organisation account, the name should be include the prefix i.e. PT, CV, etc)',
  //     },
  //     'birth-FoundingDate': {
  //       title: 'Account Birth / Founding Date',
  //       type: 'string',
  //       description:
  //         "User's birthdate or founding date. Depends on the account type in Date ISO8601 format (YYYY-MM-DD)",
  //       format: 'date',
  //     },
  //     accountAddress: {
  //       title: 'Account Address',
  //       type: 'string',
  //       description: "User's address. ",
  //     },
  //   },
  //   anyOf: [
  //     {
  //       properties: {
  //         accountType: { const: 'self' },
  //         address: {
  //           format: 'date',
  //         },
  //       },
  //     },
  //     {
  //       properties: {
  //         accountType: { const: 'organisation' },
  //         address: {
  //           format: 'email',
  //         },
  //       },
  //     },
  //   ],
  //   required: ['accountEmail', 'accountType', 'address'],
  //   additionalProperties: false,
  // };

  // const formfields = schemaToForm(exampleschema);

  // const [loginfields, setLoginFields] = useState<FormFields[]>(
  //   formfields || []
  // );

  // const methods = useForm<SignInWithEmailAndPassword>({
  //   mode: 'onTouched',
  // });
  // const { handleSubmit } = methods;

  // async function onSubmit(data: SignInWithEmailAndPassword) {
  //   logger({ data });

  //   loginfields.map((object) => {
  //     if (object.id === 'accountEmail') {
  //       logger(object);
  //       object.type === 'password'
  //         ? (object.type = 'email')
  //         : (object.type = 'password');
  //     }
  //   });

  //   setLoginFields(loginfields);

  //   // const signInResult = await signInWithEmailAndPassword(data);

  //   // setUser(signInResult.user ?? null);

  //   // if (!signInResult?.success) {
  //   //   setLoading(false);
  //   //   // setAuthenticated(false);
  //   //   return toast({
  //   //     title: 'Something went wrong.',
  //   //     description:
  //   //       signInResult.errorMessage ??
  //   //       'Sorry, unknown error happen, please contact to our developer!',
  //   //     variant: 'destructive',
  //   //   });
  //   // }

  //   // setAuthenticated(true);

  //   // return toast({
  //   //   title: 'Check your email',
  //   //   description: 'We sent you a login link. Be sure to check your spam too.',
  //   // });

  //   // router.refresh();
  //   // router.push('/identities');
  // }

  return (
    <section className='bg-background'>
      <div className='layout flex h-screen min-w-full flex-col items-center justify-center text-center'>
        {/* <Logo className='text-5xl' /> */}
        <h1 className='text-foreground -mt-24'>Project Diary</h1>
        <p className='text-accent-foreground mt-2 text-sm'>
          Proudly presented to you by Visi Global Teknologi{' '}
        </p>
        <p className='mt-2 text-sm text-gray-700'>
          {/* <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
                See the repository
              </ArrowLink> */}
        </p>

        {/* <ButtonLink
          className='mt-6'
          href='/'
          variant={theme === 'dark' ? 'dark' : 'light'}
        >
          See our progress
        </ButtonLink> */}

        {/* <UnstyledLink
              href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
              className='mt-4'
            > */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
                width='92'
                height='32'
                src='https://vercel.com/button'
                alt='Deploy with Vercel'
              /> */}
        {/* </UnstyledLink> */}

        {/* <footer className='absolute bottom-2 text-gray-700'>
          © {new Date().getFullYear()} By{' '}
          <UnstyledLink href='/'>Azzam</Unstyle
					
					field.type === 'password' ? (
                  <PasswordInput
                    key={field.titlekey}
                    id={field.id}
                    label={field.labelText}
                    type={field.type}
                    // disabled={loading}
                    validation={{
                      required: `${field.name} must be filled!`,
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters!',
                      },
                    }}
                    placeholder={field.placeholder}
                    helperText={field.helpertext ? field.helpertext : undefined}
                  />
                ) : (
                  <Input
                    key={field.titlekey}
                    id={field.id}
                    type={field.type}
                    label={field.labelText}
                    // disabled={loading}
                    validation={{
                      required: `${field.name} must be filled!`,
                      // pattern: {
                      //   value:
                      //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
                      //   message: 'Please inout a valid email!',
                      // },
                    }}
                    placeholder={field.placeholder}
                    helperText={field.helpertext ? field.helpertext : undefined}
                  />
                )dLink>
        </footer> */}

        {/* <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full space-y-4 text-left'
          >
            {loginfields &&
              loginfields.map((field) => {
                return createPage(field);
              })}

            <p></p>

            <Button
              type='submit'
              // isLoading={loading}
              className='bg-primary-500 w-full items-center justify-center border text-center shadow-sm'
            >
              Login
            </Button>
          </form>
        </FormProvider> */}
      </div>
    </section>
  );
}
