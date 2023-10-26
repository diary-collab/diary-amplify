import { isValidApiMethod, isValidUrlPath } from '@utils/url-utils';
import { cookies } from 'next/headers';
import * as z from 'zod';

import { provideSessionJwt } from '@src/hooks/use-auth';

import { env } from '@/env.js';

const middlewareSchema = z.object({
  path: z.string(),
  method: z.string(),
  body: z.unknown(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: Request) {
  if (!req) {
    //no action, just to ignore
  }
  try {
    const cookieStore = cookies();

    // console.log(cookieStore);
    return new Response(JSON.stringify({ message: cookieStore }), {
      status: 200,
    });
  } catch (error) {
    // console.log(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: Request) {
  try {
    const sessionData = await provideSessionJwt();

    if (!sessionData?.jwt) {
      return new Response(
        JSON.stringify({ message: 'Session not found! Please login first.' }),
        { status: 404 }
      );
    }

    const json = await req.json();
    const requestbody = middlewareSchema.parse(json);

    const { path, method, body } = requestbody;

    if (!isValidUrlPath(path)) {
      return new Response(JSON.stringify({ message: 'Invalid path.' }), {
        status: 400,
      });
    }

    if (!isValidApiMethod(method)) {
      return new Response(JSON.stringify({ message: 'Invalid method.' }), {
        status: 400,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionData.jwt}`,
      },
    };

    if (
      (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') &&
      !body
    ) {
      return new Response(JSON.stringify({ message: 'Invalid body.' }), {
        status: 400,
      });
    }

    if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
      options.body = JSON.stringify(body);
    }

    const forwardedrequest = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/v1${path}`,
      options
    );
    // console.log(`${env.NEXT_PUBLIC_API_BASE_URL}/v1${path}`);

    const bodyreturn = await forwardedrequest.json();

    return new Response(JSON.stringify(bodyreturn), {
      status: forwardedrequest.status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Handle Zod exceptions
      // console.error('ZodError:', error);
      return new Response(JSON.stringify({ message: 'Bad request body.' }), {
        status: 400,
      });
    } else if (error instanceof SyntaxError) {
      // Handle JSON.parse exceptions
      return new Response(JSON.stringify({ message: 'Malformed JSON body.' }), {
        status: 400,
      });
      // console.error('SyntaxError:', error);
    } else {
      // Handle other exceptions
      // console.error('Other Exception:', error);
      return new Response(
        JSON.stringify({ message: `${env.NEXT_PUBLIC_API_BASE_URL}` }),
        {
          status: 500,
        }
      );
    }
  }
}
