import { isValidApiMethod, isValidUrlPath } from '@utils/url-utils';
import { cookies } from 'next/headers';
import * as z from 'zod';

import { provideSessionJwt } from '@src/hooks/use-auth';

import { env } from '@/env.mjs';

const middlewareSchema = z.object({
  path: z.string(),
  method: z.string(),
  body: z.unknown(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: any, res: any) {
  if (!req) {
    //no action, just to ignore
  }
  try {
    const cookieStore = cookies();

    // console.log(cookieStore);
    return res.status(200).json({ message: cookieStore });
  } catch (error) {
    // console.log(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any, res: any) {
  try {
    const sessionData = await provideSessionJwt();

    if (!sessionData?.jwt) {
      return res
        .status(404)
        .json({ message: 'Session not found! Please login first.' });
    }

    const json = await req.json();
    const requestbody = middlewareSchema.parse(json);

    const { path, method, body } = requestbody;

    if (!isValidUrlPath(path)) {
      return res.status(400).json({ message: 'Invalid path.' });
    }

    if (!isValidApiMethod(method)) {
      return res.status(400).json({ message: 'Invalid method.' });
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
      return res.status(400).json({ message: 'Invalid body.' });
    }

    if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
      options.body = JSON.stringify(body);
    }

    const forwardedrequest = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/v1${path}`,
      options
    );

    const bodyreturn = await forwardedrequest.json();

    return res.status(forwardedrequest.status).json(bodyreturn);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Handle Zod exceptions
      // console.error('ZodError:', error);
      return res.status(400).json({ message: 'Bad request body.' });
    } else if (error instanceof SyntaxError) {
      // Handle JSON.parse exceptions
      return res.status(400).json({ message: 'Malformed JSON body.' });
      // console.error('SyntaxError:', error);
    } else {
      // Handle other exceptions
      // console.error('Other Exception:', error);
      return res.status(500).json({ message: error.message });
    }
  }
}
