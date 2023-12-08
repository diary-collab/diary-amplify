import awsExports from '@src/aws-exports';
import { decodeProtectedHeader, importJWK, JWK, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

import logger from '@src/lib/logger';

// Cognito data
const region = awsExports.aws_cognito_region;
const poolId = awsExports.aws_user_pools_id;
const clientId = awsExports.aws_user_pools_web_client_id;

function getToken(request: NextRequest) {
  const lastauthusercookieskey = `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`;
  const lastauthusercookies =
    request.cookies.get(lastauthusercookieskey) || null;

  if (!lastauthusercookies || !lastauthusercookies.value) {
    return false;
  }

  const accesstokencookieskey = `CognitoIdentityServiceProvider.${clientId}.accessToken`;
  const refreshtokencookieskey = `CognitoIdentityServiceProvider.${clientId}.refreshToken`;

  const accesstokencookies = request.cookies.get(accesstokencookieskey) || null;
  const refreshtokencookies =
    request.cookies.get(refreshtokencookieskey) || null;

  if (!accesstokencookies || !accesstokencookies.value) {
    return false;
  }

  if (!refreshtokencookies || !refreshtokencookies.value) {
    return false;
  }

  return {
    accesstoken: accesstokencookies.value,
    refreshtoken: refreshtokencookies.value,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getJwtVerified(jwk: JWK, token: any) {
  const jwtImport = await importJWK(jwk);

  // Verify the users JWT
  try {
    await jwtVerify(token, jwtImport);
    return true;
  } catch (error) {
    return false;
  }
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

  return await getJwtVerified(jwk, token);
}

export async function middleware(req: NextRequest) {
  logger('middlewarecalled');
  const isAuthPage =
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register');

  const token = await getToken(req);
  // logger(token);

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

  const isAuth = await getIsAuth(token.accesstoken);
  logger(token.accesstoken);

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
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
