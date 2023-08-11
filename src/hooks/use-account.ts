import useSWR from 'swr';

export function useAccount(jwt: string) {
  const url = `http://localhost:3010/v1/account/checkaccount`;

  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 18000000,
  });

  return {
    data,
    isLoading,
    error,
  };
}
