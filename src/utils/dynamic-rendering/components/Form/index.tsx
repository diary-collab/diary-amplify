import { FormProvider, useForm } from 'react-hook-form';

import Button from '@src/components/buttons/default-button';
import Input from '@src/components/forms/default-input';

type IForm = {
  formTitle?: string;
  submitTitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemsForm: any;
};

export default function Form({ itemsForm, formTitle, submitTitle }: IForm) {
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: unknown) => {
    // logger({ data }, 'rhf.tsx line 33');

    // !STARTERCONF Remove console log, use logger instead
    // eslint-disable-next-line no-console
    console.log({ data });
    return;
  };
  //#endregion  //*======== Form Submit ===========
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='min-w-full max-w-xl space-y-3'
      >
        {itemsForm &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          itemsForm.map((field: any) => {
            return (
              <Input
                key={field.titlekey}
                id={field.id}
                type={field.type}
                label={field.labelText}
                validation={field.validation && field.validation}
                placeholder={field.placeholder}
                helperText={field.helpertext ? field.helpertext : undefined}
              />
            );
          })}

        <Button onClick={handleSubmit(onSubmit)}>
          {submitTitle || 'Submit'}
        </Button>
      </form>
    </FormProvider>
  );
}
