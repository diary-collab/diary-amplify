import awsExports from '@src/aws-exports';
import { decodeProtectedHeader, importJWK, JWK, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

import logger from '@src/lib/logger';

// Cognito data
const region = awsExports.aws_cognito_region;
const poolId = awsExports.aws_user_pools_id;
const clientId = awsExports.aws_user_pools_web_client_id;

async function getToken(req: NextRequest) {
  const uname = req.cookies.get(
    `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`
  );

  if (!uname || !uname.value) {
    return false;
  }

  const token = req.cookies.get(
    `CognitoIdentityServiceProvider.${clientId}.${uname.value}.idToken`
  );

  if (!token || !token.value) {
    return false;
  }

  logger(token.value);

  return token.value;
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
      logger('failed to authenticate');
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

  const token = await getToken(req);

  if (!token) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    if (isAuthPage) {
      logger('masuk return 1, ' + token);
      return null;
    }

    logger('masuk return 2');
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  const isAuth = await getIsAuth(token);

  if (isAuthPage) {
    if (isAuth) {
      logger('masuk return 3');
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    logger('masuk return 4');
    return null;
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    logger('masuk return 5');
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/editor/:path*', '/login', '/register'],
};
