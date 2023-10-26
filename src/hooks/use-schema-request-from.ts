import useSWR from 'swr';

export function useSchemaRequestFrom(schemaid: string) {
  const fetcher = () =>
    fetch('/api/middleware', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: `/schema-accesses/requests/${schemaid}/from`,
        method: 'get',
      }),
    }).then((res) => res.json());

  const { data, error, isLoading, isValidating } = useSWR(
    '/api/middleware',
    fetcher,
    {
      refreshInterval: 10000000,
    }
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
  };
}
