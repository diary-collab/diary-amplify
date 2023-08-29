'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { register } from '@utils/auth-utils';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import logger from '@src/lib/logger';

import Button from '@src/components/buttons/default-button';
import Skeleton from '@src/components/default-skeleton';
import Input from '@src/components/forms/default-input';
import PasswordInput from '@src/components/forms/password-input';
import { toast } from '@src/components/ui/use-toast';

import {
  AuthRegisterFields,
  RegisterNewUserForm,
  RegisterNewUserRequest,
} from '@src/types/user-auth';

interface RegisterFormProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterForm({
  loading,
  setLoading,
}: RegisterFormProps) {
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordvalue, setPasswordValue] = useState<string>('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true);

  const [username, setUsername] = useState('');
  const [value] = useDebounce(username, 1000);

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkUsername = async (unamequery: string) => {
      setLoading(true);
      if (!unamequery || unamequery === '') setIsUsernameAvailable(true);

      // get the data from the api
      const data = await fetch(
        `https://869mw200fg.execute-api.ap-southeast-3.amazonaws.com/dev/auth/checkUser?username=${unamequery}`
      );
      // convert the data to json
      const isOk = await data.ok;
      const response = await data.json();

      setLoading(false);

      if (!isOk) {
        logger(response.message);
        return;
      }

      setIsUsernameAvailable(
        response?.isUserAvailable ? response.isUserAvailable : false
      );

      logger(response.isUserAvailable);
    };

    checkUsername(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    logger(`hasil is username = ${isUsernameAvailable}`);
    if (!isUsernameAvailable) {
      setError('username', {
        message:
          'Username is not available, select another username or leave it blank!',
        type: 'custom',
      });

      return;
    } else {
      clearErrors('username');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUsernameAvailable]);

  useEffect(() => {
    if (passwordvalue && confirmPassword && passwordvalue !== confirmPassword) {
      setError('confirm_password', {
        message: "Password didn't match!",
        type: 'custom',
      });

      return;
    }

    clearErrors('confirm_password');
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword, passwordvalue]);

  const methods = useForm<RegisterNewUserForm>({
    mode: 'onTouched',
  });

  async function onSubmit(data: RegisterNewUserForm) {
    setLoading(true);

    const registerdata: RegisterNewUserRequest = {
      email: data.email,
      password: data.password,
      fullname: data.fullname,
      username: data.username,
      nickname: data.username,
    };

    const registerResult = await register(registerdata);

    setLoading(false);

    if (!registerResult?.success) {
      return toast({
        title: 'Something went wrong.',
        description:
          registerResult.errorMessage ??
          'Sorry, unknown error happen, please contact to our developer!',
        variant: 'destructive',
      });
    }

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.',
    });

    router;
  }

  const { handleSubmit, setError, clearErrors } = methods;

  if (!mounted) {
    return (
      <>
        <Skeleton className='my-2 h-8 max-w-sm' />
        <Skeleton className='mb-8 mt-2 h-8 max-w-sm' />
      </>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-sm space-y-3 text-left'
      >
        {AuthRegisterFields.map((field) => {
          if (field.type === 'password') {
            return (
              <PasswordInput
                key={field.titlekey}
                id={field.id}
                label={field.labelText}
                type={field.type}
                validation={{
                  required: field.isRequired
                    ? `${field.name} must be filled!`
                    : undefined,
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters!',
                  },
                }}
                onChange={(e) => {
                  field.name === 'confirm_password'
                    ? setConfirmPassword(e.target.value)
                    : setPasswordValue(e.target.value);
                }}
                placeholder={field.placeholder}
                helperText={field.helpertext ? field.helpertext : undefined}
              />
            );
          } else if (field.type === 'email') {
            return (
              <Input
                key={field.titlekey}
                id={field.id}
                type={field.type}
                label={field.labelText}
                validation={{
                  required: field.isRequired
                    ? `${field.name} must be filled!`
                    : undefined,
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
                    message: 'Please input a valid email!',
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
                validation={
                  field.isRequired
                    ? {
                        required: `${field.name} must be filled!`,
                      }
                    : undefined
                }
                onChange={(e) => {
                  field.name === 'username' && setUsername(e.target.value);
                }}
                placeholder={field.placeholder}
                helperText={field.helpertext ? field.helpertext : undefined}
              />
            );
          }
        })}

        <Button
          type='submit'
          className='bg-primary-500 w-full items-center justify-center border text-center shadow-sm'
          isLoading={loading}
        >
          Register
        </Button>
      </form>
    </FormProvider>
  );
}
