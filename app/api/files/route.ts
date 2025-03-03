import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export interface Item {
  name: string;
  path: string;
}

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const response = await fetch("https://cloud-api.yandex.net/v1/disk/resources/files?limit=100&media_type=audio&fields=name,path", {
    headers: { Authorization: `OAuth ${token}` },
  });

  const data = await response.json() as { items: Item[] };

  return NextResponse.json(data.items.map(({name, path}) => ({name, path})));
}