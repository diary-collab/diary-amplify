import { SliderButton } from '@typeform/embed-react';
// import clsx from 'clsx';
import React, { createRef } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

// type Color = (typeof colorList)[number];

export default function ComponentsPage() {
  // const [mode, setMode] = React.useState<'dark' | 'light'>('light');
  // const [color, setColor] = React.useState<Color>('sky');
  // function toggleMode() {
  //   return mode === 'dark' ? setMode('light') : setMode('dark');
  // }

  const sliderRef = createRef();

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: 4,
    border: 'none',
    background: 'lightgray',
    color: 'black',
    fontSize: 16,
    cursor: 'pointer',
  };

  return (
    <Layout>
      <Seo
        templateTitle='Components'
        description='Pre-built components with awesome default'
      />
      <main>
        {/* <section
          className={clsx(mode === 'dark' ? 'bg-dark' : 'bg-white', color)}
        >
          <div
            className={clsx(
              'layout min-h-screen py-20',
              mode === 'dark' ? 'text-white' : 'text-black'
            )}
          > */}
        <SliderButton
          id='vLoPqjUj'
          ref={sliderRef}
          style={buttonStyle}
          medium='demo-test'
          hidden={{ foo: 'foo value', bar: 'bar value' }}
        >
          open slider (right)
        </SliderButton>
        {/* </div>
        </section> */}
      </main>
    </Layout>
  );
}

// const colorList = [
//   'slate',
//   'gray',
//   'zinc',
//   'neutral',
//   'stone',
//   'red',
//   'orange',
//   'amber',
//   'yellow',
//   'lime',
//   'green',
//   'emerald',
//   'teal',
//   'cyan',
//   'sky',
//   'blue',
//   'indigo',
//   'violet',
//   'purple',
//   'fuchsia',
//   'pink',
//   'rose',
// ] as const;
