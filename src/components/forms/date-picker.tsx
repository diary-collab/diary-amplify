import clsx from 'clsx';
import get from 'lodash.get';
import { Dispatch, SetStateAction } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

import { clsxm } from '@src/lib/utils';

import Typography from '@src/components/typography/default-typography';

type DatePickerProps = {
  validation?: RegisterOptions;
  label: string | null;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  helperText?: string;
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  containerClassName?: string;
  rightNode?: React.ReactNode;
  customState?: Dispatch<SetStateAction<Date | null>>;
} & Omit<ReactDatePickerProps, 'onChange'>;

export default function DatePicker({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  hideError = false,
  disabled,
  containerClassName,
  customState,
  rightNode,
  ...rest
}: DatePickerProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  return (
    <div className={clsxm('relative', containerClassName)}>
      {withLabel && (
        <Typography
          as='label'
          variant='s3'
          className='text-foreground block'
          htmlFor={id}
        >
          {label}
        </Typography>
      )}

      <Controller
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className={clsx('relative', withLabel && 'mt-1')}>
              <ReactDatePicker
                name={id}
                onChange={onChange}
                onBlur={onBlur}
                onSelect={(data) => {
                  customState && customState(data);
                }}
                selected={value ? new Date(value) : undefined}
                className={clsx(
                  'bg-background flex w-full rounded-lg shadow-sm',
                  'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
                  'focus:border-primary-500 focus:ring-primary-500 border-gray-300',
                  (readOnly || disabled) &&
                    'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
                  error &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500'
                )}
                placeholderText={placeholder}
                aria-describedby={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                openToDate={value ? new Date(value) : defaultDate}
                dateFormat='dd MMMM yyyy'
                readOnly={readOnly}
                disabled={disabled}
                {...rest}
              />
              {rightNode && (
                <div className='text-foreground absolute inset-y-0 right-0 flex items-center pr-3'>
                  {rightNode}
                </div>
              )}
              {/* <HiOutlineCalendar className='text-typo-icons pointer-events-none absolute right-8 top-1/2 block -translate-y-1/2 transform text-lg' /> */}
            </div>
            {helperText && (
              <Typography variant='c1' color='secondary' className='mt-1'>
                {helperText}
              </Typography>
            )}
            {!hideError && error && (
              <Typography variant='c1' color='danger' className='mt-1'>
                {error?.message?.toString()}
              </Typography>
            )}
          </>
        )}
      />
    </div>
  );
}
