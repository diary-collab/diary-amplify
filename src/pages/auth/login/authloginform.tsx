/* eslint-disable @typescript-eslint/no-explicit-any */
// interface LoginFormProps {
//   // children: React.ReactNode;
// }

import { login } from '@utils/AuthUtils';
// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import { toast } from '@/components/ui/use-toast';

import { useUser } from '@/contexts/AuthContext';

import { FormFields } from '@/types';
import { SignInWithEmailAndPassword } from '@/types/user-auth';

const AuthLoginfields: FormFields[] = [
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'text',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
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

export default function LoginForm() {
  const { setUser, setAuthenticated, setLoading } = useUser();

  const methods = useForm<SignInWithEmailAndPassword>({
    mode: 'onTouched',
  });

  async function onSubmit(data: SignInWithEmailAndPassword) {
    logger({ data });

    const signInResult = await login(data.email, data.password);

    setLoading(false);
    setUser(signInResult.user ?? null);

    if (!signInResult?.success) {
      setAuthenticated(false);
      return toast({
        title: 'Something went wrong.',
        description:
          signInResult.errorMessage ??
          'Sorry, unknown error happen, please contact to our developer!',
        variant: 'destructive',
      });
    }

    setAuthenticated(true);

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.',
    });
  }
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm space-y-3'>
        {AuthLoginfields.map((field) =>
          field.type === 'password' ? (
            <PasswordInput
              key={field.titlekey}
              id={field.id}
              label={field.labelText}
              type={field.type}
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
              validation={{
                required: `${field.name} must be filled!`,
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
                  message: 'Please inout a valid email!',
                },
              }}
              placeholder={field.placeholder}
              helperText={field.helpertext ? field.helpertext : undefined}
            />
          )
        )}

        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
}
