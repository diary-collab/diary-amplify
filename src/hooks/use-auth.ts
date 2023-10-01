import { getWithSSRContext } from '@src/contexts/amplifycontext/amplifyssr';

// import logger from '@src/lib/logger';
import { SessionData } from '@src/types/use-session';

export async function provideSessionAttributes() {
  const SSR = getWithSSRContext();
  let result;

  try {
    result = await SSR.Auth.currentAuthenticatedUser();
    // logger(result);
  } catch (error) {
    return null;
  }

  if (!result || !result.attributes) {
    return null;
  }

  const sessionData = {
    attributes: result.attributes,
  };

  return sessionData as SessionData;
}

export async function provideSessionJwt() {
  const SSR = getWithSSRContext();
  let result;

  try {
    result = await SSR.Auth.currentAuthenticatedUser();
    // logger(result.signInUserSession.accessToken.jwtToken);
  } catch (error) {
    return null;
  }

  if (!result || !result.attributes) {
    return null;
  }

  const sessionData = {
    jwt: result.signInUserSession.accessToken.jwtToken,
  };

  return sessionData as SessionData;
}
