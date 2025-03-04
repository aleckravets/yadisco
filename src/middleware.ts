// middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from './utils/authToken';
import { isAuthTokenValid } from './yandexDiskApi';

async function authMiddleware(req: NextRequest) {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error('Unauthorized');
    }

    const isTokenValid = await isAuthTokenValid(token);

    if (!isTokenValid) {
      throw new Error('Invalid token');
    }
  }
  catch(error) {
    console.log(error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export async function middleware(req: NextRequest) {
  const middlewares = [authMiddleware];

  for (const mw of middlewares) {
    const result = await mw(req);
    if (result) return result; // Stop execution if middleware returns a response
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
}