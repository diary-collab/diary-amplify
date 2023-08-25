import useSWR from 'swr';

import { env } from '@/env.mjs';

export function useAccount(jwt: string) {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/v1/accounts/checkaccount`;

  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading, isValidating } = useSWR(url, fetcher, {
    refreshInterval: 10000000,
  });

  return {
    data,
    isLoading,
    error,
    isValidating,
  };
}
