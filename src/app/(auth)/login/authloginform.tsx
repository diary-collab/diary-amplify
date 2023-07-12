'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { signInWithEmailAndPassword } from '@utils/AuthUtils';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
// import usePush from '@utils/UsePush';
// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@src/lib/logger';

import Button from '@src/components/buttons/Button';
import Input from '@src/components/forms/Input';
import PasswordInput from '@src/components/forms/PasswordInput';
import { toast } from '@src/components/ui/use-toast';

import { FormFields } from '@src/types';
import { SignInWithEmailAndPassword } from '@src/types/user-auth';

const AuthLoginfields: FormFields[] = [
  {
    labelText: 'Username / Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'text',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Username / Email address',
    titlekey: 'title_email',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current_password',
    isRequired: true,
    placeholder: 'Password',
    titlekey: 'title_password',
  },
];

interface LoginFormProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ loading, setLoading }: LoginFormProps) {
  const router = useRouter();

  const methods = useForm<SignInWithEmailAndPassword>({
    mode: 'onTouched',
  });

  async function onSubmit(data: SignInWithEmailAndPassword) {
    setLoading(true);
    logger({ data });

    const signInResult = await signInWithEmailAndPassword(data);

    // setUser(signInResult.user ?? null);

    if (!signInResult?.success) {
      setLoading(false);
      // setAuthenticated(false);
      return toast({
        title: 'Something went wrong.',
        description:
          signInResult.errorMessage ??
          'Sorry, unknown error happen, please contact to our developer!',
        variant: 'destructive',
      });
    }

    // setAuthenticated(true);

    // return toast({
    //   title: 'Check your email',
    //   description: 'We sent you a login link. Be sure to check your spam too.',
    // });

    router.refresh();
    router.push('/dashboard');
  }
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-sm space-y-3 text-left'
      >
        {AuthLoginfields.map((field) =>
          field.type === 'password' ? (
            <PasswordInput
              key={field.titlekey}
              id={field.id}
              label={field.labelText}
              type={field.type}
              disabled={loading}
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
              disabled={loading}
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
          )
        )}

        <p></p>

        <Button
          type='submit'
          isLoading={loading}
          className='bg-primary-500 w-full items-center justify-center border text-center shadow-sm'
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
