import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const AUTH_TOKEN = "YANDEX_API_TOKEN";

export async function getAuthToken() {
  return (await cookies()).get(AUTH_TOKEN)?.value;
}

export function setAuthToken(res: NextResponse, token: string) {
  res.cookies.set(AUTH_TOKEN, token, { httpOnly: true, secure: true, path: "/" });
}