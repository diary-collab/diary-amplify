import React from 'react';

import { Components } from './dynamic-rendering.constants';
import { IComponent } from './dynamic-rendering.interfaces';

export function createPage(data?: IComponent): React.ReactNode {
  if (!data) return null;

  function createComponent(item: IComponent): React.ReactNode {
    const { data, type } = item;
    const { items, embeddedView, id, ...rest } = data;
    return React.createElement(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Components[type] as any,
      {
        ...rest,
        key: id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      Array.isArray(items)
        ? items.map(renderer)
        : renderer(embeddedView ?? null)
    );
  }

  function renderer(config: IComponent | null): React.ReactNode {
    if (!config) return null;

    return createComponent(config);
  }

  return renderer(data);
}
