import * as React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider, { CustomArrowProps, Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BANNER_CONTENT } from '@src/lib/content/banner';
import { clsxm } from '@src/lib/utils';

import IconButton from '@src/components/buttons/icon-button';
import Typography from '@src/components/typography/default-typography';

type BannerProps = {
  variant: (typeof BannerVariant)[number];
} & React.ComponentPropsWithoutRef<'div'>;

const BannerVariant = ['alert', 'primary'];

function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <IconButton
      onClick={onClick}
      icon={FiChevronRight}
      variant='ghost'
      size='sm'
      className='absolute right-0 top-1/2 z-10 flex -translate-y-1/2 translate-x-full items-center rounded-full'
    />
  );
}

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <IconButton
      onClick={onClick}
      icon={FiChevronLeft}
      variant='ghost'
      size='sm'
      className='absolute left-0 top-1/2 z-10 flex -translate-x-full -translate-y-1/2 items-center rounded-full'
    />
  );
}

const settings: Settings = {
  autoplay: true,
  autoplaySpeed: 6000,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default function Banner({
  className,
  variant = 'primary',
  ...rest
}: BannerProps) {
  if (!BANNER_CONTENT.length) return null;

  return (
    <div
      className={clsxm(
        [
          variant === 'primary' && ['bg-primary-100'],
          variant === 'alert' && ['bg-red-100'],
        ],
        'flex items-center py-3',
        'min-h-[4rem]',
        className
      )}
      {...rest}
    >
      <div className='sm:layout max-w-full px-8 sm:px-0'>
        <Slider {...settings}>
          {BANNER_CONTENT.map((content, index) => (
            <div key={index} className='text-center'>
              <Typography variant='b3' font='averta'>
                {content()}
              </Typography>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
