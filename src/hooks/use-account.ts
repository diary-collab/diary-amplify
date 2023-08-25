import useSWR from 'swr';

export function useAccount(jwt: string) {
  const url = `http://localhost:3010/v1/accounts/checkaccount`;

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
