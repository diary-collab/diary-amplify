// import logger from '@src/lib/logger';

import { provideSessionJwt } from '@src/hooks/use-auth';

import { env } from '@/env.mjs';
// import logger from '@src/lib/logger';

export async function getAccountRequestServer() {
  const sessionData = await provideSessionJwt();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bodyreq: any = {
    path: '/accounts/checkAccount',
    method: 'get',
    jwt: sessionData?.jwt || '',
  };

  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/middleware`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyreq),
  });

  const testbody = await response.text();
  // logger(testbody);
  // const returnvalue = await response.json();

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

  //gatau kenapa, pakai await response.json() error, jadi ini workaround nya
  return JSON.parse(testbody);
}
