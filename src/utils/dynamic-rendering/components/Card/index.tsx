import React from 'react';

import clsxm from '@src/lib/clsxm';

import Typography from '@src/components/typography/default-typography';

interface ImageResponse {
  url: string;
}

const CARD_SIZE = ['sm', 'base'] as const;
type CardSize = (typeof CARD_SIZE)[number];

type ICard = {
  children: React.ReactNode;
  copy: string;
  title: string;
  headline: string;
  image: ImageResponse | null;
  className?: string;
  size?: CardSize;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Card({
  children,
  copy,
  headline,
  image,
  title,
  className,
  size = 'base',
  ...rest
}: ICard) {
  return (
    <div
      className={clsxm(
        'bg-white shadow-sm',
        [
          size === 'sm' && ['p-4', 'rounded-lg'],
          size === 'base' && ['p-5', 'rounded-xl'],
        ],
        className
      )}
      {...rest}
    >
      <Typography variant='h1'>{title}</Typography>
      <h6 className='card-subtitle text-muted mb-2'>{headline}</h6>
      <p className='card-text'>{copy}</p>
      {children}
    </div>
  );
}
