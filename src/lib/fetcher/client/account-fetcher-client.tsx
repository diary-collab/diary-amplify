// import logger from '@src/lib/logger';

// import { provideSessionJwt } from '@src/hooks/use-auth';

import { env } from '@/env.mjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function completeAccountRequestClient(body: any) {
  const response = await fetch(`/api/middleware`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: '/accounts',
      method: 'post',
      body: body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getAccountRequestClient() {
  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/middleware`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: '/accounts/checkAccount',
      method: 'get',
    }),
  });

  const testbody = await response.text();

  if (!response.ok) {
    // logger({
    //   success: false,
    //   status: response.status,
    //   message: testbody,
    // });
    return {
      success: false,
      status: response.status,
      message: testbody,
    };
    // throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
