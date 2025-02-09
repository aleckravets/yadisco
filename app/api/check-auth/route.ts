import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  return NextResponse.json({ authorized: !!token });
}