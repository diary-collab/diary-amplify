// import jwt_decode, { JwtPayload } from 'jwt-decode';
// import { runWithAmplifyServerContext } from '@aws-amplify/adapter-nextjs';
import { runWithAmplifyServerContext } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env.js';

import logger from './lib/logger';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // logger('masuk middleware pak ekoo');
  //getting accessToken from cookies 'use_sess' and try to parse the json, if the value of the cookies are valid, proceed
  // const sessionData = await provideSessionAttributes();

  // //getting pathname of the request (this pathname exclude matcher in config at the bottom of this file)
  // const pathname = request.nextUrl.pathname;
  // const cookieStore = cookies();
  // const SSR = withSSRContext({
  //   req: { headers: { cookie: serializeMultiple(cookieStore.getAll()) } },
  // });
  // SSR.configure(config);
  // let result;

  // const authenticated = await runWithAmplifyServerContext({
  //   nextServerContext: { request, response },
  //   operation: async (contextSpec) => {
  //     try {
  //       const session = await fetchAuthSession(contextSpec, {});
  //       return session.tokens !== undefined;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   },
  // });

  logger('masuk middleware pak ekoo, ' + env.DATABASE_URL);

  //if the accessToken is not valid, redirect to login. if the pathname already /login, skip
  // if (!sessionData) {
  //   return pathname === '/login' ||
  //     pathname === '/register' ||
  //     pathname === '/forgotpassword'
  //     ? NextResponse.next()
  //     : NextResponse.redirect(new URL('/login', request.url));
  // }

  // // //TODO: add API logic here
  // // if (pathname.startsWith('/api')) {
  // //   logger('masuk middleware pak ekooo');
  // //   return NextResponse.next();
  // // }
  // // logger(pathname);

  // return pathname === '/login' ||
  //   pathname === '/register' ||
  //   pathname === '/forgotpassword'
  //   ? NextResponse.redirect(new URL('/identities', request.url))
  NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
