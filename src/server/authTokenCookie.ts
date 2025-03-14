import { cookies } from 'next/headers';

export const AUTH_TOKEN = "YANDEX_AUTH_TOKEN";

export async function getAuthTokenCookie() {
  return (await cookies()).get(AUTH_TOKEN)?.value;
}