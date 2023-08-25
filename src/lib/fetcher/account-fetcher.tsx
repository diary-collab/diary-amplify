// import logger from '@src/lib/logger';

import { env } from '@/env.mjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function completeAccountRequest(jwt: string, body: any) {
  const postnewaccount = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/v1/accounts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    }
  );

  return postnewaccount;
}
