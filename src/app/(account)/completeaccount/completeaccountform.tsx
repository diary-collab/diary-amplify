'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EnumPartyType } from '@prisma/client';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import usePush from '@utils/UsePush';
// import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { completeAccountRequestClient } from '@src/lib/fetcher/client/account-fetcher-client';

// import logger from '@src/lib/logger';
import Button from '@src/components/buttons/default-button';
import DatePicker from '@src/components/forms/date-picker';
import Input from '@src/components/forms/default-input';
import SearchableSelectInput from '@src/components/forms/searchable-select-input';
import { toast } from '@src/components/ui/use-toast';

// import { toast } from '@src/components/ui/use-toast';
import { CompleteAccount } from '@src/types/party-profile';
// import logger from '@src/lib/logger';

interface CompleteAccountProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  accountAttributes: any;
}

export default function CompleteAccountForm({
  loading,
  setLoading,
  accountAttributes,
}: CompleteAccountProps) {
  const router = useRouter();

  const methods = useForm<CompleteAccount>({
    mode: 'onTouched',
  });

  const { handleSubmit, setValue, resetField } = methods;

  useEffect(() => {
    setValue('email', accountAttributes.email);
    setValue('partyName', accountAttributes.name);
  });

  const [accountType, setAccountType] = useState<EnumPartyType>(
    EnumPartyType.personal
  );

  useEffect(() => {
    if (accountType) {
      resetField('partyBirthdate', { keepError: false });
      resetField('partyParentName', { keepError: false });
      resetField('partyAddress', { keepError: false });
    }
  }, [accountType, resetField]);

  // ---------------------------------- START FORM REGION ---------------------------------- //

  async function onSubmit(data: CompleteAccount) {
    setLoading(true);

    const {
      partyType,
      partyBirthdate,
      partyName,
      partyParentName,
      partyAddress,
      email,
    } = data;
    const luxonDate = DateTime.fromISO(partyBirthdate.toISOString()).toFormat(
      'yyyy-MM-dd'
    );

    const requestData = {
      partyName,
      partyBirthdate: luxonDate,
      partyType,
      partyParentName,
      partyAddress,
      partyEmail: email,
    };

    try {
      await completeAccountRequestClient(requestData);

      router.refresh();
      // router.push('/self');

      return toast({
        duration: 3000,
        title: 'Success create account!',
        description: 'Please wait while we redirect you to dashboard page...',
      });
    } catch (error) {
      router.refresh();
      setLoading(false);
      return toast({
        title: 'Something went wrong.',
        description:
          'Sorry, unknown error happen, please contact to our developer!',
        variant: 'destructive',
      });
    }
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
            accountType === 'personal' ? 'Personal email' : 'Organisation email'
          }
          disabled={true}
          placeholder='Email'
          helperText={`This field is auto populate and can't be changed!`}
        />
        <SearchableSelectInput
          key='key_partyType'
          id='partyType'
          label='Account type'
          placeholder='What is this account used for?'
          isMulti={false}
          disabled={loading}
          options={[
            {
              value: EnumPartyType.organisation,
              label: 'Organisation Account',
            },
            {
              label: 'Personal Account',
              value: EnumPartyType.personal,
            },
          ]}
          customSetData={setAccountType}
          validation={{ required: 'This Input must be filled' }}
        />
        <Input
          key='key_partyName'
          id='partyName'
          type='text'
          label={accountType === 'personal' ? 'Full name' : 'Organisation name'}
          disabled={loading}
          validation={{
            required: `${
              accountType === 'personal'
                ? 'Your fullname'
                : 'Your organisation name'
            } must be filled!`,
          }}
          placeholder={
            accountType === 'personal' ? 'Full name' : 'Organisation name'
          }
          helperText='This field is auto populate but you can change it'
        />
        <DatePicker
          key='key_partyBirthdate'
          id='partyBirthdate'
          label={
            accountType === EnumPartyType.personal
              ? 'Birthdate'
              : 'Founding date'
          }
          maxDate={new Date()}
          validation={{
            required: `${
              accountType === 'personal'
                ? 'Your birth date'
                : 'Your organisation founding date'
            } must be filled!`,
          }}
          disabled={loading}
          placeholder={
            accountType === EnumPartyType.personal
              ? 'Your date of birth'
              : `Your organisation's founding date`
          }
        />
        <Input
          key='key_partyAddress'
          id='partyAddress'
          type='text'
          label='Your address'
          disabled={loading}
          validation={{ required: 'Address is required!' }}
          placeholder='Street, Number, Province, PostalCode'
        />
        <Input
          key='key_partyParentName'
          id='partyParentName'
          type='text'
          label={
            accountType === 'personal'
              ? 'Mother fullname'
              : 'Notary public fullname'
          }
          disabled={loading}
          validation={undefined}
          placeholder='Without any salutation'
          // helperText={`Becareful!! You can't change it later!`}
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
