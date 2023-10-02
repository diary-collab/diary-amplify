import awsExports from '@src/aws-exports';
// import awsmobile from '@src/aws-exports';
// import { withSSRContext } from 'aws-amplify';
import { decodeProtectedHeader, importJWK, JWK, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

import logger from '@src/lib/logger';

// import {
//   getWithSSRContextMiddleware,
//   serializeMultiple,
// } from './contexts/amplifycontext/amplifyssrmiddleware';

// const amplifyconfig = {
//   ...awsmobile,
//   ssr: true, // important to set authorization cookies on client
// };

// Cognito data
const region = awsExports.aws_cognito_region;
const poolId = awsExports.aws_user_pools_id;
// const clientId = awsExports.aws_user_pools_web_client_id;

async function getToken() {
  // const SSR = withSSRContext({ req });

  // SSR.configure(amplifyconfig);
  // let result;

  // try {
  //   result = await SSR.Auth.currentAuthenticatedUser();
  //   // logger(result.signInUserSession.accessToken.jwtToken);
  // } catch (error) {
  //   return null;
  // }

  return false;
  // if (!result || !result.signInUserSession.accessToken.jwtToken) {
  //   return null;
  // }

  // return result.signInUserSession.accessToken.jwtToken;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getJwtVerified(jwk: JWK, token: any) {
  const jwtImport = await importJWK(jwk);

  // Verify the users JWT
  await jwtVerify(token, jwtImport)
    .then(() => {
      return true;
    })
    .catch((error) => {
      logger('failed to authenticate: ', error);
      return error;
    });
}

async function getIsAuth(token: string) {
  // Get keys from AWS
  const { keys } = await fetch(
    `https://cognito-idp.${region}.amazonaws.com/${poolId}/.well-known/jwks.json`
  ).then((res) => res.json());

  // Decode the user's token
  const { kid } = decodeProtectedHeader(token);

  // Find the user's decoded token in the Cognito keys
  const jwk = keys.find((key: { kid: string | undefined }) => key.kid === kid);

  if (!jwk) {
    return false;
  }

  const jwtverified = await getJwtVerified(jwk, token);
  logger('jwtverified: ' + jwtverified);
  return false;
}

export async function middleware(req: NextRequest) {
  logger('middlewarecalled');
  const isAuthPage =
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register');

  const token = await getToken();
  // logger('token: ', token);

  if (!token) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    if (!from) {
      //no action, just to ignore warning
    }

    if (isAuthPage) {
      logger('masuk return 1, ' + token);
      return null;
    }

    logger('masuk return 2');
    return null;
    // return NextResponse.redirect(
    //   new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    // );
  }

  const isAuth = await getIsAuth('token');

  if (isAuthPage) {
    if (isAuth) {
      logger('masuk return 3');
      // return NextResponse.redirect(new URL('/identities', req.url));
      return null;
    }

    logger('masuk return 4');
    return null;
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    if (!from) {
      //no action, just to ignore warning
    }
    logger('masuk return 5');
    // return NextResponse.redirect(
    //   new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    // );

    return null;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
    '/login',
    '/register',
    '/identities/:path*',
  ],
};
