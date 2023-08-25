import { getWithSSRContext } from '@src/contexts/amplifycontext/amplifyssr';

import logger from '@src/lib/logger';

import { SessionData } from '@src/types/use-session';

export async function provideSessionData() {
  const SSR = getWithSSRContext();
  let result;

  try {
    result = await SSR.Auth.currentAuthenticatedUser();
    logger(result.signInUserSession.accessToken.jwtToken);
  } catch (error) {
    return null;
  }

  if (!result || !result.attributes) {
    return null;
  }

  const sessionData = {
    attributes: result.attributes,
    jwt: result.signInUserSession.accessToken.jwtToken,
  };

  return sessionData as SessionData;
}
