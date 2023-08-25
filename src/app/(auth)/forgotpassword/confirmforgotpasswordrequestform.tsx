'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { confirmForgotPassword } from '@utils/auth-utils';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import usePush from '@utils/UsePush';
// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@src/lib/logger';

import Button from '@src/components/buttons/default-button';
import Input from '@src/components/forms/default-input';
import PasswordInput from '@src/components/forms/password-input';
import { toast } from '@src/components/ui/use-toast';

import { FormFields } from '@src/types';
import { ConfirmForgotPasswordRequest } from '@src/types/user-auth';

export const ConfirmRForgotPasswordFormFields: FormFields[] = [
  {
    labelText: 'Username / Email address',
    labelFor: 'username',
    id: 'username',
    name: 'username',
    type: 'text',
    autoComplete: 'username',
    isRequired: true,
    placeholder: 'Username / Email address',
    titlekey: 'title_uname_email',
  },
  {
    labelText: 'New password',
    labelFor: 'newpassword',
    id: 'newpassword',
    name: 'newpassword',
    type: 'password',
    autoComplete: 'newpassword',
    isRequired: true,
    placeholder: 'New password',
    titlekey: 'title_newpassword',
  },
  {
    labelText: 'Confirmation code',
    labelFor: 'verificationcode',
    id: 'verificationcode',
    name: 'verificationcode',
    type: 'text',
    autoComplete: '',
    isRequired: true,
    placeholder: '6 Digit code delivered to you',
    titlekey: 'title_code',
  },
];

export interface ConfirmForgotPasswordFormProps {
  username: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setRequestSent: Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmForgotPasswordForm({
  username,
  loading,
  setLoading,
  setRequestSent,
}: ConfirmForgotPasswordFormProps) {
  const methods = useForm<ConfirmForgotPasswordRequest>({
    mode: 'onTouched',
  });

  const [attempt, setAttempt] = useState<number>(0);
  const router = useRouter();

  async function onSubmit(data: ConfirmForgotPasswordRequest) {
    setLoading(true);

    const { success, message } = await confirmForgotPassword(data);
    setLoading(false);

    logger(message);

    if (success) {
      setRequestSent(false);

      router.refresh();
      router.push('/login');

      return toast({
        title: 'Yeayy!',
        description: 'Your password has been changed successfully!',
        variant: 'default',
      });
    }

    //masuk kesini udah pasti gak sukses
    if (
      message?.includes('Verification code provided is not valid') &&
      attempt < 3
    ) {
      setAttempt(attempt + 1);
      return toast({
        title: 'Uh-Oh!',
        description: `${message} (attempts: ${attempt + 1}/3)`,
        variant: 'destructive',
      });
    } else if (
      (message?.includes('Verification code provided is not valid') &&
        attempt >= 3) ||
      message?.includes('Too many unsuccessful attempts')
    ) {
      setAttempt(0);
      setRequestSent(false);
      return toast({
        title: 'Uh-Oh!',
        description:
          'Too many unsuccessful attempts, please make another reset password request!',
        variant: 'destructive',
      });
    } else {
      return toast({
        title: 'Uh-Oh!',
        description: `${message} (attmepts: ${attempt}/3)`,
        variant: 'destructive',
      });
    }
  }
  const { handleSubmit, setValue } = methods;
  useEffect(() => {
    if (username) {
      setValue('username', username);
    }
  }, [setValue, username]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-sm space-y-3 text-left'
      >
        {ConfirmRForgotPasswordFormFields.map((field) => {
          if (field.id === 'username') {
            return (
              <Input
                key={field.titlekey}
                id={field.id}
                type={field.type}
                label={field.labelText}
                disabled={true}
                placeholder={field.placeholder}
                helperText={field.helpertext ? field.helpertext : undefined}
              />
            );
          } else if (field.id === 'newpassword') {
            return (
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
            );
          } else {
            return (
              <Input
                key={field.titlekey}
                id={field.id}
                type={field.type}
                label={field.labelText}
                disabled={loading}
                validation={{
                  required: `${field.name} must be filled!`,
                }}
                placeholder={field.placeholder}
                maxLength={6}
                helperText={field.helpertext ? field.helpertext : undefined}
              />
            );
          }
        })}

        <p></p>

        <Button
          type='submit'
          isLoading={loading}
          className='bg-primary-500 w-full items-center justify-center border text-center shadow-sm'
        >
          Submit data
        </Button>
      </form>
    </FormProvider>
  );
}
