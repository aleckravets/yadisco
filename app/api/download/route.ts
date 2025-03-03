import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const path = searchParams.get('path');

  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const response = await fetch(`https://cloud-api.yandex.net/v1/disk/resources/download?path=${path}`, {
    headers: { Authorization: `OAuth ${token}` },
  });

  const data = await response.json();
  return NextResponse.json(data);
}