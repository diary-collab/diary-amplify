import logger from '@src/lib/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function completeAccountRequest(jwt: string, body: any) {
  try {
    fetch('http://localhost:3010/v1/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    }).then((res) => {
      logger('success call');
      // logger(res.json());

      return { success: res.ok, data: res.json(), code: res.status };
    });
  } catch (error) {
    return {
      code: -1,
      success: false,
      error: error,
    };
  }
}
