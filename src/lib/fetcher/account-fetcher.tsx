// import logger from '@src/lib/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function completeAccountRequest(body: any) {
  const response = await fetch(`/api/middleware`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: '/parties',
      method: 'post',
      body: body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
