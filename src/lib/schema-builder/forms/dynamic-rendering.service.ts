/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Components } from './dynamic-rendering.constants';

import { FormFields } from '@src/types';
// import logger from '@src/lib/logger';

export function createPage(data?: FormFields): React.ReactNode {
  if (!data) return null;

  function createComponent(item: FormFields): React.ReactNode {
    const {
      id,
      type,
      labelText,
      options,
      placeholder,
      validation,
      // isRequired,
      ...rest
    } = item;

    // const { items, embeddedView, id, ...rest } = data;
    return React.createElement(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      Components[type] as any,
      {
        ...rest,
        key: id,
        id: id,
        label: labelText,
        options: options,
        placeholder: placeholder,
        validation: validation,
      } as any
      // renderer(embed dedView ?? null)
    );
  }

  function renderer(config: FormFields | null): React.ReactNode {
    if (!config) return null;

    return createComponent(config);
  }

  return renderer(data);
}
