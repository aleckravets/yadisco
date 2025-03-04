import { getAuthToken } from '@/utils/authToken';
import { downloadFile } from '@/utils/downloadFile';
import { getDownloadLink } from '@/yandexDiskApi';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken();
    const searchParams = req.nextUrl.searchParams;
    const path = searchParams.get('path');
    
    if (!path) {
      throw new Error('Invalid path');
    }
    
    const link = await getDownloadLink(token!, path);

    const {status, body, headers} = await downloadFile(link);

    // Stream the file response
    return new NextResponse(body, {
      status,
      headers: {
        'Content-Type': headers.get('Content-Type') || 'application/octet-stream',
        'Content-Disposition': headers.get('Content-Disposition') || 'attachment',
      },
    });
  }
  catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}