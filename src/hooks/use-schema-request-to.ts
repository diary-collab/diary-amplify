import useSWR from 'swr';

export function useSchemaRequestTo(schemaid: string) {
  const fetcher = () =>
    fetch('/api/middleware', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: `/schema-accesses/requests/${schemaid}/to`,
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
    dataSchemaAccessTo: data,
    isLoadingSchemaRequestTo: isLoading,
    errorSchemaRequestTo: error,
    isValidatingSchemaRequestTo: isValidating,
  };
}