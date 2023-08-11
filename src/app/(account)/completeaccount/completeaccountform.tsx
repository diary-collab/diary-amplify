'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EnumAccountType } from '@prisma/client';
import { completeAccountRequest } from '@utils/AccountUtils';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import usePush from '@utils/UsePush';
// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@src/components/buttons/Button';
import DatePicker from '@src/components/forms/DatePicker';
import Input from '@src/components/forms/Input';
import SearchableSelectInput from '@src/components/forms/SearchableSelectInput';
import { Skeleton } from '@src/components/ui/skeleton';
import { toast } from '@src/components/ui/use-toast';

// import { toast } from '@src/components/ui/use-toast';
import { CompleteAccount } from '@src/types/party-profile';

interface CompleteAccountProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  accountAttributes: any;
  jwt: string;
}

export default function CompleteAccountForm({
  loading,
  setLoading,
  accountAttributes,
  jwt,
}: CompleteAccountProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // ---------------------------------- START FORM REGION ---------------------------------- //
  const methods = useForm<CompleteAccount>({
    mode: 'onTouched',
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue('email', accountAttributes.email);
    setValue('partyName', accountAttributes.name);
  });

  const [accountType, setAccountType] = useState<EnumAccountType>(
    EnumAccountType.self_account
  );

  async function onSubmit(data: CompleteAccount) {
    setLoading(true);

    const { accountType, birthdate, partyName, parentName } = data;
    const luxonDate = DateTime.fromISO(birthdate.toISOString()).toFormat(
      'yyyy-MM-dd'
    );

    const requestData = {
      accountAttributes: accountAttributes,
      partyName: partyName,
      partyBirthdate: luxonDate,
      accountType: accountType,
      partyParentName: parentName,
    };
    const createAccountResult = completeAccountRequest(jwt, requestData);
    // logger(createAccountResult);
    setLoading(false);

    if (!createAccountResult || !createAccountResult.success) {
      return toast({
        title: 'Something went wrong.',
        description:
          (createAccountResult?.error as string) ??
          'Sorry, unknown error happen, please contact to our developer!',
        variant: 'destructive',
      });
    }

    router.refresh();
    router.push('/dashboard');

    // return toast({
    //   title: 'Success create account!',
    //   description: 'Please wait while we redirect you to dashboard page...',
    // });
  }
  // ---------------------------------- END FORM REGION ---------------------------------- //

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Skeleton className='my-2 h-8 max-w-sm' />
        <Skeleton className='my-2 h-8 max-w-sm' />
        <Skeleton className='my-2 h-8 max-w-sm' />
        <Skeleton className='mb-8 mt-2 h-8 max-w-sm' />
      </>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-sm space-y-4 pb-2 text-left'
      >
        <Input
          key='key_email'
          id='email'
          type='text'
          label={
            accountType === 'self_account'
              ? 'Personal email'
              : 'Organisation email'
          }
          disabled={true}
          placeholder='Email'
          helperText={`This field is auto populate and can't be changed!`}
        />
        <SearchableSelectInput
          key='key_role'
          id='accountType'
          label='Account type'
          placeholder='What is this account used for?'
          isMulti={false}
          options={[
            {
              value: EnumAccountType.organisation_account,
              label: 'Organisation Account',
            },
            {
              label: 'Self Account',
              value: EnumAccountType.self_account,
            },
          ]}
          customSetData={setAccountType}
          validation={{ required: 'This Input must be filled' }}
        />
        <Input
          key='key_partyName'
          id='partyName'
          type='text'
          label={
            accountType === 'self_account' ? 'Full name' : 'Organisation name'
          }
          disabled={loading}
          validation={{
            required: `${
              accountType === 'self_account'
                ? 'Your fullname'
                : 'Your organisation name'
            } must be filled!`,
          }}
          placeholder={
            accountType === 'self_account' ? 'Full name' : 'Organisation name'
          }
          helperText='This field is auto populate but you can change it'
        />
        <DatePicker
          key='key_birthdate'
          id='birthdate'
          label={
            accountType === EnumAccountType.self_account
              ? 'Birthdate'
              : 'Founding date'
          }
          maxDate={new Date()}
          validation={{
            required: `${
              accountType === 'self_account'
                ? 'Your birth date'
                : 'Your organisation founding date'
            } must be filled!`,
          }}
          disabled={loading}
          placeholder={
            accountType === EnumAccountType.self_account
              ? 'Your date of birth'
              : `Your organisation's founding date`
          }
        />
        <Input
          key='key_parentName'
          id='parentName'
          type='text'
          label={
            accountType === 'self_account'
              ? 'Mother fullname'
              : 'Founder fullname'
          }
          disabled={loading}
          validation={{
            required: `${
              accountType === 'self_account'
                ? 'Your mother name'
                : 'Your founder name'
            } must be filled!`,
          }}
          placeholder='Without any salutation'
          helperText={`Becareful!! You can't change it later!`}
        />

        <Button
          type='submit'
          isLoading={loading}
          className='bg-primary-500 w-full items-center justify-center border text-center shadow-sm'
        >
          Create Account Profile
        </Button>
      </form>
    </FormProvider>
  );
}
