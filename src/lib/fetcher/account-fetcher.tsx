// import logger from '@src/lib/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function completeAccountRequest(jwt: string, body: any) {
  const postnewaccount = await fetch('http://localhost:3010/v1/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(body),
  });

  return postnewaccount;
}
