import logger from '@src/lib/logger';

import { env } from '@/env.mjs';

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

export async function getAccountRequest() {
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

  // const testbody = await response.text();

  if (!response.ok) {
    logger({
      success: false,
      status: response.status,
      message: `${env.NEXT_PUBLIC_APP_URL}/api/middleware`,
    });
    return {
      success: false,
      status: response.status,
      message: response.statusText,
    };
    // throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
