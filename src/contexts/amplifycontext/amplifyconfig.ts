import awsmobile from '@src/aws-exports';

export const config = {
  ...awsmobile,
  ssr: true, // important to set authorization cookies on client
};
