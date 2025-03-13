import { cookies } from 'next/headers';

export const AUTH_TOKEN = "YA_OAUTH_TOKEN";

export async function getAuthToken() {
  return (await cookies()).get(AUTH_TOKEN)?.value;
}