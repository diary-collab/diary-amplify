'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { forgotPasswordRequest } from '@utils/auth-utils';
import { Dispatch, SetStateAction } from 'react';
// import usePush from '@utils/UsePush';
// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@src/lib/logger';

import Button from '@src/components/buttons/default-button';
import Input from '@src/components/forms/default-input';
import { toast } from '@src/components/ui/use-toast';

import { FormFields } from '@src/types';
import { ForgotPasswordRequest } from '@src/types/user-auth';

const ForgotPasswordRequestFormFields: FormFields[] = [
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
];

interface ForgotPasswordRequestFormProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setRequestSent: Dispatch<SetStateAction<boolean>>;
  setUsername: Dispatch<SetStateAction<string>>;
}

export default function ForgotPasswordRequestForm({
  loading,
  setLoading,
  setRequestSent,
  setUsername,
}: ForgotPasswordRequestFormProps) {
  const methods = useForm<ForgotPasswordRequest>({
    mode: 'onTouched',
  });

  async function onSubmit(data: ForgotPasswordRequest) {
    setLoading(true);
    logger({ data });

    const { success, message } = await forgotPasswordRequest(data);
    setLoading(false);

    logger(message);

    if (success) {
      setRequestSent(true);
      setUsername(data.username);
      return toast({
        title: 'Yeayy!',
        description: message,
        variant: 'default',
      });
    } else {
      setRequestSent(false);
      return toast({
        title: 'Uh-Oh!',
        description: message,
        variant: 'destructive',
      });
    }
  }
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-sm space-y-3 text-left'
      >
        {ForgotPasswordRequestFormFields.map((field) => (
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
            helperText={field.helpertext ? field.helpertext : undefined}
          />
        ))}

        <p></p>

        <Button
          type='submit'
          isLoading={loading}
          className='bg-primary-500 w-full items-center justify-center border text-center shadow-sm'
        >
          Request forgot password
        </Button>
      </form>
    </FormProvider>
  );
}
