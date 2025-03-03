import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const path = searchParams.get('path');

  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const response = await fetch(`https://cloud-api.yandex.net/v1/disk/resources/download?path=${path}`, {
      headers: { Authorization: `OAuth ${token}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to get download url: ${response.status}: ${response.statusText}`);
    }

    // Получаем URL для скачивания файла
    const data = await response.json();
    const downloadUrl = data.href;

    // Перенаправляем запрос на полученный URL
    const fileResponse = await fetch(downloadUrl);

    if (!fileResponse.ok) {
      throw new Error(`Failed to download file: ${fileResponse.status}: ${fileResponse.statusText}`);
    }

    // Stream the file response
    return new NextResponse(fileResponse.body, {
      status: fileResponse.status,
      headers: {
        'Content-Type': fileResponse.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Disposition': fileResponse.headers.get('Content-Disposition') || 'attachment',
      },
    });
  }
  catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}