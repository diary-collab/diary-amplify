'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EnumPartyType } from '@prisma/client';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import usePush from '@utils/UsePush';
// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { completeAccountRequest } from '@src/lib/fetcher/account-fetcher';
import logger from '@src/lib/logger';

import Button from '@src/components/buttons/Button';
import DatePicker from '@src/components/forms/DatePicker';
import Input from '@src/components/forms/Input';
import SearchableSelectInput from '@src/components/forms/SearchableSelectInput';
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

  const methods = useForm<CompleteAccount>({
    mode: 'onTouched',
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue('email', accountAttributes.email);
    setValue('partyName', accountAttributes.name);
  });

  const [accountType, setAccountType] = useState<EnumPartyType>(
    EnumPartyType.self
  );

  // ---------------------------------- START FORM REGION ---------------------------------- //

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
    const createAccountResult = await completeAccountRequest(jwt, requestData);
    logger(createAccountResult);

    if (!createAccountResult.ok) {
      setLoading(false);
      return toast({
        title: 'Something went wrong.',
        description:
          (createAccountResult.statusText as string) ??
          'Sorry, unknown error happen, please contact to our developer!',
        variant: 'destructive',
      });
    }

    router.refresh();
    router.push('/identities');

    return toast({
      duration: 3000,
      title: 'Success create account!',
      description: 'Please wait while we redirect you to dashboard page...',
    });
  }
  // ---------------------------------- END FORM REGION ---------------------------------- //

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
            accountType === 'self' ? 'Personal email' : 'Organisation email'
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
              value: EnumPartyType.organisation,
              label: 'Organisation Account',
            },
            {
              label: 'Self Account',
              value: EnumPartyType.self,
            },
          ]}
          customSetData={setAccountType}
          validation={{ required: 'This Input must be filled' }}
        />
        <Input
          key='key_partyName'
          id='partyName'
          type='text'
          label={accountType === 'self' ? 'Full name' : 'Organisation name'}
          disabled={loading}
          validation={{
            required: `${
              accountType === 'self'
                ? 'Your fullname'
                : 'Your organisation name'
            } must be filled!`,
          }}
          placeholder={
            accountType === 'self' ? 'Full name' : 'Organisation name'
          }
          helperText='This field is auto populate but you can change it'
        />
        <DatePicker
          key='key_birthdate'
          id='birthdate'
          label={
            accountType === EnumPartyType.self ? 'Birthdate' : 'Founding date'
          }
          maxDate={new Date()}
          validation={{
            required: `${
              accountType === 'self'
                ? 'Your birth date'
                : 'Your organisation founding date'
            } must be filled!`,
          }}
          disabled={loading}
          placeholder={
            accountType === EnumPartyType.self
              ? 'Your date of birth'
              : `Your organisation's founding date`
          }
        />
        <Input
          key='key_parentName'
          id='parentName'
          type='text'
          label={
            accountType === 'self'
              ? 'Mother fullname'
              : 'Notary public fullname'
          }
          disabled={loading}
          validation={{
            required: `${
              accountType === 'self'
                ? 'Your mother name'
                : 'Your Notary public fullname'
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
